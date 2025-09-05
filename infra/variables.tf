variable "cluster_name" {
  type        = string
  default     = "syntrix-kind"
  description = "Name of the kind cluster"
}

variable "kubeconfig_path" {
  type        = string
  default     = "~/.kube/config"
  description = "Path to kubeconfig"
}

variable "postgres_password" {
  type        = string
  default     = "syntrixlocalpw"
  sensitive   = true
}
