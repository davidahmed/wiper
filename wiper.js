document.body.style.border = "5px solid red";
console.log("Target available");


var res = document.getElementsByClassName('r')

var blacklist = new RegExp('https?:\/\/.*\.(geeksforgeeks|tutorialspoint).*\.*');

for (var i= 0; i < res.length; i++){
	if(res[i].childNodes[0].getAttribute('href').match(blacklist)){
		res[i].parentElement.remove()
	}
}
