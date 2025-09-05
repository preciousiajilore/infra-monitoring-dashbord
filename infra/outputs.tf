output "kind_cluster" {
  value = var.cluster_name
}

output "postgres_info" {
  value = {
    host = "localhost"
    port = 5432
    user = "appuser"
    db   = "appdb"
  }
}
