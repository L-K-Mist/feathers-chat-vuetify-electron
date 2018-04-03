# p2d-controller

> Feathers Vue Vuex Vuetify Electron Example

It borrows heavily from  - [feathers-chat-vuex example](https://github.com/feathers-plus/feathers-chat-vuex)

although it doesn't use the [feathers-vuex](https://github.com/feathersjs/feathers-vuex) Feathers client plugin. This is because as a feathers newbie, I needed to see how feathers and vuex work together, so opted to do all the "switchboarding" between these tools myself.

## Codesmells?
I have opted for readibility over DRY in many cases. (At least I think I have.)
eg: 
- Have opted NOT to use vuex mapActions and mapGetters, so that fellow "second-language speakers" can more clearly see how vuex works with feathers.
- As stated above: Did not use the feathers-vuex client plugin to make the connections between vuex and feathers more explicit. Will certainly use it in the future now that this process has taught me what's happening under the hood a bit better.
- Have explicitly called `feathers.service('messages')` and such wherever used, instead of wrapping them in the more DRY `const messageService = feathers.service('messages')`
- Lots of newbie-ish level comments.



## API Setup
This project is designed to work alongside the [`feathers-chat`](https://github.com/feathersjs/feathers-chat) application.  Please make sure you have the `feathers-chat` server app running before you try to use this one.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev