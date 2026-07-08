// ======================================
// BRENDON PIXEL ADVENTURE
// GAME ENGINE
// ======================================


const startButton =
document.getElementById("startButton");


const startScreen =
document.getElementById("startScreen");


const storyScreen =
document.getElementById("storyScreen");


const emergencyScreen =
document.getElementById("emergencyScreen");


const endingScreen =
document.getElementById("endingScreen");


const storyText =
document.getElementById("storyText");


const progress =
document.getElementById("loadingProgress");


const stage =
document.getElementById("stage");


const music =
document.getElementById("backgroundMusic");





// ======================================
// DATA BRENDON
// ======================================


const scenes = [


{
stage:"STAGE 1 - PLAYER PROFILE",

text:

`
👦 PLAYER FOUND

Name:

Brendon Baskara
Adinegara Siswanto

Nickname:
⭐ Brendon ⭐

Level:
6 Years Old

Birthday:
8 July 2020
`
},



{
stage:"STAGE 2 - CREATIVE WORLD",

text:

`
✂️ SKILL UNLOCKED

CRAFT MASTER

Brendon loves creating:

📄 Paper Art

📦 Cardboard Creation

✂️ Scissors

📏 Tape

✨ Imagination

Creativity Level:
MAXIMUM!
`
},



{
stage:"STAGE 3 - EMERGENCY CITY",

text:

`
🚨 FAVORITE MODE

Emergency World

Brendon loves everything about:

🚓 Police

🚑 Ambulance

🚒 Fire Truck

🚨 Siren Sound

MISSION:
Explore Emergency City!
`
},



{
stage:"STAGE 4 - DREAM MISSION",

text:

`
⭐ FUTURE QUEST

Become:

✨ Smart Kid

✨ Diligent Student

✨ Sunday School Hero

✨ Loving Everyone

Keep growing,
Brendon!
`
},



{
stage:"STAGE 5 - ACHIEVEMENT",

text:

`
🏆 ACHIEVEMENT UNLOCKED

⭐ Creative Kid

⭐ Curious Explorer

⭐ Kind Heart

⭐ Future Genius

LEVEL COMPLETE!
`
}

];






// ======================================
// TYPEWRITER EFFECT
// ======================================


function typeWriter(text, element, speed=35){


element.innerHTML="";


let i=0;


let clean=text.replace(/\n/g,"<br>");


let interval=setInterval(()=>{


element.innerHTML =
clean.substring(0,i);



i++;



if(i>clean.length){


clearInterval(interval);


}


},speed);



}







// ======================================
// START GAME
// ======================================


startButton.onclick=function(){



// aktifkan musik

music.volume=.5;


music.play()
.catch(()=>{});





startScreen.classList.remove("active");


storyScreen.classList.add("active");



playScenes(0);



};







// ======================================
// PLAY STORY
// ======================================


function playScenes(index){



if(index >= scenes.length){


showEmergency();


return;


}




let current=scenes[index];



stage.innerHTML=current.stage;



progress.style.width =

((index+1)/scenes.length*100)+"%";



typeWriter(
current.text,
storyText
);





setTimeout(()=>{


playScenes(index+1);


},6500);



}








// ======================================
// EMERGENCY SCREEN
// ======================================


function showEmergency(){



storyScreen.classList.remove("active");


emergencyScreen.classList.add("active");



setTimeout(()=>{


emergencyScreen.classList.remove("active");


showEnding();



},5000);



}









// ======================================
// ENDING CINEMATIC
// ======================================


function showEnding(){


endingScreen.classList.add("active");



createConfetti();



}







// ======================================
// CONFETTI EFFECT
// ======================================


function createConfetti(){



for(let i=0;i<80;i++){


let c=document.createElement("div");


c.innerHTML="✨";


c.style.position="absolute";


c.style.left=
Math.random()*100+"vw";


c.style.top="-20px";


c.style.fontSize=
(10+Math.random()*30)+"px";



c.style.animation=
"fall "+

(2+Math.random()*4)

+"s linear";



endingScreen.appendChild(c);



}



}






// ======================================
// MOBILE SCREEN LOCK
// ======================================


document.addEventListener(
"touchmove",
function(e){

e.preventDefault();

},
{
passive:false
}
);
