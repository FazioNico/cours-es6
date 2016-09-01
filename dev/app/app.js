/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 02-09-2016
*/

class MyApp {

  constructor(){
    this.appBody = document.getElementsByTagName("app")[0];
  }

  start(){
    // init HomePage
    let homePage = new HomePage(this.appBody);
  }

}

class HomePage {

  constructor(appBody){
    this.appBody = appBody
    this.pageTitle = 'Hello world!';
    this.initUI();
  }

  initUI(){
    // create page skeleton
    let pageSkeleton = `
      <section>
        <h1>${this.pageTitle}</h1>
        <form>
          <p>
            <label for="email">Email:</label> <input type="email" id="email" name="email" value="" placeholder="votreemail.ch"/><br/>
            <label for="password">Password:</label> <input type="password" id="password" name="password" value=""/><br/>
            <button id="loginBtn">Login</button>
          </p>
        </form>
      </section>`;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    this.loadEventUI()
  }

  loadEventUI(){
    let loginForm = document.getElementsByTagName("form")[0];
    loginForm.addEventListener("submit", this.onLogin, false)
  }

  onLogin(event){
    //debugger
    event.preventDefault()
    let formInput = event.target
    console.log(event)
    console.log(formInput)
  }

}
let myApp = new MyApp();
myApp.start();
