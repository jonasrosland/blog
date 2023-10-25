---
layout: post
title: "Container OS comparison"
modified:
categories:
description: "Which one should I choose?"
tags: [rancheros, coreos, photon os, project atomic, snappy ubuntu core, mesosphere dcos]
comments: true
image:
  feature: planets-resize.jpg
  credit: Image Editor on Flickr
  creditlink: https://www.flickr.com/photos/11304375@N07/2818891443/in/photostream/
date: 2015-09-23
image: /images/planets-resize.jpg
slug: comparison-of-container-oses
url: /comparison-of-container-oses
---

This post was previously published on [Codeship's blog](https://blog.codeship.com/container-os-comparison/), reposted here.

For anyone who’s been following the container community’s rise the past two years (after [Solomon Hykes](https://twitter.com/solomonstre)’s famous five-minute [presentation at PyCon](https://www.youtube.com/watch?v=wW9CAH9nSLs)), you have surely seen many companies and projects spring up, offering really innovative ways of managing your applications.

There are several projects around management, network, storage, logging, monitoring, and more (check out this awesome [mind map of the ecosystem](https://www.mindmeister.com/389671722/docker-ecosystem)). However, I think the most prevalent projects are the ones that make up the base infrastructure of what has or will become your new application environment: the container OSes.

One question I always get when talking to people about containers at meetups and conferences is “Which is the best OS to run containers?” That’s usually followed by “Is it CoreOS? What about RedHat? I’ve also heard about something called RancherOS?”

I love these discussions; it’s very similar to “Which Hypervisor is the best?” Of course, the answer is always “It depends.” Still, I’m going to try to explain some of the key benefits and differences between the most popular container OSes that are available at the time of writing.

## CoreOS

This is the poster child of container OSes. [CoreOS](https://coreos.com/) is focused on large-scale deployments, mostly targeting enterprises, and it’s gained quite the following (hundreds of contributors and usually 500+ IRC users in [#coreos on FreeNode](https://botbot.me/freenode/coreos/)). It comes bundled with a few really interesting tools developed by the CoreOS team, such as etcd, fleet, and flannel. These tools help you get started with a cluster of CoreOS very quickly. They’re also great starting points to get to understand the concepts behind service discovery, resource scheduling, and container networking.

In December 2014, the CoreOS team also announced another type of container runtime engine called [rkt](https://coreos.com/blog/rocket/). This was a response to what the team saw as Docker’s diversion from its original container manifesto, and they wanted to see if the community felt the same. CoreOS still runs both Docker and rkt containers, so no worries about functionality issues yet or in the near future.

The CoreOS team has also teamed up with Google (Google Ventures is also an investor in CoreOS) and has created [Tectonic](https://tectonic.com/), a really interesting way of getting CoreOS running with Kubernetes easily and efficiently. Tectonic is a commercial Kubernetes platform, which can be important if you’re looking for more than community support when running large-scale containers in production.

## RancherOS

[Rancher](http://rancher.com/) is trying to take what a container OS should be to the next step, where everything in RancherOS is a Docker container. They run a system Docker as PID 1 and then launch a container that runs the user Docker for all the user containers.

This might seem crazy, but for an OS that should do nothing else, it makes sense. Rancher has stripped away everything not needed, which makes the OS very lightweight. The installation ISO is just 22MB.

What’s even more interesting are all the services added on top of the OS, using the Rancher system. When you consider what’s needed in a container production system, you usually need functions such as secure and easy networking, service discovery, load balancing, monitoring, and scheduling. Rancher adds all this on top of RancherOS, plus some. It’s a very comprehensive system, and I highly recommend you give it a [closer look](http://rancher.com/rancherio-feature-i/).

## Snappy Ubuntu Core

This is an interesting project that [Mark Shuttleworth announced last year](http://www.markshuttleworth.com/archives/1434) while also calling some of the then-available container OSes “bloated.”

The [Snappy Ubuntu Core OS](https://developer.ubuntu.com/en/snappy/) comes with a new type of application manager (“snappy”) and focuses on running apps and containers. Some might argue that this goes against what a container OS should do, but it might also be a good transitional OS. It presents a great learning opportunity for those who just want to test things out and don’t have the time to learn the intricacies of etcd, Consul, fleet, Kubernetes, and all the other tools.

The base of the system is the “Ubuntu Core.” On top of that, your apps lives in read-only images (similar to containers), and the apps can be transactionally updated. This is huge — you don’t have to download an entire application again to deploy a new version, just download the changes that have been made.

The Snappy Ubuntu Core OS isn’t a pure container OS but has some interesting aspects to it. Anyone who’s been running Ubuntu in production or is interested in running both apps and containers side by side should definitely check it out.

## RedHat Project Atomic

This distribution is built using upstream RPMs from CentOS, Fedora, and RHEL, and enables what RedHat calls “atomic” upgrades and rollback. It’s up to you, dear reader, to choose which distribution you want as a base so you feel comfortable with managing your hosts.

The OS comes with built-in functions for Docker, flannel (from the CoreOS team), Kubernetes, a transactional operating system update tool called rpm-ostree that always keeps an older version of the OS available (similar to CoreOS), and of course systemd.

[Project Atomic](http://www.projectatomic.io/) also uses SELinux to try to secure your containers as well as manage access to and from them. I think it’s great that they’re using already established and trusted tech for this. I’m guessing we will see more from RedHat around this project, but for now it’s pretty barebones — which can also be a good thing.

## Mesosphere DCOS

[Mesosphere DCOS](https://mesosphere.com/) is a project that is unfortunately commonly mistaken for Apache Mesos (naming issues?). But ignoring that, it has a very robust and innovative way of looking at how to manage containers.

It takes the open source projects Apache Mesos, Marathon, Zookeeper, and a few other services, bundles them together in a clever way and also adds enterprise features on top. This DCOS product just went GA and comes in two flavors:, a community edition (free of charge) for AWS workloads, and an enterprise version for everything else.

The most interesting thing about Mesosphere DCOS is that it’s not just limited to container management. It’s building on Mesos, after all, which can do a lot more. How about deploying a Hadoop cluster? Maybe a large-scale Cassandra cluster? Mesosphere has that built-in, and I believe this is one of the key differentiators from the other container OSes that can make Mesosphere DCOS very successful.

## VMware Photon

Announced and released in April, [VMware Photon](https://vmware.github.io/photon/) is a very new container OS and the first part of an ongoing open-source effort by VMware. VMware is definitely focusing on large-scale deployments of applications, as can be seen by their other project called [Lightwave](https://github.com/vmware/lightwave), providing identity services including authentication and authorization for large-scale distributed infrastructure, applications and containers. More to come here, I’m sure.

## Summary

Obviously, there’s a lot of work going into all of the above projects, and they each bring something of their own to the field. I hope this comparison will help you pick a project you find interesting and explore the possibilities of the different container OSes and their management systems. Have fun!
