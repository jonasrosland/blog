---
layout: post
title: "How I built an Alternate Reality Game - Part 2: The Chatbot"
modified:
categories:
description: "I AM A REAL HUMAN"
tags: [alternate reality game, arg, game, puzzle, mystery, chatbot]
comments: true
image:
  feature: Repro_Smoking_Spaceman_Robot_–_Ha_Ha_Toy_–_Silver_-_Close_Up_1-cropped.jpg
  credit: D J Shin - https://commons.wikimedia.org/wiki/File:Repro_Smoking_Spaceman_Robot_–_Ha_Ha_Toy_–_Silver_-_Close_Up_1.jpg
date: 2017-04-17
slug: i-wrote-an-arg-part-2
url: /i-wrote-an-arg-part-2
image: /images/Repro_Smoking_Spaceman_Robot_–_Ha_Ha_Toy_–_Silver_-_Close_Up_1-cropped.jpg
---

_This is a multi-part blog series. This is part 2._

As some of you quickly figured out when [playing the ARG](http://arg.jonasrosland.com) there's also a conversational piece to this game, not just a standard puzzle that you solve on your own.

Throughout the ARG you will converse with a chatbot (which I will not name to avoid spoilers) to progress through the game. I got the idea for this last year when playing the _outstanding_ ARG created by [Camoflaj](https://camouflaj.com) called [KILLYOURINTERNET](http://killyourinternet.com) (KYI). It was an eye-opening experience and the first ARG that I ever truly finished. So much fun!

In KYI you communicate with chatbots using an old-school BBS. And yes, there are still BBS servers running! You had to download special software to connect to it, log in, browse through files and chat to the bots. I wanted to make a more modern version of this.

![Meya.ai](/images/meya.jpg)

There's a plethora of options right now if you want to create a chatbot; you can write your own (crazy), use templates and basic services (eh) or use a service that allows you to connect it to many modern chat services (yay!). I chose the latter, and after a few failed starts in trying out different services I settled on the excellent [Meya.ai](https://meya.ai). I really liked their service not only because they had connections to many interesting services such as Telegram, Twilio, Slack and Smooch (which I'll cover in a bit) but also thanks to their _awesome_ service through their Slack team. [Erik Kalviainen](https://twitter.com/ekalvi), co-founder of Meya.ai, helped me understand chatbots and work through issues which I believe I would never have been able to grasp otherwise. Big props!

![Meya and API.AI](/images/meya-api.jpg)

I started creating flows and tying the bot to a Natural Language Processing (NLP) service called [wit.ai](https://wit.ai) to make sure it understood different sentences and intents such as "Hello", "Who are the hackers?" and "Are you a bot?". Not just answering basic questions, but also adding a rudimentary understanding of intents to make sure that when the bot asked questions the player's answers like "yes", "yup" and "I sure am" were all understood as positive replies.
Right before I launched the ARG publicly, Meya.ai announced support for [API.AI](https://api.ai) which is another NLP service which also includes a ["small talk"](https://docs.api.ai/docs/small-talk) function so you can enjoy conversations like these:

```
Player: How are you?
Bot: Wonderful as always. Thanks for asking.

Player: You're so sweet.
Bot: I like you too. You're one of my favorite people to chat with.

Player: What are you doing tonight?
Bot: I've been kind of bored, actually. Do you have some work for me?
```


Thanks to that addition to Meya.ai I switched over to API.AI instead of wit.ai to make the bot a bit more relatable, which definitely made a difference in how people saw the bot. It's still a bot of course and won't understand everything that the players ask or tell the bot to do, but it definitely helped.

![Meya connected to Telegram and Twilio](/images/meya-api-twilio-telegram.jpg)

So now we have a bot that understands the players. The big question now was how to get the players to actually _talk_ to the bot. After a few tests I settled on two methods: simple text messages and [Telegram](https://telegram.org). Why Telegram and not another service such as LINE, Viber or kik you might ask? Well, for one, Telegram releases parts of their tools open source (love!) and secondly it has great public documentation around their API and how to build bots, _and_ they have a ["BotFather"](https://core.telegram.org/bots#6-botfather) which you converse with to create your own bot. Yes, that's right. You converse with a Telegram bot to create a Telegram bot. I'm telling you, we're living in the future.

Telegram was quickly set up, but what about text messages? For that task it was an easy choice, I went with [Twilio](https://twilio.com). A few minutes after signup and I'm talking to my bot using a pseudo-random number (it spells CODE at the end :)). I couldn't be happier.

However, after a while I realized that one of the best things about the KYI ARG was that the creators actually _stepped in_ to nudge people in the right direction if needed. First time that happened I _freaked out_ as they took over the conversation, and it made me love the game even more. I wanted something similar to that, if possible. After a quick search I stumbled upon [Smooch.io](https://smooch.io) which provided _exactly_ what I wanted!

![Meya connected to Smooch](/images/meya-smooch.jpg)

With Smooch.io I was able to tap in to the conversations the players were having with the bot, and send them messages to help them along the way if they got too stuck.

All the messages that were sent between the players and the bot were automatically replicated into a specific Slack team that I created for this purpose, which is also where I was able to converse with the players without breaking the immersion that it was the bot talking to them.

Wonderful! Big Brother like? You betcha. Helpful to make me understand what I was doing wrong so I could fix bot responses? Definitely.

By using all of these technologies together I was able to create a bot that could handle basic conversations on multiple modern communication platforms. I even added a Slack bot that players in the [{code} Community](http://codedellemc.com/community) could talk to but unfortunately Smooch.io doesn't support Slack as a customer channel yet, they're looking to ship that later this year. So I was blind to those conversations, but they were fortunately rare.

The end result of the chatbot network looks like this, I'm super impressed by all the companies involved in making this possible, you have all been a delight to work with:

![Final setup of the chatbot](/images/meya-final.jpg)

I've learnt a ton and had so much fun creating this bot that I hope I can put these newfound abilities and competencies to work again for something even more useful :)

If you want to try out the ARG you can start your journey by going here: [http://arg.jonasrosland.com](http://arg.jonasrosland.com)


*Image credit goes to the companies mentioned above and the following individuals:*

*[workstation by Creative Stall from the Noun Project](https://thenounproject.com/term/workstation/111266/)*

*[Mobile by Creative Stall from the Noun Project](https://thenounproject.com/creativestall/collection/education-line-icon/?q=phone&i=784553)*

*[puppet by Alexis Lilly from the Noun Project](https://thenounproject.com/search/?q=puppet&i=57357)*
