## Introduction

This folder contains various wikis to setup VM for experiments with k8s setup or provisioning vms for other purposes

### SSH Commands

**Command to set ssh public key**

```shell
cat ~/.ssh/id_ed25519.pub | ssh -o 'IdentitiesOnly yes' controlplane@192.168.0.82 "cat >> ~/.ssh/authorized_keys"
```

**Command to login into ssh**

```shell
ssh -o 'IdentitiesOnly yes' -i ~/.ssh/id_ed25519 controlplane@192.168.0.82
```

### VirtualBox Commands

**List all vms**

```shell
VBoxManage list vms
```

**List running vms**

```shell
VBoxManage list runningvms
```

**Shutdown vm**

```shell
VBoxManage controlvm <uuid> acpipowerbutton
```

**Start a vm**

```shell
VBoxManage startvm <uuid|vmname> --type headless
```

**Restart vm**

```shell
VBoxManage controlvm <uuid|vmname> acpipowerbutton && sleep 10 && VBoxManage startvm <uuid|vmname> --type headless
```

**Delete a VM**

```shell
VBoxManage unregistervm vm-name --delete
```

**Export any existing vm**

```shell
VBoxManage export vm-name -o ~/Documents/vm-images/ubuntu-server.ova
```

**Import/create a new vm from existing image**

```shell
VBoxManage import ~/Documents/vm-images/ubuntu-server.ova --vsys 0 --vmname "NewUbuntuVM" --basefolder ~/virtualbox
```

**Show status of vm**

```shell
VBoxManage showvminfo vm-name
```

### Install guest addition iso to retrieve ip or other details from a running vm

**Install get addition iso**

```shell
sudo apt-get install virtualbox-guest-additions-iso
```

**Show details of vm to get storage name to attach guest additions-iso**

```shell
VBoxManage showvminfo "UbuntuVM" --details
```

**Attach guest addition iso to running vm**

```shell
VBoxManage storageattach vm-name --storagectl "IDE" --port 1 --device 0 --type dvddrive --medium additions
```

**Run guest addition scripts in vm**

```shell
ssh into running vm
sudo mount /dev/cdrom /mnt
sudo /mnt/VBoxLinuxAdditions.run
sudo reboot
```

**List IP of running vm**

```shell
VBoxManage guestproperty get vm-name /VirtualBox/GuestInfo/Net/0/V4/IP
```

### Configure static IP on a particular VM

Follow [this link](https://chatgpt.com/c/cda21dad-b2fb-4eff-a0b3-c88cbb52c410)
**Create netplan file**

```shell
sudo nano /etc/netplan/01-netcfg.yaml
```

**Add following content to yaml file**

```yaml
network:
  version: 2
  ethernets:
    enp0s3: # Replace with your network interface name
      dhcp4: no
      addresses:
        - 192.168.0.200/24 # Replace with your desired static IP and subnet
      gateway4: 192.168.0.1 # Replace with your gateway
```

**Apply configuration**

```shell
sudo netplan apply
```

**Check IP**

```shell
ip a
```

**Ping your gateway**

```shell
ping -c 4 192.168.0.1
```

**Check DNS resolution**

```shell
ping -c 4 google.com
```

**Troubleshooting: Ensure Netplan configuration file has correct permissions**

```shell
sudo chmod 644 /etc/netplan/01-netcfg.yaml
```

**Restart network services**

```shell
sudo systemctl restart systemd-networkd
```

### Resources

- [How to set ssh public keys in remote server](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server)
