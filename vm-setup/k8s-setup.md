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
