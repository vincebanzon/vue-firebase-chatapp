# Vue Firebase Chatapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Input your Firebase Settings
```
Open file: /src/components/firebaseInit.js

let config = {

  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
}
```

### Compiles and minifies for production
```
npm run build
```

### Initialize Firebase
```
firebase init
1. Which Firebase CLI features do you want to setup for this folder?
  Check: Firestore and Hosting
2. Select a default Firebase project for this directory
  Select the project you used for firebaseInit.js file
3. What file should be used for Firestore Rules?
  Just hit Enter
4. What file should be used for Firestore indexes?
  Just hit Enter
5. What do you want to use as your public directory?
  ./dist  (then hit Enter)
6. Configure as a single-page app?
  Y (then hit Enter)

Double check your firebase.json file. Your hosting.public should be "./dist".
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": "./dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Deploy Firebase
```
firebase deploy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
