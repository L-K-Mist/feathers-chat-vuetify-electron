# p2d-controller

> Feathers Vue Vuex Vuetify Electron Example

It borrows heavily from  - [feathers-chat-vuex example](https://github.com/feathers-plus/feathers-chat-vuex)although it doesn't use the [feathers-vuex](https://github.com/feathersjs/feathers-vuex) Feathers client plugin. 
This is because as a feathers newbie, I needed to see how feathers and vuex work together, so opted to do all the "switchboarding" between these tools myself.

## Codesmells?

I have opted for readibility over DRY in many cases. (At least I think I have.)
eg: 
- Have opted NOT to use vuex mapActions and mapGetters, so that fellow "second-language speakers" can more clearly see how vuex works with feathers.
- As stated above: Did not use the feathers-vuex client plugin to make the connections between vuex and feathers more explicit. Will certainly use it in the future now that this process has taught me what's happening under the hood a bit better.
- Have explicitly called `feathers.service('messages')` and such wherever used, instead of wrapping them in the more DRY `const messageService = feathers.service('messages')`
- Lots of newbie-ish level comments.

### Kooky Commits

Often I go back through the git history of other people's example code to get a sense of how they built the app. In this case I would advise against it: I first built the whole GUI and extras and then deleted and simplified it all for this shared example that works with the standard feathers-chat-server. Going through that history will probably confuse a learner more than enlighten.

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



## Imagined FAQ 

### What's PouchDB doing in there?

I added PouchDB because I love it and the potential of Offline-First.
In my case the state of the machine is saved to the local pouch db every 30 seconds, for the sake of future analysis. 
For struggling startups "on the make" it means you can split different parts of your app over different Free-Tier servers. ie GUI state is synced to CouchDB on (Cloudant)[https://www.ibm.com/cloud/cloudant] Chat and perhaps other feathers services are hosted via (Zeit)[https://zeit.co/]. 

### Why is Feathers Chat not front and center like in the other examples

I actually want fellow learners to play with feathers from this app, but keep the in-app chat as a side-feature.
eg. In my case I built a GUI to control temperatures with an arduino and share the results on-line in the browser version, but chose not to get rid of the chat feature, but rather hacked it so that serial messages from the arduino joined in on the human chat.

The above required adding new services to the standard feathers chat server, so they were deleted for this example.

If you are using this example as a springboard; why not do similar?  Clone the server example as well and incrementally plug in new services.

### Where is Gravatar like in the other feathers-chat examples?

I cut it out to better fill the side-bar, and as somewhat unnecessary for my purposes and perhaps those of fellow-learners.