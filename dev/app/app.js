/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 06-12-2016
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
            <label for="email">Email:</label> <input type="email" name="email" value="" placeholder="votreemail.ch"  /><br/>
            <label for="password">Password:</label> <input type="password" name="password" value=""  /><br/>
            <button>Login</button>
          </p>
        </form>
      </section>`;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    this.loadEventUI()

  }

  loadEventUI(){
    let loginForm = document.getElementsByTagName("form")[0];
    loginForm.addEventListener("submit",  event => this.onLogin(event))


  }

  onLogin(event){
    event.preventDefault()
    let validationInput = 0
    let formInput = {}
    let form = document.forms[0].elements
    for (let i = 0; i < form.length; i++) {
      console.log(formInput)
      if(form[i].value){
        formInput[form[i].name] = form[i].value
        validationInput++
      };
    }
    console.log(formInput)
    if(validationInput !== 2) return ;
    console.log('load UserPage')
    new UserPage(this.appBody,formInput);
  }

}

class UserPage {

  constructor(appBody,formInput){
    this.appBody = appBody
    this.formData = formInput
    this.pageTitle = "Hello";
    this.initUI();
  }

    initUI(){
      // remove all section before display UI
      if(document.getElementsByTagName("section")[0]){
        document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
      }

      // create page skeleton
      let pageSkeleton = `
        <section>
          <h1>${this.pageTitle} ${this.formData.email} !</h1>
        </section>
      `;
      // add page skeleton in body
      this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    }
}

let myApp = new MyApp();
myApp.start();
