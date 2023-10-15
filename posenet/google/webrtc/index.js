var getusermedia =require('getusermedia');
const Peer = require('simple-peer');
var peer=require('simple-peer')
getusermedia({
    video:true,
    audio:true
},
function(err,stream){
    if(err)console.log(err);

//   showWebcam();

var peer =new Peer({
    initiator:location.hash === "#init",
    trickle:false,
    stream:stream
})

peer.on('signal',function(data){
    console.log(data);

    document.getElementById("yourid").value=JSON.stringify(data);
})

document.getElementById("connect").addEventListener('click',function(){
    console.log("button clicked")
    var otherId=JSON.parse(document.getElementById('otherid').value)
peer.signal(otherId);
})
document.getElementById('send').addEventListener('click',function(){
    var yourmessage=document.getElementById('yourmessage').value
    peer.send(yourmessage);
})
peer.on('data',function(data){
    document.getElementById("messages").textContent+=data + "\n"
})

peer.on('stream',function(stream){
    showWebcam(stream)
})
})

function showWebcam(stream){
    const video=document.createElement('video');
    document.body.appendChild(video);
    video.srcObject=stream;
    video.play();
}