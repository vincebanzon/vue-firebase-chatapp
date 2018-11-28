<template>
  <div>
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage">
      <button type="submit">Send</button>
    </form>
    <div v-for="message in messages" :key="message.id">
      <span>
        {{ message.message }}
      </span>
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
  }
}
</script>