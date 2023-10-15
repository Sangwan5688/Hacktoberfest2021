var data;
var mobile = navigator.userAgent.match("Mobile")!=null||navigator.userAgent.match("Linux;")!=null;
// if(mobile){
// 	document.getElementById("container").style.filter = "url(#rgbShiftMobile)";
// 	document.getElementById("container").style.webkitFilter = "url(#rgbShiftMobile)";
// }
var config = {
	apiKey: "AIzaSyDnxTnQ58lD1Lc9sUWZBHrB6oOArl4TCYA",
	authDomain: "screen-pong.firebaseapp.com",
	databaseURL: "https://screen-pong.firebaseio.com",
	projectId: "screen-pong",
	storageBucket: "screen-pong.appspot.com",
	messagingSenderId: "813057726714"
};
firebase.initializeApp(config);

var database = firebase.database();

function info(){
	var r = document.getElementById("replace");
	r.innerHTML = '<div class="subtitle">FOR THIS GAME YOU NEED 2 SCREENS ON THE SAME LINK</div><div class="button" onclick="menu()">OKAY</div>';
	try{
		document.requestFullscreen();
	}catch(e){
		try{
			document.webkitRequestFullscreen();
		}catch(e){
			try{
				document.mozRequestFullScreen();
			}catch(e){
				document.msRequestFullscreen();
			}
		}
	}
}
function menu(){
	var r = document.getElementById("replace");
	r.innerHTML = '<div class="subtitle">IS THIS THE LEFT OR THE RIGHT SCREEN?</div><div class="button close" onclick="left()">LEFT</div><div class="button close" onclick="right()">RIGHT</div>';
}

function getCode(){
	var letters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	var c = "";
	for(var i = 0; i < 6; i++)
		c += letters[Math.floor(Math.random() * letters.length)];
	database.ref("/A" + c).once("value", function(e){
		e = e.val();
		if(e)
			getCode();
		else
			game(c);
	});
}
function left(){
	var r = document.getElementById("replace");
	r.innerHTML = '<div class="subtitle">ENTER THIS CODE IN THE RIGHT SCREEN.</div><div class="title" id="code" style="margin-top: 10vmax">LOADING</div>';
	getCode();
}
function game(code){
	console.log(code);
	document.getElementById("code").innerHTML = code;
	database.ref("/A" + code).on("value", function(e){
		if(e.val() == 2){
			var ratio = document.body.clientWidth / document.body.clientHeight;
			database.ref("/A" + code).off();
			data = {
				x: ratio * 100,
				y: 50,
				d: 180,
				p1: {
					ratio: ratio,
					score: 0
				},
				p2: {
					ratio: 99999,
					score: 0
				},
				speed: 2
			};
			database.ref("/A" + code).set(data);
			database.ref("/A" + code).on("value", function(e){
				data = e.val();
				database.ref("/A" + code).off();
				database.ref("/A" + code).on("value", function(e){
					e = e.val();
					if(data.x > data.p1.ratio * 100)
						data = e;
				});
				database.ref("/A" + code + "/p1/score").on("value", function(e){
					score.innerHTML = e.val();
				});
			});
			var r = document.getElementById("replace");
			r.innerHTML = "";
			var border = document.createElement("DIV");
			border.className = "border left";
			r.appendChild(border);
			var ball = document.createElement("DIV");
			ball.id = "ball";
			r.appendChild(ball);
			var paddle = document.createElement("DIV");
			paddle.id = "paddle";
			paddle.className = "leftp";
			paddle.style.top = document.body.clientHeight / 2 + "px";
			r.appendChild(paddle);
			var score = document.createElement("SPAN");
			score.id = "scorer";
			score.innerHTML = "0";
			r.appendChild(score);
			window.onmousemove = function(e){
				paddle.style.top = e.clientY + "px";
			}
			window.ontouchstart = function(e){
				paddle.style.top = e.touches[0].clientY + "px";
			}
			window.ontouchmove = function(e){
				e.preventDefault();
				paddle.style.top = e.touches[0].clientY + "px";
			}
			function update(time){
				requestAnimationFrame(update);
				ball.style.left = data.x + "vh";
				ball.style.top = data.y + "vh";
				data.x += Math.cos(data.d / 180 * Math.PI) * data.speed;
				data.y += Math.sin(data.d / 180 * Math.PI) * data.speed;
				if(data.y < 2.5){
					data.d *= -1;
					data.y = 2.5;
				}
				if(data.y > 100 - 2.5){
					data.d *= -1;
					data.y = 100 - 2.5;
				}
				if(data.x < 2.5){
					data.d = 180 - data.d;
					data.x = 2.5;
					database.ref("/A" + code + "/speed").set(2);
					database.ref("/A" + code + "/p2/score").once("value", function(e){
						database.ref("/A" + code + "/p2/score").set(e.val() + 1);
					});
				}
				// if(data.x > data.p1.ratio * 100 + data.p2.ratio * 100 - 2.5){
				// 	data.d = 180 - data.d;
				// 	data.x = data.p1.ratio * 100 + data.p2.ratio * 100 - 2.5;
				// }
				if(data.x < 12.5 && Math.abs(data.y - parseInt(paddle.style.top) / document.body.clientHeight * 100) < 15){
					data.d = 4 * (data.y - parseInt(paddle.style.top) / document.body.clientHeight * 100);
					data.x = 12.5;
					database.ref("/A" + code + "/speed").set(data.speed + 0.1);
				}
				if(data.x <= data.p1.ratio * 100){
					database.ref("/A" + code + "/x").set(data.x);
					database.ref("/A" + code + "/y").set(data.y);
					database.ref("/A" + code + "/d").set(data.d);
				}
				// console.log(time - last);
				last = time;
				window.scrollTo(0, 1); 
			}
			var last = 0;
			update(performance.now());
		}
	});
	database.ref("/A" + code).set(1);
}
function right(){
	var r = document.getElementById("replace");
	r.innerHTML = '<div class="subtitle">ENTER THE CODE FROM THE LEFT SCREEN HERE.</div><input class="title input" id="code" style="margin-top: 10vmax" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" autofocus onkeyup="checkCode(this)"></input>';
}
function checkCode(e){
	if(e.value.length == 6){
		var code = e.value.toUpperCase();
		database.ref("/A" + code).once("value", function(e){
			if(e.val() == 1){
				database.ref("/A" + code).on("value", function(e){
					if(e.val() == 2){
						var ratio = document.body.clientWidth / document.body.clientHeight;
						database.ref("/A" + code).off();
						data = {p1:{ ratio: 999999, score: 0 }};
						database.ref("/A" + code).on("value", function(e){
							e = e.val();
							if(e != 2){
								data = e
								database.ref("/A" + code).off();
								database.ref("/A" + code + "/p2").set({
									ratio: ratio
								});
								data.p2.ratio = ratio;
								database.ref("/A" + code).on("value", function(e){
									e = e.val();
									if(data.x <= data.p1.ratio * 100)
										data = e;
								});
								database.ref("/A" + code + "/p2/score").on("value", function(e){
									score.innerHTML = e.val();
								});
							}
						});
						var r = document.getElementById("replace");
						r.innerHTML = "";
						var border = document.createElement("DIV");
						border.className = "border right";
						r.appendChild(border);
						var ball = document.createElement("DIV");
						ball.id = "ball";
						r.appendChild(ball);
						var paddle = document.createElement("DIV");
						paddle.id = "paddle";
						paddle.className = "rightp";
						paddle.style.top = document.body.clientHeight / 2 + "px";
						r.appendChild(paddle);
						var score = document.createElement("SPAN");
						score.id = "scorel";
						score.innerHTML = "0";
						r.appendChild(score);
						data.p2 = {
							ratio: ratio,
							score: 0
						}
						window.onmousemove = function(e){
							paddle.style.top = e.clientY + "px";
						}
						window.ontouchstart = function(e){
							paddle.style.top = e.touches[0].clientY + "px";
						}
						window.ontouchmove = function(e){
							e.preventDefault();
							paddle.style.top = e.touches[0].clientY + "px";
						}
						function update(time){
							requestAnimationFrame(update);
							ball.style.left = (data.x - data.p1.ratio * 100) + "vh";
							ball.style.top = data.y + "vh";
							data.x += Math.cos(data.d / 180 * Math.PI) * data.speed;
							data.y += Math.sin(data.d / 180 * Math.PI) * data.speed;
							if(data.y < 2.5){
								data.d *= -1;
								data.y = 2.5;
							}
							if(data.y > 100 - 2.5){
								data.d *= -1;
								data.y = 100 - 2.5;
							}
							// if(data.x < 2.5){
							// 	data.d = 180 - data.d;
							// 	data.x = 2.5;
							// }
							if(data.x > data.p1.ratio * 100 + data.p2.ratio * 100 - 2.5){
								data.d = 180 - data.d;
								data.x = data.p1.ratio * 100 + data.p2.ratio * 100 - 2.5;
								database.ref("/A" + code + "/speed").set(2);
								database.ref("/A" + code + "/p1/score").once("value", function(e){
									database.ref("/A" + code + "/p1/score").set(e.val() + 1);
								});
							}
							//Correction for left/right position not working
							paddle.style.left = data.p2.ratio * 100 - 7.5 + "vh";
							if(data.x > data.p1.ratio * 100 + data.p2.ratio * 100 - 12.5 && Math.abs(data.y - parseInt(paddle.style.top) / document.body.clientHeight * 100) < 15){
								data.d = 180 - 4 * (data.y - parseInt(paddle.style.top) / document.body.clientHeight * 100);
								data.x = data.p1.ratio * 100 + data.p2.ratio * 100 - 12.5;
								database.ref("/A" + code + "/speed").set(data.speed + 0.1);
							}
							if(data.x > data.p1.ratio * 100){
								database.ref("/A" + code + "/x").set(data.x);
								database.ref("/A" + code + "/y").set(data.y);
								database.ref("/A" + code + "/d").set(data.d);
							}
							// console.log(time - last);
							last = time;
							window.scrollTo(0, 1); 
						}
						var last = 0;
						update(performance.now);
					}
				});
				database.ref("/A" + code).set(2);
			}
		});
	}
}