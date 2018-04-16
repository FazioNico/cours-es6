/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 11-10-2016
*/



class HomePage {
  constructor(appBody){
    this.appBody = appBody;
    this.pageTitle = 'Hello World'
    this.initUI()
  }

  initUI(){
    // create page skeleton
    let pageSkeleton = `
      <section>
        <h1>${this.pageTitle}</h1>
      </section>`;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
  }
}

class MyApp {

  constructor(){
    this.appBody = document.getElementsByTagName("app")[0];
  }

  start(){
    new HomePage(this.appBody)
  }

}


let myApp = new MyApp();
myApp.start();
