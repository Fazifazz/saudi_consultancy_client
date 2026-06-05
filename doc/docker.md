# Docker Guide for Saudi Consultancy Client

This document contains common Docker commands for building, running, and managing the `saudi-consultancy-client` container.

---

## Build Image

Build the Docker image from the Dockerfile:

```bash
docker build -t saudi-consultancy-client .
```

Build with a specific tag:

```bash
docker build -t saudi-consultancy-client:latest .
```

Build without cache (clean build):

```bash
docker build --no-cache -t saudi-consultancy-client .
```

---

## Run Container

Run the container:

```bash
docker run --name saudi-consultancy-client saudi-consultancy-client
```

Run in detached mode (background):

```bash
docker run -d --name saudi-consultancy-client saudi-consultancy-client
```

Run with port mapping:

```bash
docker run -d -p 3000:3000 --name saudi-consultancy-client saudi-consultancy-client
```

Run with environment variables:

```bash
docker run -d -e NODE_ENV=production --name saudi-consultancy-client saudi-consultancy-client
```

Run with volume mounting (for development):

```bash
docker run -d -v $(pwd):/app --name saudi-consultancy-client saudi-consultancy-client
```

---

## Stop Container

Stop the running container:

```bash
docker stop saudi-consultancy-client
```

Stop with timeout (force after N seconds):

```bash
docker stop -t 30 saudi-consultancy-client
```

---

## Start Container

Start a stopped container:

```bash
docker start saudi-consultancy-client
```

---

## Restart Container

Restart the container:

```bash
docker restart saudi-consultancy-client
```

---

## Delete Container

Remove a stopped container:

```bash
docker rm saudi-consultancy-client
```

Force remove a running container:

```bash
docker rm -f saudi-consultancy-client
```

---

## Delete Image

Remove the Docker image:

```bash
docker rmi saudi-consultancy-client
```

Force remove image:

```bash
docker rmi -f saudi-consultancy-client
```

---

## View Logs

View container logs:

```bash
docker logs saudi-consultancy-client
```

Follow logs in real-time:

```bash
docker logs -f saudi-consultancy-client
```

View last N lines:

```bash
docker logs --tail 100 saudi-consultancy-client
```

---

## Execute Commands

Run a command inside the container:

```bash
docker exec saudi-consultancy-client <command>
```

Open an interactive shell:

```bash
docker exec -it saudi-consultancy-client /bin/sh
```

or for bash:

```bash
docker exec -it saudi-consultancy-client /bin/bash
```

---

## Check Status

List running containers:

```bash
docker ps
```

List all containers (including stopped):

```bash
docker ps -a
```

List images:

```bash
docker images
```

---

## Cleanup

Remove all stopped containers:

```bash
docker container prune
```

Remove unused images:

```bash
docker image prune
```

Remove all unused resources (containers, images, networks):

```bash
docker system prune
```

Force remove everything (use with caution):

```bash
docker system prune -a --volumes
```

---

## Useful Shortcuts

### Full Rebuild Workflow

```bash
# Stop and remove existing container
docker stop saudi-consultancy-client && docker rm saudi-consultancy-client

# Rebuild image
docker build --no-cache -t saudi-consultancy-client .

# Run new container
docker run -d --name saudi-consultancy-client -p 3000:3000 saudi-consultancy-client
```

### Quick Restart

```bash
docker restart saudi-consultancy-client
```

---

## Troubleshooting

### Check container status

```bash
docker inspect saudi-consultancy-client
```

### Check resource usage

```bash
docker stats saudi-consultancy-client
```

### View container processes

```bash
docker top saudi-consultancy-client
```
