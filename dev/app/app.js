/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 01-09-2016
*/

class MyApp {
  constructor(){
    this.appBody = document.getElementsByTagName("body")[0];
  }
  start(){
    // create pageSection
    let pageSection   = document.createElement("section");
    // create titleContner
    let titleContner  = document.createElement("h1");
    // create TextNode for title of page
    let titleTextNode = document.createTextNode("Hello world!");
    // push titleTextNode in titleContner
    titleContner.appendChild(titleTextNode);
    // push titleContner in pageSection
    pageSection.insertBefore(titleContner, pageSection.childNodes[0]);
    // push pageSection in appBody
    this.appBody.insertBefore(pageSection, this.appBody.childNodes[0]);
  }
}

let myApp = new MyApp();
myApp.start();
