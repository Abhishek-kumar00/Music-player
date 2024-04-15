// import allMusic from "./music-list";
let allMusic = [
    {
      name: "Bhool Bhulaiyaa",
      artist: "Neeraj Shridhar",
      img: "music-1",
      src: "music-1"
    },
    {
      name: "oo jaane jaana",
      artist: "Kammal Khan",
      img: "music-2",
      src: "music-2"
    },
    {
      name: "Mi Amor",
      artist: "Sharn,The Paul",
      img: "music-3",
      src: "music-3"
    },
    {
      name: "Tere Jaisa Yaar Kahan",
      artist: "Kishore Kumar",
      img: "music-4",
      src: "music-4"
    },
    {
      name: "Dil Ka Koi Tukda",
      artist: "Hariharan,Kavita Krishnamurthy",
      img: "music-5",
      src: "music-5"
    },
    {
      name: "Tujhse Naraz Nahin Zindagi",
      artist: "Lata Mangeshkar",
      img: "music-6",
      src: "music-6"
    },
    {
      name: "Zindagi Ki Yahi Reet Hai",
      artist: "Kishore Kumar",
      img: "music-7",
      src: "music-7"
    },
    {
      name: "Apna Har Din",
      artist: "Shaan,Anushka Manchanda",
      img: "music-8",
      src: "music-8"
    },
    {
      name: "Dhoom",
      artist: "Vishal Dadlani",
      img: "music-9",
      src: "music-9"
    },
    {
      name: "Hirwa Nisarga",
      artist: "Sonu Nigam",
      img: "music-10",
      src: "music-10"
    },
  ];

const playbtn=document.querySelector(".playBtn");
const main=document.querySelector(".main");
const pausebtn=document.querySelector(".pauseBtn");
const nextbtn=document.querySelector(".Next");
const prevbtn=document.querySelector(".Previous");
const audio=document.getElementById("main-audio");
const moreMusicBtn=document.getElementById("moreMusic");
const imageSection=document.querySelector(".image-area");
const progressArea=document.querySelector(".progressArea");
const progressBar=document.querySelector(".progressBar");
const pinkSlider = document.querySelector(".pinkSlider");
const darkMode=document.querySelector(".darkMode");
const lightMode=document.querySelector(".lightMode");
const userTheme=localStorage.getItem("theme");
//const Repete=document.querySelector(".repeat");
// let index variable hai itration kay leay first try mai vhala to tik wrna badh mai jaye
let index=0;
playbtn.addEventListener("click",()=>{
    audio.play();
    playbtn.style.display="none";
    pausebtn.style.display="block";


});
pausebtn.addEventListener("click",()=>{
    audio.pause();
    playbtn.style.display="block";
    pausebtn.style.display="none";
});

const theamCheck=()=>{
  if(userTheme==="dark"){
    document.documentElement.classList.add("dark");
    darkMode.style.display="none";
    lightMode.style.display="block";
    return;
  }
  lightMode.style.display="none";
};
const theamSwitch=()=>{
  if(document.documentElement.classList.contains("dark")){
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme","light");
    theamCheck();
    return;
  }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    theamCheck();

};
lightMode.addEventListener("click",()=>{
  theamSwitch();
  lightMode.style.display="none";
  darkMode.style.display="block";
});
darkMode.addEventListener("click", ()=>{
  theamSwitch();
  darkMode.style.display="none";
  lightMode.style.display="block";
  
});
theamCheck();



const playCurrentsong =()=>{
    //const audio=document.getElementById("main-audio");
    audio.src= "/songs/"+allMusic[index].src + ".mp3";
    audio.load();
    //audio.play();
    let newImage="/images/"+allMusic[index].img + ".jpg";
    imageSection.style.backgroundImage="url("+newImage+")";
    const firstImage=document.querySelector(".first-image");
    firstImage.src=newImage;
    const songName=document.querySelector(".song-name");
    songName.innerText=allMusic[index].name;
    const Artist=document.querySelector(".Artist");
    Artist.innerText=allMusic[index].artist;


}
nextbtn.addEventListener("click",()=>{
    index++;
    if(index>=allMusic.length){
        index=0;
    }
    audio.pause();
    pausebtn.style.display="none";
    playbtn.style.display="block";
    playCurrentsong();
});
prevbtn.addEventListener("click",()=>{
    index--;
    if(index<0){
        index=allMusic.length-1;
    }
    audio.pause();
    pausebtn.style.display="none";
    playbtn.style.display="block";
    playCurrentsong();

});
audio.addEventListener("timeupdate",(e)=>{
  const currentTime=e.target.currentTime;
  const duration=e.target.duration;
  let progressWidth=(currentTime/duration)*100;
  progressBar.style.width=`${progressWidth}%`;
  pinkSlider.style.width = `${progressWidth}%`;

  let musicCurrentTime=main.querySelector(".current-timer");
  let musicDuration=main.querySelector(".EndTime");
  audio.addEventListener("loadeddata",()=>{
    let mainDuration=audio.duration;
    let totalMin=Math.floor(mainDuration/60);
    let totalSec=Math.floor(mainDuration%60);
    if(totalSec<10){
      totalSec=`0${totalSec}`;
    }
    musicDuration.innerText=`${totalMin}:${totalSec}`;
  });
  let currentMin=Math.floor(currentTime/60);
  let currentSec=Math.floor(currentTime%60);
  if(currentSec<10){
    currentSec=`0${currentSec}`;
  }
  musicCurrentTime.innerText=`${currentMin}:${currentSec}`;

});
progressArea.addEventListener("click",(e)=>{
  let progressWidthval=progressArea.clientWidth;
  let clickedOffSetX=e.offsetX;
  let songDuration=audio.duration;
  audio.currentTime=(clickedOffSetX/progressWidthval)*songDuration;
  playCurrentsong();

  const isPaused=audio.paused;
  if(isPaused){
    audio.play();
    playbtn.style.display="none";
    pausebtn.style.display="block";
  }

});