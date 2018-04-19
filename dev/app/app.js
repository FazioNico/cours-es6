/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 06-12-2016
*/

import { HomePage } from './pages/home/home'
import { UserPage } from './pages/user/user'
import { FirebaseService } from './providers/firebase.service'

const CONFIG = {
  firebase: {
    apiKey: "AIzaSyBmUO0HLj6NnL608Mukc_8bzCNN9bnBPOg",
    authDomain: "fir-training-2018.firebaseapp.com",
    databaseURL: "https://fir-training-2018.firebaseio.com",
    projectId: "fir-training-2018",
    storageBucket: "fir-training-2018.appspot.com",
    messagingSenderId: "1067149517198"
  }
};


class MyApp {

  constructor(config){
    this.config = config;
    this.appBody = document.getElementsByTagName("app")[0];
  }

  start(){
    let fb = new FirebaseService(this.config.firebase)
    fb.auth.onAuthStateChanged((user)=> {
      if(user){
        console.log('LOG');
        // init UserPage
        new UserPage(this.appBody, user)
      }
      else {
        console.log('NOT LOG');
        // init HomePage
        let homePage = new HomePage(this.appBody, fb);
      }
    })
  }
}

let myApp = new MyApp(CONFIG);
myApp.start();
