import * as firebase from "firebase";

export class FirebaseService {

  constructor(config) {
    firebase.initializeApp(config)
    this.auth = firebase.auth();
    this.googleProv = new firebase.auth.GoogleAuthProvider();
  }

  signInWithGoogle(){
    this.auth.signInWithPopup(this.googleProv)
    .then((result)=> {
        console.log('isAuth', result)
        // Sauvegarder les infos user dans Firebas database!!
        // Pex: ds une collection "users"
        // database.ref('users/'+ result.user.uid).set({
        //   displayName: result.user.displayName,
        //   email: result.user.email,
        //   emailVerified: result.user.emailVerified,
        //   photoURL: result.user.photoURL
        // })
    })
    .catch((err)=> {
        console.log('Error on Auth', err)
    })
  }
}
