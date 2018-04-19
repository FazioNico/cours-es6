import { UserPage } from '../user/user'
import { homeSkeleton } from './home-ui'

export class HomePage {

  constructor(appBody, firebaseService){
    this.fb = firebaseService
    this.appBody = appBody
    this.pageTitle = 'Hello aaa!';
    this.initUI();
  }

  initUI(){
    // create page skeleton
    let pageSkeleton = homeSkeleton({pageTitle:this.pageTitle});
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    this.loadEventUI()

  }

  loadEventUI(){
    let btn = document.getElementById("logGoogle");
    btn.addEventListener("click",  event => this.onLogin(event))

  }

  onLogin(event){
    this.fb.signInWithGoogle()
  }

}
