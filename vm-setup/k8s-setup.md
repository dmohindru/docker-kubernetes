# Introduction

This wiki is about setting up a k3s cluster on vm or ec2 running ubuntu

### VM setup

If running a cluster running on a VM make sure vm prepration is done properly. Bare minimum following things should be set

1. Set hostname of each machine in a cluster. Try to give descriptive name to each machine in a cluster with their role like (control-plane, worker1, worker2, .... and so on)

```shell
sudo hostnamectl set-hostname <cluster-machine-name>
```

2. Its good to have static IP for each machine in cluster though not fully required but atleast control plane machine should have static IP allocated to them. Refer to [vm-setup](./vm-setup.md) **Configure static IP on a particular VM section** on how to do that

3. Make sure each machine can talk to each other using ping command

```shell
ping ip-of-machine
```

4. For worker nodes to talk to control plane using a descriptive name. Modify /etc/hosts on worker nodes with following content

```shell
sudo nano /etc/hosts
<ip-of-control-plane> <descriptive-name-of-control-plane>
```

### k3s setup

1. On control-plane machine run following command to install control plane software

```shell
curl -sfL https://get.k3s.io | sh -
```

2. Check status of control plnae

```shell
sudo systemctl status k3s
```

3. Retrieve node token so that worker nodes can join the cluster

```shell
sudo cat /var/lib/rancher/k3s/server/node-token
```

4. On woker nodes run following command

```shell
curl -sfL https://get.k3s.io | K3S_URL=https://<controlplane-ip>:6443 K3S_TOKEN=<token> sh -
```

5. Check status of k3s-agent on worker nodes

```shell
sudo systemctl status k3s-agent
```

6. Verify cluster status on control plane node

```shell
sudo k3s kubectl get nodes
```

### kubectl setup

1. Install kubectl on your host pc. Just google it.

2. On each control plane node extract its cluster config with following command and copy to convinient location preferable at ~/.kube as k3s-cluster1.yaml, k3s-cluster2.yaml ... and so on.

```shell
sudo cat /etc/rancher/k3s/k3s.yaml
```

3. Merge these config file to one config file stored at ~/.kube/config manually or by kubectl commands. There are many tutorial like [this one](https://dev.to/akyriako/merge-multiple-kubeconfig-files-20gb) but it didn't work for me. I did it manually.

### Tutorials

- [K8s setup tutorial 1](https://rudimartinsen.com/2023/12/29/kubernetes-cluster-on-vms-2024/)
- [K8s setup tutorial 2](https://medium.com/@rabbi.cse.sust.bd/kubernetes-cluster-setup-on-ubuntu-24-04-lts-server-c17be85e49d1)
- [K3s setup](https://www.linuxtechi.com/install-kubernetes-using-k3s-on-ubuntu/)
- [Chat GPT wiki](https://chatgpt.com/c/149ec8bb-f53f-4f94-a379-ceb87bf4c74f)
- [Merge multiple cluster config file into one](https://dev.to/akyriako/merge-multiple-kubeconfig-files-20gb)
