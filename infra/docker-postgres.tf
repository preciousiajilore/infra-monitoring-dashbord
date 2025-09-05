resource "docker_image" "postgres" {
  name = "postgres:15-alpine"
}

resource "docker_container" "postgres" {
  name    = "syntrix-postgres"
  image   = docker_image.postgres.image_id
  restart = "unless-stopped"

  env = [
    "POSTGRES_USER=appuser",
    "POSTGRES_PASSWORD=${var.postgres_password}",
    "POSTGRES_DB=appdb"
  ]

  ports {
    internal = 5432
    external = 5432
  }

  healthcheck {
    test         = ["CMD-SHELL", "pg_isready -U appuser -d appdb"]
    interval     = "5s"
    timeout      = "3s"
    start_period = "10s"
    retries      = 5
  }
}
