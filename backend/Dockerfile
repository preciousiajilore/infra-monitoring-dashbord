# syntax=docker/dockerfile:1

# 1) Build stage
FROM golang:1.24-alpine AS build
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
# build a static binary so it runs in a tiny image
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./main.go

# 2) Minimal runtime image
FROM scratch
COPY --from=build /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]