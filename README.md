:grinning: Purpose of this repo

I have been using sessions as a way to check user authentication. Personally i thought that was the best way to do so.
(since it's the only way i know)

After a while, i saw a youtube clip on how sessions essentially save all the users session information on its memory. <br> 
<b>The downside to this</b> is that with huge amounts of users, the server will have less memory to execute it's program 
and eventually decrease the speed of execution due to insufficient memory on the server.

So in order to resolve this problem, you can use Tokens in this case Json Web Token (JWT).
instead of storing each session on the server side, give out a hashed signature to the customer
and the server only needs to know the secret code to verify the Token.


So to wrap this up, 
:speech_balloon: the reason for this separate login - Module is to be able to attach and use it for different applications i build 
by simply customising bits and pieces to best fit the project needs and also to use and learn more about the JWT.


I have come to realization that refresh token is <b>ESSENTIAL</b> along with the access token,
so for coming days, i will definitely be adding them to this module.
