import { UserPage } from '../user/user'

export class HomePage {

  constructor(appBody){
    this.appBody = appBody
    this.pageTitle = 'Hello aaa!';
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


    setTimeout(_=> {
      $('body').fadeOut()
    }, 2000)

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
