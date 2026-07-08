// ======================================
// BRENDON PIXEL ADVENTURE
// GAME ENGINE
// ======================================



// ===============================
// ELEMENT REFERENCES
// ===============================


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


const nextButton =
document.getElementById("nextButton");


const restartButton =
document.getElementById("restartButton");


const music =
document.getElementById("backgroundMusic");



let currentScene = 0;





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

⭐ Brendon
⭐ Tole
⭐ Ade
⭐ Sule


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


EMERGENCY WORLD


Brendon loves:

🚨 Siren Sound

🚑 Ambulance

🚒 Fire Truck

🚓 Police


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



let timer=setInterval(()=>{


element.innerHTML =
clean.substring(0,i);



i++;



if(i>clean.length){


clearInterval(timer);


}



},speed);



}








// ======================================
// START GAME
// ======================================


startButton.onclick=function(){



music.volume=.5;


music.play()
.catch(()=>{});



startScreen.classList.remove("active");


storyScreen.classList.add("active");



currentScene=0;


playScenes(currentScene);



};









// ======================================
// STORY SYSTEM
// ======================================


function playScenes(index){



if(index >= scenes.length){


showEmergency();


return;


}




let current=scenes[index];



stage.innerHTML =
current.stage;



progress.style.width =

((index+1)/scenes.length*100)+"%";




typeWriter(

current.text,

storyText

);





if(index === scenes.length-1){


nextButton.innerHTML=
"🎂 CELEBRATE";


}

else{


nextButton.innerHTML=
"NEXT ▶";


}



}








// ======================================
// NEXT BUTTON
// ======================================


nextButton.onclick=function(){



currentScene++;


playScenes(currentScene);



};









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
// ENDING
// ======================================


function showEnding(){


endingScreen.classList.add("active");


createConfetti();


}








// ======================================
// PLAY AGAIN
// ======================================


restartButton.onclick=function(){



endingScreen.classList.remove("active");


startScreen.classList.add("active");



currentScene=0;


progress.style.width="0%";


storyText.innerHTML="";


music.pause();


music.currentTime=0;



};









// ======================================
// CONFETTI
// ======================================


function createConfetti(){



document
.querySelectorAll(".confetti")
.forEach(e=>e.remove());



for(let i=0;i<80;i++){



let c =
document.createElement("div");



c.className="confetti";


c.innerHTML="✨";



c.style.position="absolute";


c.style.left =
Math.random()*100+"vw";


c.style.top="-20px";


c.style.fontSize =

(10+Math.random()*30)+"px";



c.style.animation =

"fall "

+
(2+Math.random()*4)

+
"s linear";



endingScreen.appendChild(c);



}



}









// ======================================
// REAL ASSET LOADER
// ======================================


const assets=[


"assets/brendon.gif",

"assets/music.mp3"


];



const loadingScreen =
document.getElementById("loadingScreen");


const loadingFill =
document.getElementById("loadingFill");


const loadingPercent =
document.getElementById("loadingPercent");


const loadingStatus =
document.getElementById("loadingStatus");



let loadedAssets=0;






function updateLoading(){



let percent = Math.floor(


(loadedAssets / assets.length)
*100


);



loadingFill.style.width =
percent+"%";


loadingPercent.innerHTML =
percent+"%";



}








function loadAsset(url){


return new Promise(resolve=>{


let element;



if(url.endsWith(".mp3")){


element =
new Audio();



element.oncanplaythrough=function(){


loadedAssets++;

updateLoading();


resolve();


};



element.onerror=function(){


console.log(
"Gagal audio:",
url
);


loadedAssets++;

updateLoading();


resolve();


};



element.src=url;



}

else{



element =
new Image();



element.onload=function(){


loadedAssets++;


updateLoading();


resolve();


};



element.onerror=function(){


console.log(
"Gagal image:",
url
);



loadedAssets++;


updateLoading();


resolve();


};



element.src=url;



}



});

}








async function startLoading(){



loadingStatus.innerHTML=
"Loading Pixel Assets...";



for(let asset of assets){


loadingStatus.innerHTML=
"Loading : "+asset;



await loadAsset(asset);



}



loadingStatus.innerHTML=
"SYSTEM READY!";



setTimeout(()=>{


loadingScreen.style.opacity="0";



setTimeout(()=>{


loadingScreen.remove();



},1000);



},1200);



}






window.addEventListener(
"load",
startLoading
);






// ======================================
// MOBILE TOUCH CONTROL
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
