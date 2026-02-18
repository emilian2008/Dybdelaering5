Local testing for Kubernetes manifests

Prerequisites:
- kubectl installed and configured
- docker installed
- kind or minikube (one of these for local clusters)

Quick notes about the manifests:
- Deployments use placeholder image names in image: PLACEHOLDER.
- The CI workflow updates images on the cluster using kubectl set image.
  Locally you can either replace the placeholders or use kubectl set image after loading images into the cluster.

Test with kind (recommended):

1) Create a kind cluster:

    kind create cluster --name dyb-cluster

2) Build images locally and load into kind (run from repo root):

    docker build -t typescript-docker-app:local -f app/Dockerfile .
    docker build -t n8n-service:local -f n8n/dockerfile n8n
    kind load docker-image typescript-docker-app:local --name dyb-cluster
    kind load docker-image n8n-service:local --name dyb-cluster

3) Apply manifests and set the images to the local tags:

    kubectl apply -f k8s/
    kubectl set image deployment/app-deployment app=typescript-docker-app:local
    kubectl set image deployment/n8n-deployment n8n=n8n-service:local

4) Verify and access services:

    kubectl rollout status deployment/app-deployment
    kubectl rollout status deployment/n8n-deployment
    kubectl port-forward svc/app-service 8080:80   # app -> http://localhost:8080
    kubectl port-forward svc/n8n-service 5678:80   # n8n -> http://localhost:5678

Test with minikube:

1) Start minikube and point Docker to minikube's daemon:

    minikube start
    eval $(minikube docker-env)

2) Build images (they land in minikube's Docker daemon):

    docker build -t myuser/typescript-docker-app:local -f app/Dockerfile .
    docker build -t myuser/n8n-service:local -f n8n/dockerfile n8n

3) Apply manifests and set images:

    kubectl apply -f k8s/
    kubectl set image deployment/app-deployment app=myuser/typescript-docker-app:local
    kubectl set image deployment/n8n-deployment n8n=myuser/n8n-service:local

4) Port-forward as above or use minikube service to open a service in the browser.

Using the GitHub Actions deploy job locally:
- To reproduce the CI deploy step, create a base64-encoded kubeconfig and add it as the repo secret `KUBECONFIG`.

    cat ~/.kube/config | base64 -w0 > kubeconfig.b64

Tips and troubleshooting:
- If you prefer not to change images in the manifest files, the kubectl set image approach works well.
- If pods fail to start, check kubectl describe pod and kubectl logs for details.
- For n8n persistence, the k8s/pvc-n8n.yaml creates a PVC; on local clusters you may need a storage class or to use hostPath for quick tests.
