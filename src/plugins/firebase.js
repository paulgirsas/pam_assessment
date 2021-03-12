import firebase from 'firebase/app';

// Import needed firebase modules
import 'firebase/auth';

// Firebase app config
// const config = {
//     apiKey: process.env.VUE_APP_API_KEY,
//     authDomain: process.env.VUE_APP_AUTH_DOMAIN,
//     databaseURL: process.env.VUE_APP_DATABASE_URL,
//     projectId: process.env.VUE_APP_PROJECT_ID,
//     storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
//     appId: process.env.VUE_APP_APP_ID
// };
const config = {
    apiKey: 'AIzaSyCK7793Zg_-SP7_l804nqmthde3tzsFLy0',
    authDomain: 'pam-project-1ed66.firebaseapp.com',
    databaseURL: '',
    projectId: 'pam-project-1ed66',
    storageBucket: 'pam-project-1ed66.appspot.com',
    messagingSenderId: '248297908487',
    appId: '1:248297908487:web:4a4245d34f0c03dd4cfda2'
};

// Init our firebase app
firebase.initializeApp(config);