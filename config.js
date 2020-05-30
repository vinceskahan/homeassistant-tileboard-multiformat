function loadScript(url) {
  var req = new XMLHttpRequest();
  req.open('GET', url + '?cache=' + Math.random(), false);
  req.onreadystatechange = function(){
     if (req.readyState === 4) {
        var s = document.createElement('script');
        s.appendChild(document.createTextNode(req.responseText));
        document.head.appendChild(s);
     }
  };
  req.send(null);
}

var conf = location.search.match(/config=([\w\d_-]+)/);
conf = conf ? conf[1] : 'default'
loadScript('includes/' + conf + '.js');

