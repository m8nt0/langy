#!/bin/bash
set -e

# --- Configuration ---
TARGET_ENV=$1
AWS_S3_BUCKET="langy-frontend-bucket" # From s3.yaml, should be unique
AWS_REGION="us-east-1"
K8S_CONTEXT="your-kube-context" # e.g., "gke_your-project_your-zone_your-cluster"
DOCKER_IMAGE="your-registry/langy-frontend:latest"

# --- Script Logic ---
if [ -z "$TARGET_ENV" ]; then
    echo "❌ Error: Deployment target not specified."
    echo "Usage: ./deploy-cloud.sh <aws|kubernetes>"
    exit 1
fi

echo "🚀 Deploying to cloud environment: $TARGET_ENV"

# --- Build Step ---
echo "Building web artifacts first..."
"$(dirname "$0")/../build/build-web.sh"
BUILD_DIR="$(dirname "$0")/../../../src/interfaces/web/svelte/dist"

# --- Deployment Dispatcher ---
case $TARGET_ENV in
  aws)
    echo "Deploying to AWS S3..."
    command -v aws >/dev/null 2>&1 || { echo >&2 "❌ AWS CLI is not installed. Aborting."; exit 1; }
    aws s3 sync "$BUILD_DIR" "s3://$AWS_S3_BUCKET" --delete --acl public-read
    echo "✅ Deployment to AWS S3 complete."
    ;;

  kubernetes)
    echo "Deploying to Kubernetes..."
    command -v kubectl >/dev/null 2>&1 || { echo >&2 "❌ kubectl is not installed. Aborting."; exit 1; }
    K8S_CONFIG_DIR="$(dirname "$0")/../../config/deployment/cloud/kubernetes"
    
    echo "Building and pushing Docker image: $DOCKER_IMAGE"
    docker build -t "$DOCKER_IMAGE" -f "$(dirname "$0")/../../config/deployment/local/docker/Dockerfile.multi-stage" .
    docker push "$DOCKER_IMAGE"

    echo "Applying Kubernetes manifests..."
    kubectl --context "$K8S_CONTEXT" apply -f "$K8S_CONFIG_DIR"
    echo "✅ Deployment to Kubernetes complete."
    ;;

  *)
    echo "❌ Error: Unknown deployment target '$TARGET_ENV'."
    exit 1
    ;;
esac