/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 01-09-2016
*/

class MyApp {

  constructor(){
    this.appBody = document.getElementsByTagName("app")[0];
    this.pageTitle = 'Hello world!'; 
  }

  start(){
    // create page skeleton
    let pageSkeleton = `
      <section>
        <h1>${this.pageTitle}</h1>
      </section>`;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
  }

}

let myApp = new MyApp();
myApp.start();
