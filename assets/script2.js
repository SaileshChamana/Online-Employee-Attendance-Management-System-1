// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'xxx',
//   database: 'nodejs'
// });

const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const toggle = document.querySelector('.toggle')

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function setTime() {
    const time = new Date();
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hours = time.getHours()
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`

}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime()

setInterval(setTime, 1000)

const nav = document.querySelector('.nav-container');
const mainContent = document.querySelector('.main');

function stickNavigation() {
  if (window.pageYOffset >= mainContent.offsetTop - 75) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

window.addEventListener('scroll', stickNavigation);

document.querySelector('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.elements.name.value = '';
  e.target.elements.email.value = '';
  e.target.elements.message.value = '';
});

const startBtns = document.querySelectorAll('.start-btn');
const stopBtns = document.querySelectorAll('.stop-btn');

startBtns.forEach((startBtn) => {
startBtn.addEventListener('click', () => {
  
  const row = startBtn.closest('tr');
  
  const startTimeCell = row.querySelector('td:nth-child(4)');
  // startTimeCell.textContent = new Date().toLocaleString();
  let now = new Date();

  // Get the current hours, minutes, and seconds
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Format the time as "hh:mm:ss"
  let time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  startTimeCell.textContent = time.toLocaleString();
});
});


// stopBtns.forEach((stopBtn) => {
//   stopBtn.addEventListener('click', () => {
    
//     const row = stopBtn.closest('tr');
//     const theStartTime = row.querySelector('td:nth-child(4').value;
//     const endTimeCell = row.querySelector('td:nth-child(5)');
//     let now = new Date();
  
//     // Get the current hours, minutes, and seconds
//     let ehours = now.getHours();
//     let eminutes = now.getMinutes();
//     let eseconds = now.getSeconds();
  
//     // Format the time as "hh:mm:ss"
//     let theEndTime = ehours.toString().padStart(2, '0') + ':' + eminutes.toString().padStart(2, '0') + ':' + eseconds.toString().padStart(2, '0');
//     endTimeCell.textContent = theEndTime;
    
//     const totalTimeCell = row.querySelector('td:nth-child(3)');
//     let d1 = new Date();
//     let d2 = new Date();
//     const startTime = row.querySelector('td:nth-child(4)').textContent;
//     const endTime = endTimeCell.textContent;
//     var timeParts1 = startTime.split(':');
//     var hours = parseInt(timeParts1[0], 10);
//     var minutes = parseInt(timeParts1[1], 10);
//     var seconds = parseInt(timeParts1[2], 10);
//     d1.setHours(hours);
//     d1.setMinutes(minutes);
//     d1.setSeconds(seconds);

//     var timeParts2 = endTime.split(':');
//     var hours = parseInt(timeParts2[0], 10);
//     var minutes = parseInt(timeParts2[1], 10);
//     var seconds = parseInt(timeParts2[2], 10);
//     d2.setHours(hours);
//     d2.setMinutes(minutes);
//     d2.setSeconds(seconds);

//     let s = d1.getTime();
//     let e = d2.getTime();

//     const timeDiff = e - s;
//     const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//     const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
//     let theTotalTime = hours + ' hours ' + minutes + ' minutes';
//     totalTimeCell.textContent = hours + ' hours ' + minutes + ' minutes';
//     const dataToSave = {
//       start : theStartTime,
//       end : theEndTime,
//       total : theTotalTime
//     }
//   });
//   });

stopBtns.forEach((stopBtn) => {
  stopBtn.addEventListener('click', () => {
    
    const row = stopBtn.closest('tr');
    
    const endTimeCell = row.querySelector('td:nth-child(5)');
    const totalTimeCell = row.querySelector('td:nth-child(3)');
    
    let now = new Date();

    // Get the current hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Format the time as "hh:mm:ss"
    let time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    endTimeCell.textContent = time;

    // Get the start time from the corresponding cell in the row
    const startTime = row.querySelector('td:nth-child(4)').textContent;

    // Calculate the time difference between the start and end times
    let d1 = new Date();
    let d2 = new Date();
    const timeParts1 = startTime.split(':');
    const timeParts2 = time.split(':');
    d1.setHours(parseInt(timeParts1[0]));
    d1.setMinutes(parseInt(timeParts1[1]));
    d1.setSeconds(parseInt(timeParts1[2]));
    d2.setHours(parseInt(timeParts2[0]));
    d2.setMinutes(parseInt(timeParts2[1]));
    d2.setSeconds(parseInt(timeParts2[2]));

    let timeDiff = d2 - d1;

    // Convert the time difference to hours, minutes, and seconds
    let diffSeconds = Math.floor(timeDiff / 1000);
    let diffMinutes = Math.floor(diffSeconds / 60);
    let diffHours = Math.floor(diffMinutes / 60);

    diffMinutes %= 60;
    diffSeconds %= 60;

    // Format the time difference as "hh hours mm minutes"
    let totalTime = diffHours.toString().padStart(2, '0') + ':' + diffMinutes.toString().padStart(2, '0') + ':' + diffSeconds.toString().padStart(2, '0');
    totalTimeCell.textContent = totalTime;
    
  });
});

// function saveEdits() {

// var editElem1 = document.getElementById("edit1");
// var editElem2 = document.getElementById("edit2");

// var userVersion1 = editElem1.innerHTML;
// var userVersion2 = editElem2.innerHTML;

// localStorage.userEdits1 = userVersion1;
// localStorage.userEdits2 = userVersion2;

// }

// function checkEdits() {

// if(localStorage.userEdits1!=null)
// document.getElementById("edit1").innerHTML = localStorage.userEdits1;

// if(localStorage.userEdits2!=null)
// document.getElementById("edit2").innerHTML = localStorage.userEdits2;
// }

function sendEmail(){
  Email.send({
  Host : "smtp.gmail.com",
  Username : "anurag.chess5@gmail.com",
  Password : "EE216DC88740C8F05E6C620F84FA9441C62B",
  To : 'lelouch3geass@gmail.com',
  From : document.getElementById("email").value,
  Subject : "This is a test mail",
  Body : "And this is the body"
}).then(
message => alert(message)
);
}

  function preventBack(){window.history.forward();}
  setTimeout("preventBack()", 0);
  window.onunload=function(){null};