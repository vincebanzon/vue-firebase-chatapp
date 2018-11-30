import firebase from 'firebase'
import firestore from 'firebase/firestore'

let config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
}

const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({timestampsInSnapshots: true})

export default firebaseApp.firestore()
