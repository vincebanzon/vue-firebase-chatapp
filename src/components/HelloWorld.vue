<template>
  <div>
    <div v-for="message in messages" :key="message">
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
      messages: []
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
  }
}
</script>