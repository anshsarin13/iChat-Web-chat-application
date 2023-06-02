const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInp=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
const container=document.getElementById('container');
const main=document.querySelector(".main");
const personName=document.getElementById('personName');
const h1=document.querySelector(".h1");
const temp=document.querySelector(".temp");
const close=document.querySelector(".close");
var audio=new Audio('ping.mp3');

var name=prompt("Enter your name")

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }
};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInp.value;
    append(`You:
    ${message}`,'right');
    socket.emit('send',message);
    messageInp.value='';

});

const enter=document.getElementById('enter');
enter.addEventListener("click",()=>{
    main.style.display="block";
    h1.style.display="block";
    temp.style.display="none";
});

close.addEventListener("click",()=>{
    main.style.display="none";
    h1.style.display="none";
    temp.style.display="flex";
});
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'middle');
});

socket.on('recieve',data=>{
    append(`${data.name}:
    ${data.message}`,'left');
});

socket.on('left',name=>{
    append(`${name} left the chat`,'middle');
});



