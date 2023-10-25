---
layout: post
title: "Simple way to build a custom Docker-ready Raspberry Pi image"
modified:
categories:
description: "Sprinkle some Docker over that Pi"
tags: [docker, raspberry pi, rpi, image]
comments: true
image:
  feature: raspberry_pi3.png
  credit: Jonas Rosland
date: 2016-11-11
image: /images/raspberry_pi3.png
---

In the past year and a half I've seen some really cool things come from people
who are passionate about two things: [Docker](http://docker.com) and [Raspberry Pi](http://raspberrypi.org).

There have been contests, showing over [2500 containers running on a RPi 2](https://blog.docker.com/2015/10/raspberry-pi-dockercon-challenge-winner/).
We've seen some amazing stuff coming out from [Hypriot](http://blog.hypriot.com) to get up and running with Docker quickly on RPi.
And not that long ago, Docker themselves took this more seriously and made Raspbian Jessie an [officially supported platform](https://www.raspberrypi.org/blog/docker-comes-to-raspberry-pi/).

For this blog post I'd like to show how you can build your own custom Docker-ready Raspberry Pi image.
Why, you ask?
Well...

You might want to include some packages that you always manually install.
Or change the standard username from `pi` or `pirate`.
Maybe you want to slim down the standard Raspbian distro to the bare minimums needed.

**Whatever the reason, I'm here to provide you with a way to do it :)**

## Let's get to it

I've created a [fork](https://github.com/jonasrosland/pi-gen) of the [official pi-gen](https://github.com/RPi-Distro/pi-gen) repo,
which we'll use to create our images.

To build the images we'll use a Linux machine, your choice of physical or VM.
There's an excellent [Vagrant](http://vagrantup.com) box that I recommend using together with [VirtualBox](http://virtualbox.org) to make this as simple as possible.

Run the following to get it up and running:

```
vagrant box add ARTACK/debian-jessie https://atlas.hashicorp.com/ARTACK/boxes/debian-jessie
vagrant init ARTACK/debian-jessie
```
---

**Optional:** Edit the `Vagrantfile` that got put in your directory and increase the RAM to make everything a little more snappy:

```
config.vm.provider "virtualbox" do |vb|
#   # Display the VirtualBox GUI when booting the machine
#   vb.gui = true
#
#   # Customize the amount of memory on the VM:
  vb.memory = "2048"
end
```

---

Alright, time to start the VM, just run `vagrant up` and you should see it boot up.

Now you'll have a barebones Debian Jessie VM up and running, you can connect to it by running `vagrant ssh`.

We need a few tools and my forked repo to be able to create the image, install and clone them like this:

```
sudo apt-get update
sudo apt-get install quilt kpartx realpath qemu-user-static debootstrap zerofree pxz zip dosfstools git
git clone https://github.com/jonasrosland/pi-gen
```

Head into the `pi-gen` directory and create a new file called `config`. Within it, add `IMG_NAME='Raspbian'`. That's it.

Now we can start the build by issuing `sudo ./build.sh`. This may take a while. Go get some runts.

You should see the following output:

```
vagrant@debian:/tmp$ sudo ./build.sh
[20:38:09] Begin /tmp
[20:38:09] Begin /tmp/stage0
[20:38:09] Begin /tmp/stage0/prerun.sh
... {snip} ...
The following NEW packages will be installed:
  aufs-tools cgroupfs-mount docker-engine git git-man libapparmor1 liberror-perl rsync
... {snip} ...
zip /tmp/deploy/image_2016-11-10-Raspbian-lite.zip /tmp/work/2016-11-10-Raspbian/export-image/2016-11-10-Raspbian-lite.img
  adding: 2016-11-10-Raspbian-lite.img (deflated 77%)
... {snip} ...
[20:43:16] End /tmp/export-image
```

You now have a shiny new Raspbian Jessie lite image with Docker preinstalled! If you're running in the Vagrant environment make sure you copy the file to your normal OS before going further:

```
cp work/2016-11-10-Raspbian/export-image/2016-11-10-Raspbian-lite.img /vagrant/
```

Now go grab those SD cards and give your Raspberry Pis the Docker experience they deserve :)

## Extra points

By now you're probably wondering what I changed to the official repo to get Docker into the Raspbian image. There were a few other minor tweaks, but the Docker addition was simple; I edited one of the scripts (`stage2/01-sys-tweaks/01-run.sh`) that run during the build cycle to include adding Docker, and adding the user `pi` to the `docker` group.

If you want to edit other packages, users or anything else, head into the `stage[0-2]` folders (we're not using `stage[3-4]`) and remove/add whatever you feel like. It's yours to build!
