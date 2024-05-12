

# LitLyx - Getting started, but Lit 🔥

We, as developers, don't have much time to waste finding the exact KPI/Analytics tracker for our projects. We need something fast, efficient, a no-time-wasting technology that does that one thing exceptionally.

So let me introduce you LitLyx. 👉<https://litlyx.com/>

# All You need to start in 1 min 👇

# Step 0 - Installation

You can install LitLyx using `npm`:

```sh
npm i litlyx
```

# Step 1 - Register an account on LitLyx

- go here 👉<https://litlyx.com/>
- Sign.in an account with google login.
- Create a project.
- You have 1500 page visits / custom events for free.
- Get your first project id, you will need in the Step 2.
Easy 🤑

# Step 2 - Choose your js/ts framework

No matter if you use Node.js, Nuxt.js, Next.js, Vue.js,React.js or even Bun.js we have you covered. 
Find all Supported Framework here: 👉<https://litlyx.com/docs/supported_tech>

For semplicity, and because we develop our 🔥 crm with it, we will use Nuxt.js as an example.

Initialize litlyx.

```js
Lit.init('project_id');
```

You are ready to go for collecting page visits, countries, and devices to track.
We handle everything for you.
Websites urls or Sub-Pages changes are logged already on our crm. That's it. Pretty easy.

# Step 3 - log a custom event on your website or web app

Easy! Lit up the event like this:

```js
Lit.event('pretty_cool_event', metadata: {
    'name': 'LitLyx so lit, dude!',
});
```

Put as many custom events as you prefer. We suggest to have at least a gazilion events in your code, so you can break the internet with it 🫡

# Step 4 - see the real-time results on Lit Crm

"Okay, now you've put a gazillion events and you have like 1M views in a second on your website." Fair numbers, I will say. Explore the crm.

# We Finish you are ready to go!! 

Bravo, you've finished the setup and now you can be ultra-lit with your light, easy-to-use analytics tools; you will love them for sure.

# Well, we love open source 

Prova, Prova, sa, sa, Lit guy here, i forget to tell you that all the project is open source. We love contributors, so, dont be shy. Nobody will get roasted here, just Lit Up a bit. 🔥

This project was made with 🔥 & ❤️ in Italy. Share some love dafuq!!

🫰 from the Lit Guy  👽 


# Official Docs
Find out all you need here.
👉<https://docs.litlyx.com/>


# License

LitLyx is licensed under [Apache 2.0](/LICENSE.md) license.

# Copyright

Copyright 2024 LitLyx

Permission is granted, at no cost, to any person who secures a copy of this material and associated documentation files (the "Material"), to engage with the Material without limitation, including but not limited to the rights to utilize, duplicate, adapt, amalgamate, disseminate, grant sublicenses, and/or trade copies of the Material, and to allow persons to whom the Material is provided to do the same, under the following conditions:

The foregoing copyright notice and this permission notice must be included in all copies or significant portions of the Material.

THE MATERIAL IS PROVIDED "AS IS", WITHOUT ANY WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL THE CREATORS OR COPYRIGHT OWNERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE MATERIAL OR THE USE OR OTHER DEALINGS IN THE MATERIAL.