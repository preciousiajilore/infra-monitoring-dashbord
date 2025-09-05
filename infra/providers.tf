provider "docker" {}

provider "kubernetes" {
  # Kind writes kubeconfig here by default
  config_path = var.kubeconfig_path
}

provider "helm" {
  kubernetes {
    config_path = var.kubeconfig_path
  }
}
