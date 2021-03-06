define(function(){
  const baseUrl = 'http://0.0.0.0:3000/';
  const status = { ok: 200, created: 201 }
  var HttpRequest = function() {
    this.get = function(url, onSuccess, onError){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == status.ok) {
          onSuccess(xmlHttp.responseText);
        } else {
          onError(xmlHttp.responseText);
        }
      }

      xmlHttp.open('GET', url, true);
      xmlHttp.send(null);
    },
    this.post = function(url, payload, onSuccess, onError){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == status.created) {
          onSuccess(xmlHttp.responseText);
        } else {
          onError(xmlHttp.responseText);
        }
      }

      xmlHttp.open('POST', url, true);
      xmlHttp.setRequestHeader('Content-Type', 'application/json');
      xmlHttp.send(payload);
    }
  }

  return {
    signup: function(onSuccess, onError) {
      const requestUrl = baseUrl + 'users';
      var request = new HttpRequest();
      request.post(requestUrl, null, onSuccess, onError);
    },
    login: function(key, onSuccess, onError){
      const requestUrl = baseUrl + 'users/valid?key=' + key;
      var request = new HttpRequest();
      request.get(requestUrl, onSuccess, onError);
    },
    watchingUpdate: function(key, payload, onSuccess, onError) {
      const requestUrl = baseUrl + 'users/' + key + '/watching_events';
      var request = new HttpRequest();
      request.post(requestUrl, JSON.stringify(payload), onSuccess, onError);
    },
    watchList: function(key, onSuccess, onError) {
      const requestUrl = baseUrl + 'users/' + key + '/watch_list';
      var request = new HttpRequest();
      request.get(requestUrl, onSuccess, onError);
    }
  }
});
