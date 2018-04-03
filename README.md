# feathers-chat-vuetify-electron

> Feathers Vue Vuex Vuetify Electron Example

This example borrows heavily from - [feathers-chat-vuex example](https://github.com/feathers-plus/feathers-chat-vuex) - although it doesn't use the - [feathers-vuex](https://github.com/feathersjs/feathers-vuex) - Feathers client plugin. 
This is because as a feathers newbie, I needed to see how feathers and vuex work together, so opted to do all the "switchboarding" between these tools myself.

It is based on the [Vuetify Electron Boilerplate](https://github.com/vuetifyjs/electron) - which in turn is based on [Electron Vue's Boilerplate](https://simulatedgreg.gitbooks.io/electron-vue/content/en/). 
Check out the other cool [Vuetify Boilerplate options](https://vuetifyjs.com/en/getting-started/quick-start#new) including PWA and Cordova!


## Codesmells?

I have opted for readibility over DRY in many cases. (At least I think I have.)
eg: 
- Have opted NOT to use vuex mapActions and mapGetters, so that fellow "second-language speakers" can more clearly see how vuex works with feathers.
- As stated above: Did not use the feathers-vuex client plugin to make the connections between vuex and feathers more explicit. Will certainly use it in the future now that this process has taught me what's happening under the hood a bit better.
- Have explicitly called `feathers.service('messages')` and such wherever used, instead of wrapping them in the more DRY `const messageService = feathers.service('messages')`
- Lots of newbie-ish level comments. 


### Kooky Commits

Often I go back through the git history of other people's example code to get a sense of how they built the app. In this case I would advise against it: I first built the whole GUI and extras and then deleted and simplified it all for this shared example that works with the standard feathers-chat-server. Going through that history will probably confuse a learner more than enlighten.


### Inconsistent function definitions

Very much a no-no in production apps, but here I sometimes switch between different ways to define methods. Just showing different options together, because in different tutorials I see different ways. 
When I refactor the app that came out of this process, I will probably use the first style below wherever reasonable.

Sometimes:
```
    logOut() {
      this.$store.dispatch('logOut')
    },

```
Othertimes:
```
    scrollToEnd: function() {
      var container = this.$el.querySelector("#scroll-container");
      container.scrollTop = container.scrollHeight;
    }
```
Othertimes:
``` 
    scrollToEnd: () => {
      var container = this.$el.querySelector("#scroll-container");
      container.scrollTop = container.scrollHeight;
    }
```


## API Setup

This project is designed to work alongside the [`feathers-chat`](https://github.com/feathersjs/feathers-chat) application.  Please make sure you have the `feathers-chat` server app running before you try to use this one.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```


## How to play with the chat aspects

Once you have the feathers server started, and the electron app up and running; go to [localhost:3030/vanilla](http://localhost:3030/vanilla/). Then sign up as a new user and chat with yo' self. ;P

Maybe try out some of the other client examples, and have them all chatting to the same server!

- [feathersjs-ecosystem/feathers-chat-react](https://github.com/feathersjs-ecosystem/feathers-chat-react)
- [feathersjs-ecosystem/feathers-react-native-chat](https://github.com/feathersjs-ecosystem/feathers-react-native-chat)
- [feathersjs-ecosystem/feathers-chat-angular](https://github.com/feathersjs-ecosystem/feathers-chat-angular)
- [feathers-plus/feathers-chat-vuex](https://github.com/feathers-plus/feathers-chat-vuex)

Maybe even my own one too:
- [L-K-Mist/feathers-chat-vuetify-pwa](https://github.com/L-K-Mist/feathers-chat-vuetify-pwa)
(It works although it currently over-uses fetching all messages from the feathers server instead of updating the latest message `.on('created', pushNewMessageIntoMessagesArray())`)
Note: Will probably totally re-do the Vuetify PWA version, by porting the render portion of this app to the repo. Yes, yes, normally you'd do it the other way around with Electron. ie Build Web-app, port the webapp to the render part of Electron. That's sort of what I did, only learnt a lot en route, so the PWA is behind this Electron version in understanding. 


## Imagined FAQ 

### What's PouchDB doing in there?

I added PouchDB because I love it and the potential of Offline-First.
In my case the state of the machine is saved to the local pouch db every 30 seconds, for the sake of future analysis. 
For struggling startups "on the make" it means you can split different parts of your app over different Free-Tier servers. ie GUI state is synced to CouchDB on [Cloudant](https://www.ibm.com/cloud/cloudant) Chat and perhaps your feathers services are hosted via [Zeit](https://zeit.co/). 


### Why is Feathers Chat not front and center like in the other examples

To encourage fellow learners to play with feathers from this app, but keep the in-app chat as a side-feature.
eg. In my case I built a GUI to control temperatures with an arduino and share the results on-line in the browser version, but chose not to get rid of the chat feature, but rather hacked it so that serial messages from the arduino joined in on the human chat.

The above required adding new services to the standard feathers chat server, so they were deleted for this example.

If you are using this example as a springboard; why not do similar?  Clone the server example, and incrementally plug in new services. Eg. Can you get a slider to be shared accross clients in real-time ? (you'll need debounce for that see: `src/helpers/debounce.js`)


### Where is Gravatar like in the other feathers-chat examples?

I cut it out to make more space in the sidebar for messages.


### What other extras are in the code, but not actually shown yet during run dev?

#### Reusable Slider Components
In components/ReUse I've left two examples of reusable sliders. Basically they are components that you can call on in your own components by importing them; registering them; and giving them data values for the exposed props.  <-- in the script section.
Then embed them <-- in the template section, like below:

```
 <temp-slider name="Left Target"  
              v-model="heaterLeftTarget" 
              :value='heaterLeftTarget' 
              :progressVal="heaterLeftActual"></temp-slider>

```

