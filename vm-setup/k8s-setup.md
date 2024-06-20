Tutorial
https://medium.com/@rabbi.cse.sust.bd/kubernetes-cluster-setup-on-ubuntu-24-04-lts-server-c17be85e49d1

1. set hostname

Read index
Intitialize the Kubernetes cluster

kubeadm join 192.168.0.109:6443 --token f6imif.qbu86takd1cs4nfu \
 --discovery-token-ca-cert-hash sha256:a22454d9e12979cceadf0a203a8c0f7a46e84cef1b6756a2cc19a0a286e560b1 \
 --control-plane

kubeadm join 192.168.0.109:6443 --token f6imif.qbu86takd1cs4nfu \
 --discovery-token-ca-cert-hash sha256:a22454d9e12979cceadf0a203a8c0f7a46e84cef1b6756a2cc19a0a286e560b1

kubeadm config images pull

k3s setup
Hostname setup
sudo hostnamectl set-hostname k3s-control-plane
sudo hostnamectl set-hostname k3s-worker-node1
sudo hostnamectl set-hostname k3s-worker-node2

On controlplane
curl -sfL https://get.k3s.io | sh -

Retrieve token on control plane
sudo cat /var/lib/rancher/k3s/server/node-token

On Worker nodes
curl -sfL https://get.k3s.io | K3S_URL=https://<controlplane-ip>:6443 K3S_TOKEN=<token> sh -

Verify cluster is running
sudo k3s kubectl get nodes

steps

1. Prepare VM

- Create VM
- Export VM (Snapshot)
- Import VM (control plane, worker(s))
- Set unique hostname on each VM
- for control plane set static ip setting see vm-setup
- for worker nodes modify /etc/hosts with ip address of their control plane IP

2. Control plane setup

3. Worker node setup

4. Verify

5. Setup kubectl on host pc
