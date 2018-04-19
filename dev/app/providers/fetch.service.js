export default class FetchService {

  static get(url, options = {method: 'get'}){
    options.method = 'get';
    return fetch(url, options)
    .then(res=> res.json())
    .catch(err => alert(err.message ||  err.toString() ))
  }

  static post(url, options = {method: 'post', body: {}}){
    options.method = 'post';
    return fetch(url, options)
    .then(res=> res.json())
    .catch(err => alert(err.message ||  err.toString() ))
  }

}
