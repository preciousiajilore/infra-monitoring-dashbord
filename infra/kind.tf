resource "null_resource" "kind_cluster" {
  # Put anything you want to reuse in destroy phase into triggers
  triggers = {
    cluster_name = var.cluster_name
  }

  # Create: ensure cluster exists
  provisioner "local-exec" {
    command = <<EOT
set -e
if ! kind get clusters | grep -q "^${self.triggers.cluster_name}$"; then
  kind create cluster --name "${self.triggers.cluster_name}"
fi
EOT
  }

  # Destroy: reference self.triggers (not vars) per Terraform rules
  provisioner "local-exec" {
    when    = destroy
    command = "kind delete cluster --name ${self.triggers.cluster_name} || true"
  }
}
