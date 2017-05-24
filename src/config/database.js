import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCacdW-FkQ9bzdKYUNTVG1zj0tPQp1Whic",
    authDomain: "dev-checklist.firebaseapp.com",
    databaseURL: "https://dev-checklist.firebaseio.com",
    projectId: "dev-checklist",
    storageBucket: "dev-checklist.appspot.com",
    messagingSenderId: "759625038889"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
