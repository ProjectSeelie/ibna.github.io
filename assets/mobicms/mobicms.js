var objXMLHttpRequest = new XMLHttpRequest();
objXMLHttpRequest.onreadystatechange = function() {
  if(objXMLHttpRequest.readyState === 4) {
    if(objXMLHttpRequest.status === 200) {
          console.log(objXMLHttpRequest.responseText);
    } else {
          console.log('Error Code: ' +  objXMLHttpRequest.status);
          console.log('Error Message: PHP Enabled server is required to use mobicms' + objXMLHttpRequest.statusText);
    }
  }
}
objXMLHttpRequest.open('POST', './assets/mobicms/index.php');
objXMLHttpRequest.send();
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/[^a-z0-9_-]+|\s+/gmi, ""));
}
if(document.getElementsByClassName('pageurl').length > 0){
var pagename = getParameterByName('pagename');
fetch("./mobicms/loadpage.php?pagename=" + encodeURI(pagename))
  .then(function(response) {
    return response.text();
  })
  .then(function(body) {
    document.querySelector('.pagecontent').innerHTML = body;
	document.querySelector('#loading').style.display = 'none';
    document.querySelector('#pagecontent').style.display = 'block';
  });
}
if(document.getElementsByClassName('advancepage').length > 0){
document.querySelector('#loading').style.display = 'none';
document.querySelector('.advancepage').style.display = 'block';
}
if(document.getElementsByClassName('pagename').length > 0){
const element = document.getElementById("pagecontent"); 
let pagename = element.getAttribute("data-page"); 
fetch("./mobicms/loadpage.php?pagename=" + encodeURI(pagename))
  .then(function(response) {
    return response.text();
  })
  .then(function(body) {
    document.querySelector('.pagecontent').innerHTML = body;
	document.querySelector('#loading').style.display = 'none';
    document.querySelector('#pagecontent').style.display = 'block';
  });
}