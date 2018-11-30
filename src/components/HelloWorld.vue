<template>
  <div class="hello">
    <span v-if="user!= null" class="name">Hi {{user.displayName}}! </span>
    <button v-if="user==null"@click="login" class="logbtn">Login</button>
    <button v-else @click="logout" class="logbtn">Logout</button>

    <div class="spacer-10"></div>
    <h1>My Chat App</h1>
    <h4>Vue.js using Firebase</h4>
    <img alt="Vue logo" src="./../assets/logo.png">
    

    <div class="messages" v-chat-scroll>
      <span v-for="message in messages" :key="message.id">[{{ message.name }}]: {{ message.message }}<br></span>
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage">
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from './firebaseInit'

export default {
  name: 'HelloWorld',
  data() {
    return {
      messages: [],
      newMessage: '',
      name: '',
      user: null
    }
  },
  created() {
    let messagesRef = db.collection('messages').orderBy('timestamp')

    messagesRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change) => {
        if(change.type == 'added') {
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: doc.data().timestamp
          })
        }
      })
    })

    // Authentication
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.user = user;
        this.name = user.displayName
        } else  {
          this.user = null;
          this.name = ''
        }
      }.bind(this));
  },
  methods: {
    sendMessage() {
      if(this.name == null || this.name === '') {
        this.askName()
      } else {
        db.collection('messages').add({
          message: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        }).then(docRef => {
          console.log('Message sent. ', docRef.id)
          this.newMessage = ''
        }).catch(error => {
          console.error('Error: ', error)
        })
      }
    },
    askName() {
      this.name = window.prompt("Hi! What's your name?")
    },
    login() {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function(result) {
      }).catch(function(error) {
        console.error("Error: ", error)
      })
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.name = ''
      }).catch(error => {
        console.Error('Error: ', error)
      })
    }
  }
}
</script>

<style scoped>
.hello {
  width: 50%;
  margin: 0 auto;
  min-width: 300px;
  max-width: 720px;
}
.messages span {
    text-align: left;
    width: 100%;
    display: block;
    overflow-wrap: break-word;
}
.messages {
    height: 33vh;
    overflow-y: auto;
}
.spacer-10{
  height: 10px;
}
.name {
  float: left;
}
.logbtn {
  float: right;
}
form {
  display: flex;
}
form input {
  flex: 11;
}
form button {
  flex: 1;
}
</style>