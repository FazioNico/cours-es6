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
        <div id="time"></div>
        <h1>${this.pageTitle} ${this.formData.email} !</h1>
      </section>
    `;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )

    document.querySelector("#time").innerHTML = this.getTime(new Date())
    setInterval(_=> {
        document.querySelector("#time").innerHTML = this.getTime(new Date())
    },1000)
  }

  getTime(time){
    return    `
    <time datetime="${(time.getFullYear() < 10)?'0'+time.getFullYear():time.getFullYear()}-${(time.getMonth() < 10)?'0'+time.getMonth():time.getMonth()}-${(time.getDate() < 10)?'0'+time.getDate():time.getDate()} ${(time.getHours() < 10)?'0'+time.getHours():time.getHours()}:${(time.getMinutes() < 10)?'0'+time.getMinutes():time.getMinutes()}:${(time.getSeconds() < 10)?'0'+time.getSeconds():time.getSeconds()}">
      ${(time.getHours() < 10)?'0'+time.getHours():time.getHours()}:
      ${(time.getMinutes() < 10)?'0'+time.getMinutes():time.getMinutes()}:
      ${(time.getSeconds() < 10)?'0'+time.getSeconds():time.getSeconds()}
    </time>
    `;
  }
}
