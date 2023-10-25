---
layout: post
title: "Battle of the Container OSes: CoreOS"
modified:
categories:
description: "The poster child"
tags: []
comments: true
image:
  feature: coreos-wordmark-horiz-color-wide.png
  credit: CoreOS
  creditlink: http://coreos.com
date: 2015-03-30T10:07:24-04:00
image: /images/coreos-wordmark-horiz-color-wide.png
slug: battle-of-the-container-oses-coreos
url: /battle-of-the-container-oses-coreos
---

This is an ongoing comparison series between different publicly available operating systems focused on running some form of containers, trying to be as objective as possible but I'll add my own commentary of course. I am not covering the different container technologies such as Docker, Rocket, LXC or others. There are no winners or losers, I leave it up as an exercise to the reader to decide if any of the compared OSes would be useful for them. Got an OS that's not covered? Leave a comment!

# Battle measurements
 - Ease of deployment
 - Ease of use
 - Documentation
 - Integrations
 - Functionality

So let's see what we can get out of this :)

# CoreOS

## Ease of deployment

**[CoreOS](http://coreos.com)** is sort of the poster child of container OSes currently, and they're really making it easy to try out. You can run it on public cloud platforms such as Azure, EC2, DigitalOcean, EC2 Container Service, GCE, RackSpace, or baremetal, or on Vagrant, OpenStack or VMware. There are even more community-supported deployments models if those listed doesn't satisfy what you're after, a [full list is available here](https://coreos.com/docs/#running-coreos). Lots of choices and they're all deployed using something called a cloud-config.

Cloud-configs is are special files that let's you set machine parameters, launch services at start, configure the underlying hardware and so on, and is supported on several modern distributions such as Ubuntu, CentOS, CoreOS, RancherOS and more. If you haven't started looking at cloud-config yet you should [go read this](https://www.digitalocean.com/community/tutorials/an-introduction-to-cloud-config-scripting).

# Ease of use

When you first deploy CoreOS, you'll quickly realize that it's actually made to not login to. Ever. This is pretty interesting and makes you look at deploying this in your infrastructure in a different light as most existing infrastructure management tools require a login or agent running on the hosts, but that's not possible or suitable here. More distributions are looking at this way of deployment and management, and you should start to get used to it.

To manage CoreOS, you use utilities such as **etcd** (a great key/value store for service discovery) and **fleet** (a tool to manage the scheduling of services).

[etcd](https://coreos.com/docs/distributed-configuration/getting-started-with-etcd/) is a key-value store used for shared configuration and service discovery, and is used already when you establish and build out the CoreOS cluster. It can then be used for all kinds of purposes for your applications, such as storing information on how applications are linked together and how they are configured. There's also a [free online version of etcd](https://coreos.com/docs/cluster-management/setup/cluster-discovery/) that you can use when trying out CoreOS on Vagrant for instance.

[fleet](https://coreos.com/docs/launching-containers/launching/launching-containers-fleet/) is then used to start/stop/schedule services, actually talking to [systemd](https://coreos.com/docs/launching-containers/launching/getting-started-with-systemd) to start containers as services. fleet is used to create more than just single containers though, it can also run something called "global units" which are run on all servers, suitable for monitoring agents or parts of an orchestration system such as Kubernetes or Mesos.

# Documentation

CoreOS has almost an entire book published under their [docs site](https://coreos.com/docs/), and it's full of really great examples, howtos and customizations. I don't think I couldn't ask for more from a documentation standpoint, they've done a tremendous job making it accessible, easy to read and interesting.

# Integrations

CoreOS has a lot of 3rd party integrations already, from [logging](https://logentries.com/logentries-and-coreos-announce-real-time-log-management-and-analytics-integration-for-highly-distributed-environments/), [management](https://coreos.com/blog/coreos-just-got-easier-to-try-with-panamax/), [monitoring](https://www.datadoghq.com/2014/08/monitor-coreos-scale-datadog/), resource abstraction and orchestration using Mesos and Marathon for instance and more. It seems like a lot of companies and projects wants to be a part of the CoreOS ecosystem.

# Functionality

CoreOS is what you could call a mature container OS. It's currently being used by a large community, and the company behind it is focused on large scale deployments. It has a lot of functionality built into it that then ties into the integrations mentioned above, it has auto-updating of entire clusters, automatic clustering during deployment thanks to cloud-config and etcd etc. Lots of good stuff.

# Conclusion

If you haven't tried out CoreOS yet, I highly recommend you to do so. I would recommend to try it out locally using Vagrant, or by using any of cloud providers listed above.

Good luck and have fun!
