import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var config_ = {
  apiKey: "AIzaSyCyHgI4hTxSbIEuhDWUccb5KeyigaqqyH4",
  authDomain: "foreno-core.firebaseapp.com",
  projectId: "foreno-core",
  storageBucket: "foreno-core.appspot.com",
  messagingSenderId: "901056547970",
  appId: "1:901056547970:web:f720239f9fafb9bcf6b89b",
  measurementId: "G-TD3SKK9KDM",
};
var config = {
  apiKey: "AIzaSyBVJ5J_C_8S_RLT_ETXRVwBGOGgAPsMit0",
  authDomain: "foreno-test.firebaseapp.com",
  projectId: "foreno-test",
  storageBucket: "foreno-test.appspot.com",
  messagingSenderId: "671638158318",
  appId: "1:671638158318:android:1e01a7627ec648495e2cff",
  measurementId: "G-TD3SKK9KDM",
};

firebase.initializeApp(config);

