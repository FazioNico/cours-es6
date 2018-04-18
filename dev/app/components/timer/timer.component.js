export class TimerComponent {

  constructor(selector){
    if(!document.querySelector(selector)) {
      return alert(`Pas de selector ${selector} trouvé dans le DOM.`)
    }
    document.querySelector(selector).innerHTML = this.getTime(new Date())
    setInterval(_=> {
        document.querySelector(selector).innerHTML = this.getTime(new Date())
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
