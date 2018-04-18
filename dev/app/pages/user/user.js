export class UserPage {

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
