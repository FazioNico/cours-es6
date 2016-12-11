(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Author: Nicolas Fazio <webmaster-fazio>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Date:   01-09-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Email:  contact@nicolasfazio.ch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified by:   webmaster-fazio
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified time: 09-12-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _home = require('./pages/home/home');

var _user = require('./pages/user/user');

var _storageService = require('./providers/storage/storage-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyApp = function () {
  function MyApp() {
    _classCallCheck(this, MyApp);

    this.appBody = document.getElementsByTagName("app")[0];
    this.storage = new _storageService.StorageService();
    this.storage.loadData();
  }

  _createClass(MyApp, [{
    key: 'start',
    value: function start() {
      if (this.storage.isAuth()) {
        console.log('user is auth-> ', this.storage.db[0].user);
        new _user.UserPage(this.appBody, this.storage);
      } else {
        console.log('user is not auth-> ', this.storage.db[0]);
        // init HomePage
        var homePage = new _home.HomePage(this.appBody, this.storage);
      }
    }
  }]);

  return MyApp;
}();

var myApp = new MyApp();
myApp.start();

},{"./pages/home/home":6,"./pages/user/user":8,"./providers/storage/storage-service":10}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Author: Nicolas Fazio <webmaster-fazio>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Date:   10-12-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Email:  contact@nicolasfazio.ch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified by:   webmaster-fazio
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified time: 11-12-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _unsplashService = require('../../providers/unsplash/unsplash-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BackgroundComponent = exports.BackgroundComponent = function () {
  function BackgroundComponent() {
    _classCallCheck(this, BackgroundComponent);

    console.log('Hello BackgroundComponent!');
    this.unsplash = new _unsplashService.UnsplashService();
    this.pageContainer = document.getElementsByTagName("section")[0];
    this.addressContainer = document.getElementsByTagName("address")[0];
    this.downEl = document.getElementById("download");
    this.getBackgroundIMG();
  }

  _createClass(BackgroundComponent, [{
    key: 'getBackgroundIMG',
    value: function getBackgroundIMG() {
      var _this = this;

      var queryService = this.unsplash.getRandomImg();
      queryService.then(function (response) {
        //console.log('res 1 -> ', response)
        _this.displayBackground(JSON.parse(response));
        return response;
      }).then(function (response) {
        _this.displayImgInfo(JSON.parse(response));
      }).catch(function (e) {
        _this.handleErrors(e);
      });
    }
  }, {
    key: 'displayBackground',
    value: function displayBackground(data) {
      var _this2 = this;

      // console.log('service response-> ')
      // console.log( data[0] )
      if (this.pageContainer) {
        // some css with JS for BG
        this.pageContainer.style.color = '#fff';
        this.pageContainer.style.backgroundSize = 'cover';
        // charge img url into a IMG element to detect loading complet
        var img = new Image();
        img.src = data[0].urls.regular;
        this.pageContainer.style.background = 'url(' + data[0].urls.regular + ') center center no-repeat';
        // listen loading img.src to display $pageContainer
        img.addEventListener('load', function (event) {
          console.log('Background img loaded!');
          _this2.fadeIn(_this2.pageContainer);
        });
      }
    }
  }, {
    key: 'displayImgInfo',
    value: function displayImgInfo(data) {
      var _this3 = this;

      //console.log('displayImgInfo-> ',data)
      // add author info
      if (this.addressContainer) {
        this.addressContainer.style.cursor = 'pointer';
        this.addressContainer.style.textDecoration = 'underline';
        this.addressContainer.style.display = 'inline';
        this.addressContainer.innerHTML = '' + data[0].user.name;
        this.addressContainer.addEventListener('click', function (event) {
          return _this3.onGoToLink(event, 'https://unsplash.com/@' + data[0].user.username);
        }, false);
      }
      // add download link for img
      if (this.downEl) {
        this.downEl.addEventListener('click', function (event) {
          return _this3.onGoToLink(event, data[0].links.download);
        }, false);
      }
    }
  }, {
    key: 'onGoToLink',
    value: function onGoToLink(event, url) {
      event.preventDefault();
      var win = window.open(url, '_blank');
      win.focus();
    }
  }, {
    key: 'fadeIn',
    value: function fadeIn(htmlElement) {
      // use add class CSS to add display transition
      htmlElement.classList.add('fadeIn');
    }
  }, {
    key: 'handleErrors',
    value: function handleErrors(error) {
      console.log("XXXXXXX ERROR -> ");
      console.log(error);
      if (this.addressContainer) {
        this.addressContainer.parentElement.innerHTML = '';
      }
      if (this.downEl) {
        this.downEl.innerHTML = '';
      }
      if (document.getElementById('search')) {
        document.getElementById('search').parentElement.innerHTML = '';
      }
      if (document.getElementById('LinksComponent')) {
        document.getElementById('LinksComponent').innerHTML = '';
      }
      if (this.pageContainer) {

        if (document.getElementById('time')) {
          var errorSkeleton = '\n          <div class="chip red lighten-2">\n            <span class="white-text">' + error + '</span>\n          </div>\n        ';
          document.getElementById('time').parentElement.insertAdjacentHTML('afterbegin', errorSkeleton);
        }
        // some css with JS for BG
        this.pageContainer.style.color = '#fff';
        this.pageContainer.style.backgroundSize = 'cover';
        this.fadeIn(this.pageContainer);
      }
    }
  }]);

  return BackgroundComponent;
}();

},{"../../providers/unsplash/unsplash-service":12}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinksComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Author: Nicolas Fazio <webmaster-fazio>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Date:   09-12-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Email:  contact@nicolasfazio.ch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified by:   webmaster-fazio
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified time: 11-12-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _linksService = require('../../providers/links/links-service');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinksComponent = exports.LinksComponent = function () {
  function LinksComponent() {
    _classCallCheck(this, LinksComponent);

    console.log('Hello LinksComponent!');
    this.content = document.getElementById('LinksComponent');
    this.initUI();
    this.loadLinksData();
  }

  _createClass(LinksComponent, [{
    key: 'initUI',
    value: function initUI() {
      if (this.content) {
        var linksSkeleton = '\n        <div class="row">\n          <div class="col s12">\n            <div id="linksData"></div>\n          </div>\n        </div>\n      ';
        this.content.insertAdjacentHTML('afterbegin', linksSkeleton);
      }
    }
  }, {
    key: 'loadLinksData',
    value: function loadLinksData() {
      var _this = this;

      var linksService = new _linksService.LinksService();
      linksService.getData().then(function (response) {
        _this.displayDataLinks(response);
      });
    }
  }, {
    key: 'displayDataLinks',
    value: function displayDataLinks(dataArray) {
      var datas = [].concat(_toConsumableArray(dataArray));
      var dataReady = datas.map(function (link) {
        return '<a href="' + link.url + '" class="btn transparent z-depth-0" target="_blank" title="' + link.altTitle + '">' + link.title + '</a>';
      });
      //console.log(dataReady.join())
      var linksContent = document.getElementById('linksData');
      if (linksContent) {
        linksContent.innerHTML = dataReady.join();
      }
    }
  }]);

  return LinksComponent;
}();

},{"../../providers/links/links-service":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 09-12-2016
*/

var TimerComponent = exports.TimerComponent = function () {
  function TimerComponent() {
    _classCallCheck(this, TimerComponent);

    console.log('Hello Timer components!');
    this.time = new Date();
    this.displayTime();
  }

  _createClass(TimerComponent, [{
    key: 'displayTime',
    value: function displayTime() {
      var _this = this;

      var timeElement = document.getElementById('time');
      if (timeElement) {
        // some css with JS for time txt
        timeElement.innerHTML = this.getTime(this.time);
        timeElement.style.fontSize = '10rem';
        timeElement.style.margin = '0rem';
        // run interval
        setInterval(function () {
          // asigne a new Date()
          _this.time = new Date();
          //console.log(`${this.time.getHours()}:${this.time.getMinutes()}:${this.time.getSeconds()}`)
          // replace innerHTML of time element
          timeElement.innerHTML = _this.getTime(_this.time);
        }, 1000);
      }
    }
  }, {
    key: 'getTime',
    value: function getTime(time) {
      return '\n    <time datetime="' + (time.getFullYear() < 10 ? '0' + time.getFullYear() : time.getFullYear()) + '-' + (time.getMonth() < 10 ? '0' + time.getMonth() : time.getMonth()) + '-' + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + ' ' + (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':' + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()) + '">\n      ' + (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':' + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()) + '\n    </time >\n    ';
    }
  }]);

  return TimerComponent;
}();

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeSkeleton = homeSkeleton;
function homeSkeleton(data) {
  return "\n    <section class=\" valign-wrapper \">\n      <div class=\"valign\">\n        <div class=\" row\">\n\n          <div class=\"col s6 offset-s3\">\n            <h1>" + data.pageTitle + "</h1>\n            <form>\n              <p>\n                <label for=\"email\">Email:</label> <input type=\"email\" name=\"email\" value=\"\" placeholder=\"your@email.com\"  /><br/>\n                <label for=\"password\">Password:</label> <input type=\"password\" name=\"password\" value=\"\"  /><br/>\n                <button>Login</button>\n              </p>\n            </form>\n          </div>\n\n        </div>\n      </div>\n\n    </section>";
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Author: Nicolas Fazio <webmaster-fazio>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Date:   15-09-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Email:  contact@nicolasfazio.ch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified by:   webmaster-fazio
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified time: 11-12-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _homeSkeleton = require('./home-skeleton');

var _user = require('../../pages/user/user');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomePage = exports.HomePage = function () {
  function HomePage(appBody, storageService) {
    _classCallCheck(this, HomePage);

    this.appBody = appBody;
    this.pageTitle = 'Welcome';
    this.storage = storageService;
    this.initUI();
  }

  _createClass(HomePage, [{
    key: 'initUI',
    value: function initUI() {
      // remove all section before display UI
      if (document.getElementsByTagName("section")[0]) {
        document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0]);
      }
      // create page skeleton
      var pageSkeleton = this.getPageSkeleton();
      // add page skeleton in body
      this.appBody.insertAdjacentHTML('afterbegin', pageSkeleton);
      this.loadEventUI();
    }
  }, {
    key: 'getPageSkeleton',
    value: function getPageSkeleton() {
      // return page skeleton
      var data = {}; // create obj to pass data
      data.pageTitle = this.pageTitle; // asigne data
      return (0, _homeSkeleton.homeSkeleton)(data);
    }
  }, {
    key: 'loadEventUI',
    value: function loadEventUI() {
      var _this = this;

      var loginForm = document.getElementsByTagName("form")[0];
      loginForm.addEventListener("submit", function (event) {
        return _this.onLogin(event);
      }, false);
    }
  }, {
    key: 'onLogin',
    value: function onLogin(event) {
      event.preventDefault();
      var validationInput = 0;
      var formInput = {};
      var form = document.forms[0].elements;
      for (var i = 0; i < form.length; i++) {
        if (form[i].value) {
          formInput[form[i].name] = form[i].value;
          validationInput++;
        }
      }
      if (validationInput === 2) {
        // save in StorageService
        this.storage.login(formInput);
        // load UserPage
        console.log('load UserPage');
        new _user.UserPage(this.appBody, this.storage);
      }
    }
  }]);

  return HomePage;
}();

},{"../../pages/user/user":8,"./home-skeleton":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSkeleton = userSkeleton;
function userSkeleton(data) {
  return "\n    <section class=\"valign-wrapper\">\n\n      <nav class=\"row transparent z-depth-0 flow-text\">\n        <div class=\"input-field col s6\">\n          <i id=\"icon-search\" class=\"material-icons prefix\">search</i>\n          <input id=\"search\" type=\"text\" class=\"validate\">\n        </div>\n        <div class=\"col s6 right-align\">\n            <i id=\"download\" class=\"material-icons\">file_download</i>\n        </div>\n      </nav>\n\n      <main class=\"valign center-align\">\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <h1 id=\"time\"></h1>\n            <p class=\"greetings\">" + data.pageTitle + " " + data.userName + "!</p>\n          </div>\n        </div>\n        <div id=\"LinksComponent\"></div>\n      </main>\n\n      <footer>\n        <div class=\"row\">\n          <div class=\"col s6 left-align\">Photo by <address class=\"author\"></address></div>\n          <div class=\"col s6 right-align\">This app using <a href=\"https://unsplash.com\" target=\"_blank\" title=\"Unsplash API\">Unsplash API</a></div>\n        </div>\n      </footer>\n\n    </section>\n  ";
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserPage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Author: Nicolas Fazio <webmaster-fazio>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Date:   15-09-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Email:  contact@nicolasfazio.ch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified by:   webmaster-fazio
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified time: 10-12-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _userSkeleton = require('./user-skeleton');

var _timerComponent = require('../../components/timer/timer-component');

var _linksComponent = require('../../components/links/links-component');

var _backgroundComponent = require('../../components/background/background-component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserPage = exports.UserPage = function () {
  function UserPage(appBody, storageService) {
    _classCallCheck(this, UserPage);

    this.appBody = appBody;
    this.formData = storageService.db[0].user;
    this.time = new Date();
    this.pageTitle = this.grettings();
    this.userName = this.getUserName();
    this.initUI();
    this.loadEventUI();
  }

  _createClass(UserPage, [{
    key: 'initUI',
    value: function initUI() {
      // remove all section before display UI
      if (document.getElementsByTagName("section")[0]) {
        document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0]);
      }
      // create page skeleton
      var pageSkeleton = this.getPageSkeleton();
      // add page skeleton in body
      this.appBody.insertAdjacentHTML('afterbegin', pageSkeleton);
      document.getElementsByTagName("section")[0].classList.add('displayOpacity');
      this.displayTime();
      this.displayLinks();
      this.getBackgroundIMG();
    }
  }, {
    key: 'getPageSkeleton',
    value: function getPageSkeleton() {
      // return page skeleton
      var data = {}; // create obj to pass data
      data.pageTitle = this.pageTitle; // asigne data
      data.userName = this.userName;
      return (0, _userSkeleton.userSkeleton)(data);
    }
  }, {
    key: 'loadEventUI',
    value: function loadEventUI() {
      var _this = this;

      var search = document.getElementById('search');
      if (search) {
        search.addEventListener('keyup', function (event) {
          if (event.key === 'Enter') {
            if (event.target.value.length >= 1) {
              console.log('https://www.google.ch/search?q=' + event.target.value);
              _this.onGoToLink(event, 'https://www.google.ch/search?q=' + event.target.value);
              // clean input value after go search
              event.target.value = '';
              // unfocus input element after go search
              event.target.blur();
            }
          }
        });
      }
      var iconSearch = document.getElementById('icon-search');
      if (iconSearch) {
        iconSearch.addEventListener('click', function (event) {
          if (search) {
            search.focus();
          }
        });
      }
    }
  }, {
    key: 'displayTime',
    value: function displayTime() {
      new _timerComponent.TimerComponent();
    }
  }, {
    key: 'displayLinks',
    value: function displayLinks() {
      new _linksComponent.LinksComponent();
    }
  }, {
    key: 'getBackgroundIMG',
    value: function getBackgroundIMG() {
      new _backgroundComponent.BackgroundComponent();
    }
  }, {
    key: 'onGoToLink',
    value: function onGoToLink(event, url) {
      event.preventDefault();
      var win = window.open(url, '_blank');
      win.focus();
    }
  }, {
    key: 'grettings',
    value: function grettings() {
      var grettings = void 0;
      switch (true) {
        case this.time.getHours() > 5 && this.time.getHours() <= 10:
          grettings = 'Good morning';
          break;
        case this.time.getHours() >= 11 && this.time.getHours() <= 17:
          grettings = 'Hello';
          break;
        default:
          grettings = 'Good evening';
      }
      return grettings;
    }
  }, {
    key: 'getUserName',
    value: function getUserName() {
      // return usernal with first letter Cappitalized
      return this.formData.email.split("@")[0].split(' ').map(function (c) {
        return c.slice(0, 1).toUpperCase() + c.slice(1);
      }).join(' ');
    }
  }]);

  return UserPage;
}();

},{"../../components/background/background-component":2,"../../components/links/links-component":3,"../../components/timer/timer-component":4,"./user-skeleton":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   11-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 11-12-2016
*/

var LinksService = exports.LinksService = function () {
  function LinksService() {
    _classCallCheck(this, LinksService);

    console.log('Hello LinksService!');
    this.arrayData = [{
      'title': 'Github',
      'url': 'https://github.com/fazionico',
      'altTitle': 'Follow Nicolas Fazio on Github'
    }, {
      'title': 'Web site',
      'url': 'http://nicolasfazio.ch/',
      'altTitle': 'Nicolas Fazio, Hybrid Mobile & Web developper'
    }, {
      'title': 'Twitter',
      'url': 'https://twitter.com/fazionico',
      'altTitle': 'Follow Nicolas Fazio on Twitter'
    }];
  }

  _createClass(LinksService, [{
    key: 'getData',
    value: function getData() {
      var _this = this;

      //Return a new promise.
      return new Promise(function (resolve) {
        /*
         TODO:
              REMOVE $this.arrayData
                AND replace $this.arrayData by a XMLHttpRequest to your own database REST API
                OR replace $this.arrayData by your Firbase Provider
              OR simply change $this.arrayData key and value.
              THEN retur the response as a Promise
        */

        // DEFAULT: Simply return $this.arrayData as a Promise
        resolve(_this.arrayData);
      });
    }
  }]);

  return LinksService;
}();

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   08-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 09-12-2016
*/

var StorageService = exports.StorageService = function () {
  function StorageService() {
    _classCallCheck(this, StorageService);

    this.dbName = 'browser-dev';
    this.db = [];
  }

  _createClass(StorageService, [{
    key: 'loadData',
    value: function loadData() {
      var db = this.read();
      if (db) {
        this.db.push(db);
      } else {
        this.create();
        this.db.push({});
      }
      console.log('StorageService: database ready ->', this.db);
    }
  }, {
    key: 'isAuth',
    value: function isAuth() {
      if (this.db[0].user) {
        return this.db[0];
      }
    }
  }, {
    key: 'login',
    value: function login(userData) {
      console.log('StorageService: login->', userData);
      var isAuth = this.isAuth();
      if (!isAuth) {
        this.db[0].user = userData;
        this.update();
      }
    }

    /* Methodes CRUD Query */

  }, {
    key: 'create',
    value: function create() {
      console.log('StorageService: create->', this.dbName);
      localStorage.setItem(this.dbName, JSON.stringify({}));
    }
  }, {
    key: 'read',
    value: function read() {
      console.log('StorageService: read->', this.dbName);
      var query = localStorage.getItem(this.dbName);
      //console.log(query)
      if (query) {
        return JSON.parse(query);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      console.log('StorageService: update->', this.db[0]);
      localStorage.setItem(this.dbName, JSON.stringify(this.db[0]));
    }
  }, {
    key: 'delete',
    value: function _delete(item) {}
  }]);

  return StorageService;
}();

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var API_KEY_CONFIG = exports.API_KEY_CONFIG = {
  'client_id': "8560f3274856a42259232fa219050bc7edc3d7025514987a4b3b0becc17ba029",
  'client_secret': "4674868e0865fcf7a2b63e1570d98f6e7470d8cd2cad3c4d7f8573c82702436d"
};

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnsplashService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Author: Nicolas Fazio <webmaster-fazio>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Date:   07-12-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Email:  contact@nicolasfazio.ch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified by:   webmaster-fazio
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @Last modified time: 11-12-2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _apiKeyConfig = require('../../providers/unsplash/apiKey-config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UnsplashService = exports.UnsplashService = function () {
  function UnsplashService() {
    _classCallCheck(this, UnsplashService);

    this.data = [];
    this.params = _apiKeyConfig.API_KEY_CONFIG;
    this.queryUrl = 'https://api.unsplash.com/photos/random?count=1&client_id=';
    console.log('hello UnsplashService!');
  }

  _createClass(UnsplashService, [{
    key: 'getRandomImg',
    value: function getRandomImg() {
      var _this = this;

      //Return a new promise.
      return new Promise(function (resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', _this.queryUrl + _this.params.client_id);
        req.onload = function () {
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            resolve(req.responseText);
          } else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
          }
        };
        // Handle network errors
        req.onerror = function () {
          reject(Error("Network Error"));
        };
        // Make the request
        req.send();
      });
    }
  }]);

  return UnsplashService;
}();

},{"../../providers/unsplash/apiKey-config":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYXBwL2FwcC5qcyIsImRldi9hcHAvY29tcG9uZW50cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQtY29tcG9uZW50LmpzIiwiZGV2L2FwcC9jb21wb25lbnRzL2xpbmtzL2xpbmtzLWNvbXBvbmVudC5qcyIsImRldi9hcHAvY29tcG9uZW50cy90aW1lci90aW1lci1jb21wb25lbnQuanMiLCJkZXYvYXBwL3BhZ2VzL2hvbWUvaG9tZS1za2VsZXRvbi5qcyIsImRldi9hcHAvcGFnZXMvaG9tZS9ob21lLmpzIiwiZGV2L2FwcC9wYWdlcy91c2VyL3VzZXItc2tlbGV0b24uanMiLCJkZXYvYXBwL3BhZ2VzL3VzZXIvdXNlci5qcyIsImRldi9hcHAvcHJvdmlkZXJzL2xpbmtzL2xpbmtzLXNlcnZpY2UuanMiLCJkZXYvYXBwL3Byb3ZpZGVycy9zdG9yYWdlL3N0b3JhZ2Utc2VydmljZS5qcyIsImRldi9hcHAvcHJvdmlkZXJzL3Vuc3BsYXNoL2FwaUtleS1jb25maWcuanMiLCJkZXYvYXBwL3Byb3ZpZGVycy91bnNwbGFzaC91bnNwbGFzaC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7cWpCQ0FBOzs7Ozs7OztBQVFBOztBQUNBOztBQUNBOzs7O0lBRU0sSztBQUVKLG1CQUFhO0FBQUE7O0FBQ1gsU0FBSyxPQUFMLEdBQWUsU0FBUyxvQkFBVCxDQUE4QixLQUE5QixFQUFxQyxDQUFyQyxDQUFmO0FBQ0EsU0FBSyxPQUFMLEdBQWUsb0NBQWY7QUFDQSxTQUFLLE9BQUwsQ0FBYSxRQUFiO0FBQ0Q7Ozs7NEJBRU07QUFDTCxVQUFHLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBSCxFQUF5QjtBQUN2QixnQkFBUSxHQUFSLENBQVksaUJBQVosRUFBOEIsS0FBSyxPQUFMLENBQWEsRUFBYixDQUFnQixDQUFoQixFQUFtQixJQUFqRDtBQUNBLDJCQUFhLEtBQUssT0FB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QWEsa0VBRGU7QUFFNUIsbUJBQWlCO0FBRlcsQ0FBdkI7Ozs7Ozs7Ozs7cWpCQ0FQOzs7Ozs7OztBQVFBOzs7O0lBRWEsZSxXQUFBLGU7QUFFWCw2QkFBYTtBQUFBOztBQUNYLFNBQUssSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLLE1BQUw7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsMkRBQWhCO0FBQ0EsWUFBUSxHQUFSLENBQVksd0JBQVo7QUFDRDs7OzttQ0FFYTtBQUFBOztBQUNWO0FBQ0EsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQW9CO0FBQ3JDO0FBQ0EsWUFBSSxNQUFNLElBQUksY0FBSixFQUFWO0FBQ0EsWUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixNQUFLLFFBQUwsR0FBYyxNQUFLLE1BQUwsQ0FBWSxTQUExQztBQUNBLFlBQUksTUFBSixHQUFhLFlBQUs7QUFDaEI7QUFDQTtBQUNBLGNBQUksSUFBSSxNQUFKLElBQWMsR0FBbEIsRUFBdUI7QUFDckI7QUFDQSxvQkFBUSxJQUFJLFlBQVo7QUFDRCxXQUhELE1BSUs7QUFDSDtBQUNBO0FBQ0EsbUJBQU8sTUFBTSxJQUFJLFVBQVYsQ0FBUDtBQUNEO0FBQ0YsU0FaRDtBQWFBO0FBQ0EsWUFBSSxPQUFKLEdBQWMsWUFBSztBQUNqQixpQkFBTyxNQUFNLGVBQU4sQ0FBUDtBQUNELFNBRkQ7QUFHQTtBQUNBLFlBQUksSUFBSjtBQUNELE9BdkJNLENBQVA7QUF3QkgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4qIEBBdXRob3I6IE5pY29sYXMgRmF6aW8gPHdlYm1hc3Rlci1mYXppbz5cbiogQERhdGU6ICAgMDEtMDktMjAxNlxuKiBARW1haWw6ICBjb250YWN0QG5pY29sYXNmYXppby5jaFxuKiBATGFzdCBtb2RpZmllZCBieTogICB3ZWJtYXN0ZXItZmF6aW9cbiogQExhc3QgbW9kaWZpZWQgdGltZTogMDktMTItMjAxNlxuKi9cblxuaW1wb3J0IHsgSG9tZVBhZ2UgfSBmcm9tICcuL3BhZ2VzL2hvbWUvaG9tZSc7XG5pbXBvcnQgeyBVc2VyUGFnZSB9IGZyb20gJy4vcGFnZXMvdXNlci91c2VyJztcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvc3RvcmFnZS9zdG9yYWdlLXNlcnZpY2UnO1xuXG5jbGFzcyBNeUFwcCB7XG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLmFwcEJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFwcFwiKVswXTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZVNlcnZpY2UoKTtcbiAgICB0aGlzLnN0b3JhZ2UubG9hZERhdGEoKVxuICB9XG5cbiAgc3RhcnQoKXtcbiAgICBpZih0aGlzLnN0b3JhZ2UuaXNBdXRoKCkpe1xuICAgICAgY29uc29sZS5sb2coJ3VzZXIgaXMgYXV0aC0+ICcsdGhpcy5zdG9yYWdlLmRiWzBdLnVzZXIpXG4gICAgICBuZXcgVXNlclBhZ2UodGhpcy5hcHBCb2R5LHRoaXMuc3RvcmFnZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygndXNlciBpcyBub3QgYXV0aC0+ICcsdGhpcy5zdG9yYWdlLmRiWzBdKVxuICAgICAgLy8gaW5pdCBIb21lUGFnZVxuICAgICAgbGV0IGhvbWVQYWdlID0gbmV3IEhvbWVQYWdlKHRoaXMuYXBwQm9keSwgdGhpcy5zdG9yYWdlKTtcbiAgICB9XG4gIH1cblxufVxuXG5sZXQgbXlBcHAgPSBuZXcgTXlBcHAoKTtcbm15QXBwLnN0YXJ0KCk7XG4iLCIvKipcbiogQEF1dGhvcjogTmljb2xhcyBGYXppbyA8d2VibWFzdGVyLWZhemlvPlxuKiBARGF0ZTogICAxMC0xMi0yMDE2XG4qIEBFbWFpbDogIGNvbnRhY3RAbmljb2xhc2ZhemlvLmNoXG4qIEBMYXN0IG1vZGlmaWVkIGJ5OiAgIHdlYm1hc3Rlci1mYXppb1xuKiBATGFzdCBtb2RpZmllZCB0aW1lOiAxMS0xMi0yMDE2XG4qL1xuXG5pbXBvcnQgIHsgVW5zcGxhc2hTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Vuc3BsYXNoL3Vuc3BsYXNoLXNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICBjb25zb2xlLmxvZygnSGVsbG8gQmFja2dyb3VuZENvbXBvbmVudCEnKVxuICAgIHRoaXMudW5zcGxhc2ggPSBuZXcgVW5zcGxhc2hTZXJ2aWNlKCk7XG4gICAgdGhpcy5wYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzZWN0aW9uXCIpWzBdXG4gICAgdGhpcy5hZGRyZXNzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhZGRyZXNzXCIpWzBdXG4gICAgdGhpcy5kb3duRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvd25sb2FkXCIpXG4gICAgdGhpcy5nZXRCYWNrZ3JvdW5kSU1HKClcbiAgfVxuXG4gIGdldEJhY2tncm91bmRJTUcoKXtcbiAgICBsZXQgcXVlcnlTZXJ2aWNlID0gdGhpcy51bnNwbGFzaC5nZXRSYW5kb21JbWcoKVxuICAgIHF1ZXJ5U2VydmljZS50aGVuKChyZXNwb25zZSk9PntcbiAgICAgIC8vY29uc29sZS5sb2coJ3JlcyAxIC0+ICcsIHJlc3BvbnNlKVxuICAgICAgIHRoaXMuZGlzcGxheUJhY2tncm91bmQoSlNPTi5wYXJzZShyZXNwb25zZSkpXG4gICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgIH0pXG4gICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgICB0aGlzLmRpc3BsYXlJbWdJbmZvKEpTT04ucGFyc2UocmVzcG9uc2UpKTtcbiAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSk9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcnMoZSlcbiAgICAgIH0pO1xuICB9XG5cbiAgZGlzcGxheUJhY2tncm91bmQoZGF0YSl7XG4gICAgLy8gY29uc29sZS5sb2coJ3NlcnZpY2UgcmVzcG9uc2UtPiAnKVxuICAgIC8vIGNvbnNvbGUubG9nKCBkYXRhWzBdIClcbiAgICBpZih0aGlzLnBhZ2VDb250YWluZXIpe1xuICAgICAgLy8gc29tZSBjc3Mgd2l0aCBKUyBmb3IgQkdcbiAgICAgIHRoaXMucGFnZUNvbnRhaW5lci5zdHlsZS5jb2xvciA9IGAjZmZmYDtcbiAgICAgIHRoaXMucGFnZUNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IGBjb3ZlcmA7XG4gICAgICAvLyBjaGFyZ2UgaW1nIHVybCBpbnRvIGEgSU1HIGVsZW1lbnQgdG8gZGV0ZWN0IGxvYWRpbmcgY29tcGxldFxuICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLnNyYyA9IGRhdGFbMF0udXJscy5yZWd1bGFyXG4gICAgICB0aGlzLnBhZ2VDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZCA9IGB1cmwoJHtkYXRhWzBdLnVybHMucmVndWxhcn0pIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0YDtcbiAgICAgIC8vIGxpc3RlbiBsb2FkaW5nIGltZy5zcmMgdG8gZGlzcGxheSAkcGFnZUNvbnRhaW5lclxuICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdCYWNrZ3JvdW5kIGltZyBsb2FkZWQhJylcbiAgICAgICAgdGhpcy5mYWRlSW4odGhpcy5wYWdlQ29udGFpbmVyKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5SW1nSW5mbyhkYXRhKXtcbiAgICAvL2NvbnNvbGUubG9nKCdkaXNwbGF5SW1nSW5mby0+ICcsZGF0YSlcbiAgICAvLyBhZGQgYXV0aG9yIGluZm9cbiAgICBpZih0aGlzLmFkZHJlc3NDb250YWluZXIpe1xuICAgICAgdGhpcy5hZGRyZXNzQ29udGFpbmVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgIHRoaXMuYWRkcmVzc0NvbnRhaW5lci5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICd1bmRlcmxpbmUnO1xuICAgICAgdGhpcy5hZGRyZXNzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICAgIHRoaXMuYWRkcmVzc0NvbnRhaW5lci5pbm5lckhUTUwgPSBgJHtkYXRhWzBdLnVzZXIubmFtZX1gXG4gICAgICB0aGlzLmFkZHJlc3NDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PlxuICAgICAgICB0aGlzLm9uR29Ub0xpbmsoZXZlbnQsIGBodHRwczovL3Vuc3BsYXNoLmNvbS9AJHtkYXRhWzBdLnVzZXIudXNlcm5hbWV9YCksIGZhbHNlXG4gICAgICApXG4gICAgfVxuICAgIC8vIGFkZCBkb3dubG9hZCBsaW5rIGZvciBpbWdcbiAgICBpZih0aGlzLmRvd25FbCl7XG4gICAgICB0aGlzLmRvd25FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+XG4gICAgICAgIHRoaXMub25Hb1RvTGluayhldmVudCwgZGF0YVswXS5saW5rcy5kb3dubG9hZCksIGZhbHNlXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICBvbkdvVG9MaW5rKGV2ZW50LHVybCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgd2luID0gd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG4gICAgd2luLmZvY3VzKCk7XG4gIH1cblxuICBmYWRlSW4oaHRtbEVsZW1lbnQpe1xuICAgIC8vIHVzZSBhZGQgY2xhc3MgQ1NTIHRvIGFkZCBkaXNwbGF5IHRyYW5zaXRpb25cbiAgICBodG1sRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmYWRlSW4nKVxuICB9XG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yKXtcbiAgICBjb25zb2xlLmxvZyhcIlhYWFhYWFggRVJST1IgLT4gXCIpO1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICBpZih0aGlzLmFkZHJlc3NDb250YWluZXIpe1xuICAgICAgdGhpcy5hZGRyZXNzQ29udGFpbmVyLnBhcmVudEVsZW1lbnQuaW5uZXJIVE1MID0gJydcbiAgICB9XG4gICAgaWYodGhpcy5kb3duRWwpe1xuICAgICAgdGhpcy5kb3duRWwuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKSl7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJykucGFyZW50RWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0xpbmtzQ29tcG9uZW50Jykpe1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0xpbmtzQ29tcG9uZW50JykuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICAgIGlmKHRoaXMucGFnZUNvbnRhaW5lcil7XG5cbiAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJykpe1xuICAgICAgICBsZXQgZXJyb3JTa2VsZXRvbiA9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpcCByZWQgbGlnaHRlbi0yXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIndoaXRlLXRleHRcIj4ke2Vycm9yfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWUnKS5wYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCggJ2FmdGVyYmVnaW4nLCBlcnJvclNrZWxldG9uIClcbiAgICAgIH1cbiAgICAgIC8vIHNvbWUgY3NzIHdpdGggSlMgZm9yIEJHXG4gICAgICB0aGlzLnBhZ2VDb250YWluZXIuc3R5bGUuY29sb3IgPSBgI2ZmZmA7XG4gICAgICB0aGlzLnBhZ2VDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZFNpemUgPSBgY292ZXJgO1xuICAgICAgdGhpcy5mYWRlSW4odGhpcy5wYWdlQ29udGFpbmVyKVxuICAgIH1cblxuICB9XG59XG4iLCIvKipcbiogQEF1dGhvcjogTmljb2xhcyBGYXppbyA8d2VibWFzdGVyLWZhemlvPlxuKiBARGF0ZTogICAwOS0xMi0yMDE2XG4qIEBFbWFpbDogIGNvbnRhY3RAbmljb2xhc2ZhemlvLmNoXG4qIEBMYXN0IG1vZGlmaWVkIGJ5OiAgIHdlYm1hc3Rlci1mYXppb1xuKiBATGFzdCBtb2RpZmllZCB0aW1lOiAxMS0xMi0yMDE2XG4qL1xuXG5pbXBvcnQgIHsgTGlua3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2xpbmtzL2xpbmtzLXNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgTGlua3NDb21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICBjb25zb2xlLmxvZygnSGVsbG8gTGlua3NDb21wb25lbnQhJylcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTGlua3NDb21wb25lbnQnKVxuICAgIHRoaXMuaW5pdFVJKClcbiAgICB0aGlzLmxvYWRMaW5rc0RhdGEoKVxuICB9XG5cbiAgaW5pdFVJKCl7XG4gICAgaWYodGhpcy5jb250ZW50KXtcbiAgICAgIGxldCBsaW5rc1NrZWxldG9uID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCBzMTJcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJsaW5rc0RhdGFcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgO1xuICAgICAgdGhpcy5jb250ZW50Lmluc2VydEFkamFjZW50SFRNTCggJ2FmdGVyYmVnaW4nLCBsaW5rc1NrZWxldG9uIClcbiAgICB9XG4gIH1cblxuICBsb2FkTGlua3NEYXRhKCl7XG4gICAgbGV0IGxpbmtzU2VydmljZSA9IG5ldyBMaW5rc1NlcnZpY2UoKVxuICAgIGxpbmtzU2VydmljZS5nZXREYXRhKCkudGhlbigocmVzcG9uc2UpPT57XG4gICAgICB0aGlzLmRpc3BsYXlEYXRhTGlua3MocmVzcG9uc2UpXG4gICAgfSlcbiAgfVxuXG4gIGRpc3BsYXlEYXRhTGlua3MoZGF0YUFycmF5KXtcbiAgICBsZXQgZGF0YXMgPSBbLi4uZGF0YUFycmF5XVxuICAgIGxldCBkYXRhUmVhZHkgPSBkYXRhcy5tYXAoKGxpbmspPT57XG4gICAgICByZXR1cm4gYDxhIGhyZWY9XCIke2xpbmsudXJsfVwiIGNsYXNzPVwiYnRuIHRyYW5zcGFyZW50IHotZGVwdGgtMFwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiJHtsaW5rLmFsdFRpdGxlfVwiPiR7bGluay50aXRsZX08L2E+YFxuICAgIH0pXG4gICAgLy9jb25zb2xlLmxvZyhkYXRhUmVhZHkuam9pbigpKVxuICAgIGxldCBsaW5rc0NvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlua3NEYXRhJylcbiAgICBpZihsaW5rc0NvbnRlbnQpe1xuICAgICAgbGlua3NDb250ZW50LmlubmVySFRNTCA9IGRhdGFSZWFkeS5qb2luKClcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuKiBAQXV0aG9yOiBOaWNvbGFzIEZhemlvIDx3ZWJtYXN0ZXItZmF6aW8+XG4qIEBEYXRlOiAgIDA5LTEyLTIwMTZcbiogQEVtYWlsOiAgY29udGFjdEBuaWNvbGFzZmF6aW8uY2hcbiogQExhc3QgbW9kaWZpZWQgYnk6ICAgd2VibWFzdGVyLWZhemlvXG4qIEBMYXN0IG1vZGlmaWVkIHRpbWU6IDA5LTEyLTIwMTZcbiovXG5cbmV4cG9ydCBjbGFzcyBUaW1lckNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICBjb25zb2xlLmxvZygnSGVsbG8gVGltZXIgY29tcG9uZW50cyEnKVxuICAgIHRoaXMudGltZSA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5kaXNwbGF5VGltZSgpXG4gIH1cblxuICBkaXNwbGF5VGltZSgpe1xuICAgIGxldCB0aW1lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJylcbiAgICBpZih0aW1lRWxlbWVudCl7XG4gICAgICAvLyBzb21lIGNzcyB3aXRoIEpTIGZvciB0aW1lIHR4dFxuICAgICAgdGltZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5nZXRUaW1lKHRoaXMudGltZSlcbiAgICAgIHRpbWVFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gJzEwcmVtJztcbiAgICAgIHRpbWVFbGVtZW50LnN0eWxlLm1hcmdpbiA9ICcwcmVtJztcbiAgICAgIC8vIHJ1biBpbnRlcnZhbFxuICAgICAgc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgLy8gYXNpZ25lIGEgbmV3IERhdGUoKVxuICAgICAgICB0aGlzLnRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGAke3RoaXMudGltZS5nZXRIb3VycygpfToke3RoaXMudGltZS5nZXRNaW51dGVzKCl9OiR7dGhpcy50aW1lLmdldFNlY29uZHMoKX1gKVxuICAgICAgICAvLyByZXBsYWNlIGlubmVySFRNTCBvZiB0aW1lIGVsZW1lbnRcbiAgICAgICAgdGltZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5nZXRUaW1lKHRoaXMudGltZSlcbiAgICAgIH0sMTAwMClcbiAgICB9XG4gIH1cblxuICBnZXRUaW1lKHRpbWUpe1xuICAgIHJldHVybiAgICBgXG4gICAgPHRpbWUgZGF0ZXRpbWU9XCIkeyh0aW1lLmdldEZ1bGxZZWFyKCkgPCAxMCk/JzAnK3RpbWUuZ2V0RnVsbFllYXIoKTp0aW1lLmdldEZ1bGxZZWFyKCl9LSR7KHRpbWUuZ2V0TW9udGgoKSA8IDEwKT8nMCcrdGltZS5nZXRNb250aCgpOnRpbWUuZ2V0TW9udGgoKX0tJHsodGltZS5nZXREYXRlKCkgPCAxMCk/JzAnK3RpbWUuZ2V0RGF0ZSgpOnRpbWUuZ2V0RGF0ZSgpfSAkeyh0aW1lLmdldEhvdXJzKCkgPCAxMCk/JzAnK3RpbWUuZ2V0SG91cnMoKTp0aW1lLmdldEhvdXJzKCl9OiR7KHRpbWUuZ2V0TWludXRlcygpIDwgMTApPycwJyt0aW1lLmdldE1pbnV0ZXMoKTp0aW1lLmdldE1pbnV0ZXMoKX06JHsodGltZS5nZXRTZWNvbmRzKCkgPCAxMCk/JzAnK3RpbWUuZ2V0U2Vjb25kcygpOnRpbWUuZ2V0U2Vjb25kcygpfVwiPlxuICAgICAgJHsodGltZS5nZXRIb3VycygpIDwgMTApPycwJyt0aW1lLmdldEhvdXJzKCk6dGltZS5nZXRIb3VycygpfTokeyh0aW1lLmdldE1pbnV0ZXMoKSA8IDEwKT8nMCcrdGltZS5nZXRNaW51dGVzKCk6dGltZS5nZXRNaW51dGVzKCl9OiR7KHRpbWUuZ2V0U2Vjb25kcygpIDwgMTApPycwJyt0aW1lLmdldFNlY29uZHMoKTp0aW1lLmdldFNlY29uZHMoKX1cbiAgICA8L3RpbWUgPlxuICAgIGA7XG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBob21lU2tlbGV0b24oZGF0YSl7XG4gIHJldHVybiBgXG4gICAgPHNlY3Rpb24gY2xhc3M9XCIgdmFsaWduLXdyYXBwZXIgXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidmFsaWduXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIgcm93XCI+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHM2IG9mZnNldC1zM1wiPlxuICAgICAgICAgICAgPGgxPiR7ZGF0YS5wYWdlVGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbDo8L2xhYmVsPiA8aW5wdXQgdHlwZT1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cInlvdXJAZW1haWwuY29tXCIgIC8+PGJyLz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDo8L2xhYmVsPiA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgdmFsdWU9XCJcIiAgLz48YnIvPlxuICAgICAgICAgICAgICAgIDxidXR0b24+TG9naW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICA8L3NlY3Rpb24+YDtcbn1cbiIsIi8qKlxuKiBAQXV0aG9yOiBOaWNvbGFzIEZhemlvIDx3ZWJtYXN0ZXItZmF6aW8+XG4qIEBEYXRlOiAgIDE1LTA5LTIwMTZcbiogQEVtYWlsOiAgY29udGFjdEBuaWNvbGFzZmF6aW8uY2hcbiogQExhc3QgbW9kaWZpZWQgYnk6ICAgd2VibWFzdGVyLWZhemlvXG4qIEBMYXN0IG1vZGlmaWVkIHRpbWU6IDExLTEyLTIwMTZcbiovXG5cbmltcG9ydCB7IGhvbWVTa2VsZXRvbiB9IGZyb20gJy4vaG9tZS1za2VsZXRvbic7XG5pbXBvcnQgeyBVc2VyUGFnZSB9IGZyb20gJy4uLy4uL3BhZ2VzL3VzZXIvdXNlcic7XG5cbmV4cG9ydCBjbGFzcyBIb21lUGFnZSB7XG5cbiAgY29uc3RydWN0b3IoYXBwQm9keSxzdG9yYWdlU2VydmljZSl7XG4gICAgdGhpcy5hcHBCb2R5ID0gYXBwQm9keVxuICAgIHRoaXMucGFnZVRpdGxlID0gJ1dlbGNvbWUnO1xuICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2VTZXJ2aWNlXG4gICAgdGhpcy5pbml0VUkoKTtcbiAgfVxuXG4gIGluaXRVSSgpe1xuICAgIC8vIHJlbW92ZSBhbGwgc2VjdGlvbiBiZWZvcmUgZGlzcGxheSBVSVxuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2VjdGlvblwiKVswXSl7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNlY3Rpb25cIilbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNlY3Rpb25cIilbMF0pXG4gICAgfVxuICAgIC8vIGNyZWF0ZSBwYWdlIHNrZWxldG9uXG4gICAgbGV0IHBhZ2VTa2VsZXRvbiA9IHRoaXMuZ2V0UGFnZVNrZWxldG9uKCk7XG4gICAgLy8gYWRkIHBhZ2Ugc2tlbGV0b24gaW4gYm9keVxuICAgIHRoaXMuYXBwQm9keS5pbnNlcnRBZGphY2VudEhUTUwoICdhZnRlcmJlZ2luJywgcGFnZVNrZWxldG9uIClcbiAgICB0aGlzLmxvYWRFdmVudFVJKClcblxuICB9XG5cbiAgZ2V0UGFnZVNrZWxldG9uKCl7XG4gICAgLy8gcmV0dXJuIHBhZ2Ugc2tlbGV0b25cbiAgICBsZXQgZGF0YSA9IHt9OyAvLyBjcmVhdGUgb2JqIHRvIHBhc3MgZGF0YVxuICAgIGRhdGEucGFnZVRpdGxlID0gdGhpcy5wYWdlVGl0bGUgLy8gYXNpZ25lIGRhdGFcbiAgICByZXR1cm4gIGhvbWVTa2VsZXRvbihkYXRhKTtcbiAgfVxuXG4gIGxvYWRFdmVudFVJKCl7XG4gICAgbGV0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZm9ybVwiKVswXTtcbiAgICBsb2dpbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAgZXZlbnQgPT4gdGhpcy5vbkxvZ2luKGV2ZW50KSwgZmFsc2UpXG4gIH1cblxuICBvbkxvZ2luKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbGV0IHZhbGlkYXRpb25JbnB1dCA9IDBcbiAgICBsZXQgZm9ybUlucHV0ID0ge31cbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmZvcm1zWzBdLmVsZW1lbnRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihmb3JtW2ldLnZhbHVlKXtcbiAgICAgICAgZm9ybUlucHV0W2Zvcm1baV0ubmFtZV0gPSBmb3JtW2ldLnZhbHVlXG4gICAgICAgIHZhbGlkYXRpb25JbnB1dCsrXG4gICAgICB9XG4gICAgfVxuICAgIGlmKHZhbGlkYXRpb25JbnB1dCA9PT0gMil7XG4gICAgICAvLyBzYXZlIGluIFN0b3JhZ2VTZXJ2aWNlXG4gICAgICB0aGlzLnN0b3JhZ2UubG9naW4oZm9ybUlucHV0KVxuICAgICAgLy8gbG9hZCBVc2VyUGFnZVxuICAgICAgY29uc29sZS5sb2coJ2xvYWQgVXNlclBhZ2UnKVxuICAgICAgbmV3IFVzZXJQYWdlKHRoaXMuYXBwQm9keSwgdGhpcy5zdG9yYWdlKTtcbiAgICB9XG4gIH1cblxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHVzZXJTa2VsZXRvbihkYXRhKXtcbiAgcmV0dXJuIGBcbiAgICA8c2VjdGlvbiBjbGFzcz1cInZhbGlnbi13cmFwcGVyXCI+XG5cbiAgICAgIDxuYXYgY2xhc3M9XCJyb3cgdHJhbnNwYXJlbnQgei1kZXB0aC0wIGZsb3ctdGV4dFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM2XCI+XG4gICAgICAgICAgPGkgaWQ9XCJpY29uLXNlYXJjaFwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcHJlZml4XCI+c2VhcmNoPC9pPlxuICAgICAgICAgIDxpbnB1dCBpZD1cInNlYXJjaFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbCBzNiByaWdodC1hbGlnblwiPlxuICAgICAgICAgICAgPGkgaWQ9XCJkb3dubG9hZFwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5maWxlX2Rvd25sb2FkPC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmF2PlxuXG4gICAgICA8bWFpbiBjbGFzcz1cInZhbGlnbiBjZW50ZXItYWxpZ25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczEyXCI+XG4gICAgICAgICAgICA8aDEgaWQ9XCJ0aW1lXCI+PC9oMT5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZ3JlZXRpbmdzXCI+JHtkYXRhLnBhZ2VUaXRsZX0gJHtkYXRhLnVzZXJOYW1lfSE8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwiTGlua3NDb21wb25lbnRcIj48L2Rpdj5cbiAgICAgIDwvbWFpbj5cblxuICAgICAgPGZvb3Rlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczYgbGVmdC1hbGlnblwiPlBob3RvIGJ5IDxhZGRyZXNzIGNsYXNzPVwiYXV0aG9yXCI+PC9hZGRyZXNzPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczYgcmlnaHQtYWxpZ25cIj5UaGlzIGFwcCB1c2luZyA8YSBocmVmPVwiaHR0cHM6Ly91bnNwbGFzaC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIiB0aXRsZT1cIlVuc3BsYXNoIEFQSVwiPlVuc3BsYXNoIEFQSTwvYT48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvb3Rlcj5cblxuICAgIDwvc2VjdGlvbj5cbiAgYDtcbn1cbiIsIi8qKlxuKiBAQXV0aG9yOiBOaWNvbGFzIEZhemlvIDx3ZWJtYXN0ZXItZmF6aW8+XG4qIEBEYXRlOiAgIDE1LTA5LTIwMTZcbiogQEVtYWlsOiAgY29udGFjdEBuaWNvbGFzZmF6aW8uY2hcbiogQExhc3QgbW9kaWZpZWQgYnk6ICAgd2VibWFzdGVyLWZhemlvXG4qIEBMYXN0IG1vZGlmaWVkIHRpbWU6IDEwLTEyLTIwMTZcbiovXG5cbmltcG9ydCAgeyB1c2VyU2tlbGV0b24gfSBmcm9tICcuL3VzZXItc2tlbGV0b24nO1xuaW1wb3J0ICB7IFRpbWVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy90aW1lci90aW1lci1jb21wb25lbnQnXG5pbXBvcnQgIHsgTGlua3NDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xpbmtzL2xpbmtzLWNvbXBvbmVudCdcbmltcG9ydCAgeyBCYWNrZ3JvdW5kQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQtY29tcG9uZW50J1xuXG5leHBvcnQgY2xhc3MgVXNlclBhZ2Uge1xuXG4gIGNvbnN0cnVjdG9yKGFwcEJvZHksIHN0b3JhZ2VTZXJ2aWNlKXtcbiAgICB0aGlzLmFwcEJvZHkgPSBhcHBCb2R5XG4gICAgdGhpcy5mb3JtRGF0YSA9IHN0b3JhZ2VTZXJ2aWNlLmRiWzBdLnVzZXJcbiAgICB0aGlzLnRpbWUgPSBuZXcgRGF0ZSgpXG4gICAgdGhpcy5wYWdlVGl0bGUgPSB0aGlzLmdyZXR0aW5ncygpO1xuICAgIHRoaXMudXNlck5hbWUgPSB0aGlzLmdldFVzZXJOYW1lKCk7XG4gICAgdGhpcy5pbml0VUkoKTtcbiAgICB0aGlzLmxvYWRFdmVudFVJKClcbiAgfVxuXG4gIGluaXRVSSgpe1xuICAgIC8vIHJlbW92ZSBhbGwgc2VjdGlvbiBiZWZvcmUgZGlzcGxheSBVSVxuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2VjdGlvblwiKVswXSl7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNlY3Rpb25cIilbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNlY3Rpb25cIilbMF0pXG4gICAgfVxuICAgIC8vIGNyZWF0ZSBwYWdlIHNrZWxldG9uXG4gICAgbGV0IHBhZ2VTa2VsZXRvbiA9IHRoaXMuZ2V0UGFnZVNrZWxldG9uKCk7XG4gICAgLy8gYWRkIHBhZ2Ugc2tlbGV0b24gaW4gYm9keVxuICAgIHRoaXMuYXBwQm9keS5pbnNlcnRBZGphY2VudEhUTUwoICdhZnRlcmJlZ2luJywgcGFnZVNrZWxldG9uIClcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNlY3Rpb25cIilbMF0uY2xhc3NMaXN0LmFkZCgnZGlzcGxheU9wYWNpdHknKTtcbiAgICB0aGlzLmRpc3BsYXlUaW1lKClcbiAgICB0aGlzLmRpc3BsYXlMaW5rcygpXG4gICAgdGhpcy5nZXRCYWNrZ3JvdW5kSU1HKClcbiAgfVxuXG4gIGdldFBhZ2VTa2VsZXRvbigpe1xuICAgIC8vIHJldHVybiBwYWdlIHNrZWxldG9uXG4gICAgbGV0IGRhdGEgPSB7fTsgLy8gY3JlYXRlIG9iaiB0byBwYXNzIGRhdGFcbiAgICBkYXRhLnBhZ2VUaXRsZSA9IHRoaXMucGFnZVRpdGxlIC8vIGFzaWduZSBkYXRhXG4gICAgZGF0YS51c2VyTmFtZSA9IHRoaXMudXNlck5hbWVcbiAgICByZXR1cm4gIHVzZXJTa2VsZXRvbihkYXRhKTtcbiAgfVxuXG4gIGxvYWRFdmVudFVJKCl7XG4gICAgbGV0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKVxuICAgIGlmKHNlYXJjaCl7XG4gICAgICBzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICAgIGlmKGV2ZW50LmtleSA9PT0gJ0VudGVyJyl7XG4gICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+PSAxKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdodHRwczovL3d3dy5nb29nbGUuY2gvc2VhcmNoP3E9JytldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICB0aGlzLm9uR29Ub0xpbmsoZXZlbnQsJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jaC9zZWFyY2g/cT0nK2V2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgIC8vIGNsZWFuIGlucHV0IHZhbHVlIGFmdGVyIGdvIHNlYXJjaFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAvLyB1bmZvY3VzIGlucHV0IGVsZW1lbnQgYWZ0ZXIgZ28gc2VhcmNoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuYmx1cigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgbGV0IGljb25TZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbi1zZWFyY2gnKVxuICAgIGlmKGljb25TZWFyY2gpe1xuICAgICAgaWNvblNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYoc2VhcmNoKXtcbiAgICAgICAgICBzZWFyY2guZm9jdXMoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGRpc3BsYXlUaW1lKCl7XG4gICAgbmV3IFRpbWVyQ29tcG9uZW50KClcbiAgfVxuXG4gIGRpc3BsYXlMaW5rcygpe1xuICAgIG5ldyBMaW5rc0NvbXBvbmVudCgpO1xuICB9XG5cbiAgZ2V0QmFja2dyb3VuZElNRygpe1xuICAgIG5ldyBCYWNrZ3JvdW5kQ29tcG9uZW50KCk7XG4gIH1cblxuICBvbkdvVG9MaW5rKGV2ZW50LHVybCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgd2luID0gd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG4gICAgd2luLmZvY3VzKCk7XG4gIH1cblxuICBncmV0dGluZ3MoKXtcbiAgICBsZXQgZ3JldHRpbmdzO1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLnRpbWUuZ2V0SG91cnMoKT41ICYmIHRoaXMudGltZS5nZXRIb3VycygpPD0xMDpcbiAgICAgICAgZ3JldHRpbmdzID0gJ0dvb2QgbW9ybmluZydcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMudGltZS5nZXRIb3VycygpPj0xMSAmJiB0aGlzLnRpbWUuZ2V0SG91cnMoKTw9MTc6XG4gICAgICAgIGdyZXR0aW5ncyA9ICdIZWxsbydcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBncmV0dGluZ3MgPSAnR29vZCBldmVuaW5nJ1xuICAgIH1cbiAgICByZXR1cm4gZ3JldHRpbmdzXG4gIH1cblxuICBnZXRVc2VyTmFtZSgpe1xuICAgIC8vIHJldHVybiB1c2VybmFsIHdpdGggZmlyc3QgbGV0dGVyIENhcHBpdGFsaXplZFxuICAgIHJldHVybiB0aGlzLmZvcm1EYXRhLmVtYWlsLnNwbGl0KFwiQFwiKVswXS5zcGxpdCgnICcpLm1hcChjID0+IGMuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIGMuc2xpY2UoMSkpLmpvaW4oJyAnKVxuICB9XG5cbn1cbiIsIi8qKlxuKiBAQXV0aG9yOiBOaWNvbGFzIEZhemlvIDx3ZWJtYXN0ZXItZmF6aW8+XG4qIEBEYXRlOiAgIDExLTEyLTIwMTZcbiogQEVtYWlsOiAgY29udGFjdEBuaWNvbGFzZmF6aW8uY2hcbiogQExhc3QgbW9kaWZpZWQgYnk6ICAgd2VibWFzdGVyLWZhemlvXG4qIEBMYXN0IG1vZGlmaWVkIHRpbWU6IDExLTEyLTIwMTZcbiovXG5cbmV4cG9ydCBjbGFzcyBMaW5rc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgY29uc29sZS5sb2coJ0hlbGxvIExpbmtzU2VydmljZSEnKVxuICAgIHRoaXMuYXJyYXlEYXRhID0gW1xuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnR2l0aHViJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2dpdGh1Yi5jb20vZmF6aW9uaWNvJyxcbiAgICAgICAgJ2FsdFRpdGxlJzogJ0ZvbGxvdyBOaWNvbGFzIEZhemlvIG9uIEdpdGh1YidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdXZWIgc2l0ZScsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL25pY29sYXNmYXppby5jaC8nLFxuICAgICAgICAnYWx0VGl0bGUnOiAnTmljb2xhcyBGYXppbywgSHlicmlkIE1vYmlsZSAmIFdlYiBkZXZlbG9wcGVyJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ1R3aXR0ZXInLFxuICAgICAgICAndXJsJzogJ2h0dHBzOi8vdHdpdHRlci5jb20vZmF6aW9uaWNvJyxcbiAgICAgICAgJ2FsdFRpdGxlJzogJ0ZvbGxvdyBOaWNvbGFzIEZhemlvIG9uIFR3aXR0ZXInXG4gICAgICB9XG4gICAgXVxuICB9XG5cbiAgZ2V0RGF0YSgpe1xuICAgIC8vUmV0dXJuIGEgbmV3IHByb21pc2UuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKT0+IHtcbiAgICAgIC8qXG4gICAgICAgVE9ETzpcbiAgICAgICAgICAgIFJFTU9WRSAkdGhpcy5hcnJheURhdGFcbiAgICAgICAgICAgICAgQU5EIHJlcGxhY2UgJHRoaXMuYXJyYXlEYXRhIGJ5IGEgWE1MSHR0cFJlcXVlc3QgdG8geW91ciBvd24gZGF0YWJhc2UgUkVTVCBBUElcbiAgICAgICAgICAgICAgT1IgcmVwbGFjZSAkdGhpcy5hcnJheURhdGEgYnkgeW91ciBGaXJiYXNlIFByb3ZpZGVyXG4gICAgICAgICAgICBPUiBzaW1wbHkgY2hhbmdlICR0aGlzLmFycmF5RGF0YSBrZXkgYW5kIHZhbHVlLlxuICAgICAgICAgICAgVEhFTiByZXR1ciB0aGUgcmVzcG9uc2UgYXMgYSBQcm9taXNlXG4gICAgICAqL1xuXG4gICAgICAvLyBERUZBVUxUOiBTaW1wbHkgcmV0dXJuICR0aGlzLmFycmF5RGF0YSBhcyBhIFByb21pc2VcbiAgICAgIHJlc29sdmUodGhpcy5hcnJheURhdGEpXG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qKlxuKiBAQXV0aG9yOiBOaWNvbGFzIEZhemlvIDx3ZWJtYXN0ZXItZmF6aW8+XG4qIEBEYXRlOiAgIDA4LTEyLTIwMTZcbiogQEVtYWlsOiAgY29udGFjdEBuaWNvbGFzZmF6aW8uY2hcbiogQExhc3QgbW9kaWZpZWQgYnk6ICAgd2VibWFzdGVyLWZhemlvXG4qIEBMYXN0IG1vZGlmaWVkIHRpbWU6IDA5LTEyLTIwMTZcbiovXG5cbmV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZXtcblxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZGJOYW1lID0gJ2Jyb3dzZXItZGV2J1xuICAgIHRoaXMuZGIgPSBbXVxuICB9XG5cbiAgbG9hZERhdGEoKXtcbiAgICBsZXQgZGIgPSB0aGlzLnJlYWQoKVxuICAgIGlmKGRiKXtcbiAgICAgIHRoaXMuZGIucHVzaChkYilcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZSgpXG4gICAgICB0aGlzLmRiLnB1c2goe30pXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdTdG9yYWdlU2VydmljZTogZGF0YWJhc2UgcmVhZHkgLT4nLCB0aGlzLmRiKVxuICB9XG5cbiAgaXNBdXRoKCl7XG4gICAgaWYodGhpcy5kYlswXS51c2VyKXtcbiAgICAgIHJldHVybiB0aGlzLmRiWzBdXG4gICAgfVxuICB9XG5cbiAgbG9naW4odXNlckRhdGEpe1xuICAgIGNvbnNvbGUubG9nKCdTdG9yYWdlU2VydmljZTogbG9naW4tPicsIHVzZXJEYXRhKVxuICAgIGxldCBpc0F1dGggPSB0aGlzLmlzQXV0aCgpXG4gICAgaWYoIWlzQXV0aCl7XG4gICAgICB0aGlzLmRiWzBdLnVzZXIgPSB1c2VyRGF0YVxuICAgICAgdGhpcy51cGRhdGUoKVxuICAgIH1cbiAgfVxuXG4gIC8qIE1ldGhvZGVzIENSVUQgUXVlcnkgKi9cblxuICBjcmVhdGUoKXtcbiAgICBjb25zb2xlLmxvZygnU3RvcmFnZVNlcnZpY2U6IGNyZWF0ZS0+JywgdGhpcy5kYk5hbWUpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5kYk5hbWUsIEpTT04uc3RyaW5naWZ5KHt9KSlcbiAgfVxuXG4gIHJlYWQoKXtcbiAgICBjb25zb2xlLmxvZygnU3RvcmFnZVNlcnZpY2U6IHJlYWQtPicsIHRoaXMuZGJOYW1lKVxuICAgIGxldCBxdWVyeSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuZGJOYW1lKVxuICAgIC8vY29uc29sZS5sb2cocXVlcnkpXG4gICAgaWYocXVlcnkpe1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocXVlcnkpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCl7XG4gICAgY29uc29sZS5sb2coJ1N0b3JhZ2VTZXJ2aWNlOiB1cGRhdGUtPicsIHRoaXMuZGJbMF0pXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5kYk5hbWUsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGJbMF0pKVxuICB9XG5cbiAgZGVsZXRlKGl0ZW0pe1xuXG4gIH1cblxufVxuIiwiZXhwb3J0IGNvbnN0IEFQSV9LRVlfQ09ORklHID0ge1xuICAnY2xpZW50X2lkJzogXCI4NTYwZjMyNzQ4NTZhNDIyNTkyMzJmYTIxOTA1MGJjN2VkYzNkNzAyNTUxNDk4N2E0YjNiMGJlY2MxN2JhMDI5XCIsXG4gICdjbGllbnRfc2VjcmV0JzogXCI0Njc0ODY4ZTA4NjVmY2Y3YTJiNjNlMTU3MGQ5OGY2ZTc0NzBkOGNkMmNhZDNjNGQ3Zjg1NzNjODI3MDI0MzZkXCJcbn1cbiIsIi8qKlxuKiBAQXV0aG9yOiBOaWNvbGFzIEZhemlvIDx3ZWJtYXN0ZXItZmF6aW8+XG4qIEBEYXRlOiAgIDA3LTEyLTIwMTZcbiogQEVtYWlsOiAgY29udGFjdEBuaWNvbGFzZmF6aW8uY2hcbiogQExhc3QgbW9kaWZpZWQgYnk6ICAgd2VibWFzdGVyLWZhemlvXG4qIEBMYXN0IG1vZGlmaWVkIHRpbWU6IDExLTEyLTIwMTZcbiovXG5cbmltcG9ydCAgeyBBUElfS0VZX0NPTkZJRyB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy91bnNwbGFzaC9hcGlLZXktY29uZmlnJztcblxuZXhwb3J0IGNsYXNzIFVuc3BsYXNoU2VydmljZXtcblxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMucGFyYW1zID0gQVBJX0tFWV9DT05GSUdcbiAgICB0aGlzLnF1ZXJ5VXJsID0gJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvcmFuZG9tP2NvdW50PTEmY2xpZW50X2lkPSdcbiAgICBjb25zb2xlLmxvZygnaGVsbG8gVW5zcGxhc2hTZXJ2aWNlIScpXG4gIH1cblxuICBnZXRSYW5kb21JbWcoKXtcbiAgICAgIC8vUmV0dXJuIGEgbmV3IHByb21pc2UuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICAgIC8vIERvIHRoZSB1c3VhbCBYSFIgc3R1ZmZcbiAgICAgICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXEub3BlbignR0VUJywgdGhpcy5xdWVyeVVybCt0aGlzLnBhcmFtcy5jbGllbnRfaWQpO1xuICAgICAgICByZXEub25sb2FkID0gKCkgPT57XG4gICAgICAgICAgLy8gVGhpcyBpcyBjYWxsZWQgZXZlbiBvbiA0MDQgZXRjXG4gICAgICAgICAgLy8gc28gY2hlY2sgdGhlIHN0YXR1c1xuICAgICAgICAgIGlmIChyZXEuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZSB3aXRoIHRoZSByZXNwb25zZSB0ZXh0XG4gICAgICAgICAgICByZXNvbHZlKHJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSByZWplY3Qgd2l0aCB0aGUgc3RhdHVzIHRleHRcbiAgICAgICAgICAgIC8vIHdoaWNoIHdpbGwgaG9wZWZ1bGx5IGJlIGEgbWVhbmluZ2Z1bCBlcnJvclxuICAgICAgICAgICAgcmVqZWN0KEVycm9yKHJlcS5zdGF0dXNUZXh0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBIYW5kbGUgbmV0d29yayBlcnJvcnNcbiAgICAgICAgcmVxLm9uZXJyb3IgPSAoKT0+IHtcbiAgICAgICAgICByZWplY3QoRXJyb3IoXCJOZXR3b3JrIEVycm9yXCIpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gTWFrZSB0aGUgcmVxdWVzdFxuICAgICAgICByZXEuc2VuZCgpO1xuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==
