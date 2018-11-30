<template>
  <div class="hello">
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage">
      <button type="submit">Send</button>
    </form>
    <div class="chat">
      <span v-for="message in messages" :key="message.id">[{{ message.name }}]: {{ message.message }}<br></span>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'HelloWorld',
  data() {
    return {
      messages: [],
      newMessage: '',
      name: ''
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
span {
    text-align: left;
    width: 100%;
    display: block;
    overflow-wrap: break-word;
}
.chat {
    height: 50vh;
    overflow-y: auto;
}
</style>