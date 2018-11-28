import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

let config = {
  apiKey: "AIzaSyD6_xjm_SNSihrolhOq-Q9zl7U0rHnzznY",
  authDomain: "sample-chat3.firebaseapp.com",
  databaseURL: "https://sample-chat3.firebaseio.com",
  projectId: "sample-chat3",
  storageBucket: "sample-chat3.appspot.com",
  messagingSenderId: "296565329541"
}

const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({timestampsInSnapshots: true})

export default firebaseApp.firestore()
