## Introduction

This folder contains various wikis to setup VM for experiments with k8s setup or provisioning vms for other purposes

### SSH Commands

Command to set ssh public key

```shell
cat ~/.ssh/id_ed25519.pub | ssh -o 'IdentitiesOnly yes' controlplane@192.168.0.82 "cat >> ~/.ssh/authorized_keys"
```

if
Command to login into ssh

```shell
ssh -o 'IdentitiesOnly yes' -i ~/.ssh/id_ed25519 controlplane@192.168.0.82
```

### VirtualBox Commands

List all vms

```shell
VBoxManage list vms
```

List running vms

```shell
VBoxManage list runningvms
```

Shutdown vm

```shell
VBoxManage controlvm <uuid> acpipowerbutton
```

Start a vm

```shell
VBoxManage startvm <uuid|vmname> --type headless
```

Restart vm

```shell
VBoxManage controlvm <uuid|vmname> acpipowerbutton && sleep 10 && VBoxManage startvm <uuid|vmname> --type headless
```

Delete a VM

```shell
VBoxManage unregistervm vm-name --delete
```

Export any existing vm

```shell
VBoxManage export vm-name -o ~/Documents/vm-images/ubuntu-server.ova
```

Import/create a new vm from existing image

```shell
VBoxManage import ~/Documents/vm-images/ubuntu-server.ova --vsys 0 --vmname "NewUbuntuVM" --basefolder ~/virtualbox
```

Install guest addition iso to retrieve ip or other details from a running vm

Install get addition iso

```shell
sudo apt-get install virtualbox-guest-additions-iso
```

Show details of vm to get storage name to attach guest additions-iso

```shell
VBoxManage showvminfo "UbuntuVM" --details
```

Attach guest addition iso to running vm

```shell
VBoxManage storageattach vm-name --storagectl "IDE" --port 1 --device 0 --type dvddrive --medium additions
```

Run guest addition scripts in vm

```shell
ssh into running vm
sudo mount /dev/cdrom /mnt
sudo /mnt/VBoxLinuxAdditions.run
sudo reboot
```

List IP of running vm

```shell
VBoxManage guestproperty get vm-name /VirtualBox/GuestInfo/Net/0/V4/IP
```

### Resources

- [How to set ssh public keys in remote server](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server)
