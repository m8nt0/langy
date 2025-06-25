#!/bin/bash
set -e
echo "Executing rollback..."

TARGET_ENV=$1

if [ -z "$TARGET_ENV" ]; then
    echo "❌ Error: Rollback target not specified."
    echo "Usage: ./rollback.sh <kubernetes>"
    exit 1
fi

case $TARGET_ENV in
  kubernetes)
    echo "Rolling back Kubernetes deployment 'langy-frontend-deployment'..."
    kubectl rollout undo deployment/langy-frontend-deployment
    echo "✅ Rollback command sent."
    ;;
  *)
    echo "❌ Error: Rollback for target '$TARGET_ENV' is not implemented."
    exit 1
    ;;
esac