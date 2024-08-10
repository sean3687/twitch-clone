## Overview
<img width="1331" alt="image" src="https://github.com/user-attachments/assets/cee7600e-6123-422e-9b0c-060c335c9786">

* Chat interface with mockdata
* More messages button when user scroll up
* Render user messages by commend "@" "/" ":"
* Twitch embedding
* Responsive design



## Getting Started

First, clone the project

```bash
git clone https://github.com/sean3687/twitch-clone.git
```
Second install dependencies

```bash
npm install
```
Lastly, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependencies used

None


## Deploy on Vercel

Live version: https://twitch-clone-neon.vercel.app/

## Challenges
The most time-consuming part was figuring out how to convert a string of emote commands into emote URLs so emotes could be displayed in the chat. I managed to overcome this challenge by leveraging my previous experience with implementing a ChatGPT-like service, where I had to render responses using regex.

Another challenge was separating the local and development environments. I didn't want anyone forking this repo to worry about setting environment variables, so I removed .env from .gitignore and set up the code to return different host URLs for the dev and local environments.


