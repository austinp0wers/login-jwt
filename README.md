:grinning: Purpose of this repo

While i was browsing through the developers community, i saw a post written by an online learning platform in korea named 'Inflearn'.
It was mainly about how they faced problems with the increase in traffic due to the promotion they held at the start of 2022.

Although they had many servers and they were actively load balancing. (Not sure what algorithms they used, but many round robin?)
However even than, some slow queries and just the crazy amount of traffic led them to big headache.

So I personally felt that by moduling I can create an app which isn't dependent on each other 
and so if increase in traffic, i can horizontally scale by detaching the modules into their own and adding servers 
and balance the load altogether, by having some sort of connections with each other like a MSA architecture.

To be Honest, i only know what an MSA architecture is but not in depth of how these modules collide and stuff.
So, that i will learn as i go. 

So to wrap this up, 
:speech_balloon: the reason for this separate login - Module is to be able to attach and use it for different applications i build 
by simply customising bits and pieces to best fit the project needs.
