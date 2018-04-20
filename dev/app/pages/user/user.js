import { TimerComponent } from '../../components/timer/timer.component';
import fetchService from '../../providers/fetch.service'
import { userSkeleton } from './user-ui'

export class UserPage {

  // orchestrateur (controleur)
  constructor(appBody, user, firebase){
    this.appBody = appBody
    this.user = user
    this.fb = firebase
    this.pageTitle = "Hello";
    this.initUI();
    this.loadEventUI()
  }

  // Création de l'interface user (UI)
  initUI(){
    // remove all section before display UI
    if(document.getElementsByTagName("section")[0]){
      document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
    }
    // create page skeleton
    let pageSkeleton = userSkeleton({
      pageTitle: this.pageTitle,
      user: this.user
    });
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )

    new TimerComponent('#time');
    // appeler le provider et chainer avec le .then
    fetchService.get(
      'https://api.unsplash.com/photos/random?client_id=f97fd672a4603d82fbccad44251ccad969da447cc5035947f1beef0b0a629518', {
      headers: {
        "x-access-token": "xxxxxx"
      }
    })
    .then(res => {
      document.body.style.backgroundImage = `url('${res.urls.regular}')`
    })
  }

  // Tous les eventement UI
  loadEventUI(){
    // event sur le btn logout pour disconnect user
    document.getElementById('logout').addEventListener('click', _=> this.logout())
  }

  // logique methods
  logout(){
    this.fb.auth.signOut()
  }

}
