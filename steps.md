# **Project Documentation: Microservices on Kubernetes**

## **Overview**
This project involves building, containerizing, and deploying **8 microservices** on **Kubernetes (AKS/EKS)**. The implementation is divided into four phases:
1. **Foundation Setup** – Environment preparation and containerization.
2. **Kubernetes Deployment** – Cluster setup and service deployment.
3. **Production Features** – Scaling, secrets, and Helm charts.
4. **Observability & Service Mesh** – Monitoring with Prometheus/Grafana and final documentation.

---

## **Phase 1: Foundation Setup**

### **1.1 Environment Preparation**
#### **Steps:**
1. **Set up a Cloud Account**
 - Create an account on **AWS (for EKS)** or **Azure (for AKS)**.
 - Enable **Kubernetes service (EKS/AKS)** and **container registry (ECR/ACR)**.

2. **Install Local Tools**
 - Install **Docker** (for containerization).
 - Install **kubectl** (Kubernetes CLI).
 - Install **Helm** (for package management).
 - Install **VS Code** (or any preferred IDE).

3. **Set Up GitHub Repository**
 - Create a new repository.
 - Initialize with a basic structure:
   ```
   /microservices  
     /auth  
     /user  
     /billing  
     /payments  
     /notifications  
     /analytics  
     /admin  
     /frontend  
   /kubernetes  
     /manifests  
     /helm  
   /docs  
   ```  

---

### **1.2 Containerization**
#### **Steps:**
1. **Build Microservices**
 - Use **ChatGPT** or **open-source code** to generate basic microservices (Node.js, Python, or Go).
 - Each service should expose a REST API.

2. **Create Dockerfiles**
 - Example `Dockerfile` for a Node.js service:
   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```  

3. **Build and Push Images**
 - Build images:
   ```sh
   docker build -t <registry>/<service-name>:<tag> .
   ```  
 - Push to **AWS ECR** or **Azure ACR**:
   ```sh
   docker push <registry>/<service-name>:<tag>
   
You can also follow the command line on the aws if you are using AWS
   ```  

---

## **Phase 2: Kubernetes Deployment**

### **2.1 Cluster Setup**
#### **Steps:**
1. **Provision AKS/EKS Cluster**
 - **AWS EKS**:
   ```sh
   eksctl create cluster --name my-cluster --region us-east-1
   ```  
 - **Azure AKS**:
   ```sh
   az aks create --resource-group my-group --name my-cluster
   ```  

2. **Configure `kubectl` Access**
 - For **EKS**:
   ```sh
   aws eks --region us-east-1 update-kubeconfig --name my-cluster
   ```  
 - For **AKS**:
   ```sh
   az aks get-credentials --resource-group my-group --name my-cluster
   ```  

3. **Set Up Namespaces & RBAC**
 - Create namespaces:
   ```sh
   kubectl create namespace auth
   kubectl create namespace payments
   ```  
 - Apply RBAC policies if needed.

---

### **2.2 Service Deployment**
#### **Steps:**
1. **Create Kubernetes Manifests**
 - Example `deployment.yaml`:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: auth-service
     namespace: auth
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: auth
     template:
       metadata:
         labels:
           app: auth
       spec:
         containers:
         - name: auth
           image: <registry>/auth-service:latest
           ports:
           - containerPort: 3000
   ```  

2. **Deploy Services**
   ```sh
   kubectl apply -f kubernetes/manifests/auth-deployment.yaml
   ```  

3. **Configure Ingress**
 - Install **NGINX Ingress Controller**:
   ```sh
   helm install ingress-nginx ingress-nginx/ingress-nginx
   ```  
 - Define `ingress.yaml` for routing.

---

## **Phase 3: Production Features**

### **3.1 Scaling & Secrets**
#### **Steps:**
1. **Horizontal Pod Autoscaler (HPA)**
   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: auth-hpa
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: auth-service
     minReplicas: 2
     maxReplicas: 10
     metrics:
     - type: Resource
       resource:
         name: cpu
         target:
           type: Utilization
           averageUtilization: 80
   ```  

2. **Secrets & ConfigMaps**
 - Store secrets:
   ```sh
   kubectl create secret generic db-secret --from-literal=password=1234
   ```  
 - Use ConfigMaps for environment variables.

3. **Health Checks**
 - Add `livenessProbe` and `readinessProbe` in deployments.

---

### **3.2 Helm Charts**
#### **Steps:**
1. **Convert Manifests to Helm**
   ```sh
   helm create auth-service
   ```  
2. **Deploy Using ArgoCD**
 - Install ArgoCD:
   ```sh
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```  
 - Sync applications via GitOps.

---

## **Phase 4: Observability & Cleanup**

### **4.1 Monitoring (Prometheus + Grafana)**
#### **Steps:**
1. **Install Prometheus Stack**
   ```sh
   helm install prometheus prometheus-community/kube-prometheus-stack
   ```  
2. **Set Up Grafana Dashboards**
 - Import Kubernetes monitoring dashboards.

### **4.2 Documentation & Cleanup**
1. **Write a `README.md`**
 - Include setup steps, architecture, and usage.
2. **Clean Up Resources**
 - Delete the cluster to avoid costs:
   ```sh
   eksctl delete cluster --name my-cluster
   # or
   az aks delete --resource-group my-group --name my-cluster
   ```  

---

## **Conclusion**
This project successfully deploys **8 microservices on Kubernetes** with **scaling, monitoring, and CI/CD (using Helm & ArgoCD)**. Future improvements:
- **Service Mesh (Istio/Linkerd)**
- **CI/CD Pipeline (GitHub Actions)**
- **Database Integration (PostgreSQL/Redis)**

🚀 **Happy Deploying!**