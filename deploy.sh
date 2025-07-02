#!/bin/bash

# Portfolio Deployment Script
# This script builds and deploys the portfolio application using Docker

set -e

echo "🚀 Starting portfolio deployment..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="portfolio-app"
CONTAINER_NAME="portfolio-container"
PORT=3000

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

print_status "Docker is running ✓"

# Stop and remove existing container if it exists
if docker ps -a | grep -q $CONTAINER_NAME; then
    print_status "Stopping existing container..."
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
fi

# Remove existing image if it exists
if docker images | grep -q $IMAGE_NAME; then
    print_status "Removing existing image..."
    docker rmi $IMAGE_NAME || true
fi

# Build the new image
print_status "Building Docker image..."
docker build -t $IMAGE_NAME .

# Run the container
print_status "Starting container..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:3000 \
    --restart unless-stopped \
    $IMAGE_NAME

# Wait a moment for the container to start
sleep 3

# Check if container is running
if docker ps | grep -q $CONTAINER_NAME; then
    print_status "✅ Deployment successful!"
    print_status "Portfolio is running at: http://localhost:$PORT"
    print_status "Container name: $CONTAINER_NAME"
    print_status "Image name: $IMAGE_NAME"
else
    print_error "❌ Deployment failed. Container is not running."
    print_error "Check logs with: docker logs $CONTAINER_NAME"
    exit 1
fi

echo ""
echo "🎉 Portfolio deployed successfully!"
echo "📱 Access your portfolio at: http://localhost:$PORT"
echo ""
echo "Useful commands:"
echo "  View logs: docker logs $CONTAINER_NAME"
echo "  Stop app:  docker stop $CONTAINER_NAME"
echo "  Start app: docker start $CONTAINER_NAME"
echo "  Remove:    docker rm $CONTAINER_NAME && docker rmi $IMAGE_NAME" 