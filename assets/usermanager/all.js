document.addEventListener("DOMContentLoaded", () => {
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/[^a-z0-9_-]+|\s+/gmi, ""));
}
var togglepassword = document.querySelector('.btn-show-pass') !== null;
if(togglepassword){
var showPass = 0;
document.querySelector('.btn-show-pass').addEventListener('click', function() {
if(showPass == 0) {
document.querySelector('.pass-input').setAttribute('type','text');
document.querySelector('.pass').classList.remove('fa-eye');
document.querySelector('.pass').classList.add('fa-eye-slash');
showPass = 1;
}
else {
document.querySelector('.pass-input').setAttribute('type','password');
document.querySelector('.pass').classList.add('fa-eye');
document.querySelector('.pass').classList.remove('fa-eye-slash');
showPass = 0;
}

});
}
var usermanager1form = document.querySelector('.usermanager_form') !== null;
if(usermanager1form){
document.querySelector('.usermanager_form').addEventListener('submit', function(event) {
    event.preventDefault();
	document.querySelector('.mainbtn').style.display = 'none';
	document.querySelector('.loadingbtn').style.display = 'block';
    const formData = new FormData(this);
	fetch("./mobicms/plugins/usermanager/api.php", {
    method: 'post',
    body: formData,
}).then((response) => {
    return response.json()
}).then((res) => {
    if (res.stat == "success") {
		document.querySelector('.alert-danger').setAttribute("hidden", "hidden");
		window.location.href= res.returned;
        
    }else{
	document.querySelector('.alert-success').setAttribute("hidden", "hidden");	
	document.querySelector('.alert-danger').removeAttribute("hidden");
	document.querySelector('.alert-danger').innerHTML = res.returned;
	document.querySelector('.loadingbtn').style.display = 'none';
	document.querySelector('.mainbtn').style.display = 'block';
	}
}).catch((error) => {
    console.log(error);
	document.querySelector('.alert-success').setAttribute("hidden", "hidden");	
	document.querySelector('.alert-danger').removeAttribute("hidden");
	document.querySelector('.alert-danger').innerHTML = "Request not understood";
	document.querySelector('.loadingbtn').style.display = 'none';
	document.querySelector('.mainbtn').style.display = 'block';
})
	
	
});
}
var usermanager2form = document.querySelector('.usermanager_advance_form') !== null;
if(usermanager2form){
document.querySelector('.usermanager_advance_form').addEventListener('submit', function(event) {
    event.preventDefault();
	document.querySelector('.mainbtn').style.display = 'none';
	document.querySelector('.loadingbtn').style.display = 'block';
    const formData = new FormData(this);
	fetch("./mobicms/plugins/usermanager_advance/api.php", {
    method: 'post',
    body: formData,
}).then((response) => {
    return response.json()
}).then((res) => {
    if (res.stat == "success") {
		document.querySelector('.alert-danger').setAttribute("hidden", "hidden");
		window.location.href= res.returned;
        
    }else{
	document.querySelector('.alert-success').setAttribute("hidden", "hidden");	
	document.querySelector('.alert-danger').removeAttribute("hidden");
	document.querySelector('.alert-danger').innerHTML = res.returned;
	document.querySelector('.loadingbtn').style.display = 'none';
	document.querySelector('.mainbtn').style.display = 'block';
	}
}).catch((error) => {
    console.log(error);
	document.querySelector('.alert-success').setAttribute("hidden", "hidden");	
	document.querySelector('.alert-danger').removeAttribute("hidden");
	document.querySelector('.alert-danger').innerHTML = "Request not understood";
	document.querySelector('.loadingbtn').style.display = 'none';
	document.querySelector('.mainbtn').style.display = 'block';
})
	
	
});

}
var changepass = document.getElementById("acctcode") !== null;
if(changepass){
console.log("yes");
var resetcode = getParameterByName('resetcode');
var uid = getParameterByName('uid');
if(resetcode == null || resetcode == ""){
 document.querySelector('.mainbtn').setAttribute('disabled','disabled');
  $('.mainbtn').attr('disabled','disabled');
 }else{
  document.querySelector('.mainbtn').removeAttribute("disabled");
 }
document.getElementById("acctcode").value = resetcode;
document.getElementById("uid").value = uid;
}

});