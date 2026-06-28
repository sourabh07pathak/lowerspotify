let songs = [
  { songName: "Jai Ho", filepath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  {
    songName: "Chaiyya Chaiyya",
    filepath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  { songName: "Tum Hi Ho", filepath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Kesariya", filepath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  {
    songName: "Kun Faya Kun",
    filepath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Kal Ho Naa Ho",
    filepath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  { songName: "Kabira", filepath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Zaalima", filepath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  {
    songName: "Dil Diyyan Gallan",
    filepath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  { songName: "Malhari", filepath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.querySelector("#masterPlay");
let masterPause = document.getElementById("masterPasue");
let masterSongInfo = document.querySelector(".masterSongInfo");
let gif = document.getElementById("gif");
let myProgressBar = document.getElementById("myProgressBar");
let coverImg = document.querySelectorAll(".coverImg");
let songName = document.querySelectorAll(".songName");
let capsulePlay = document.querySelectorAll(".capsulePlay");
let capsulePause = document.querySelectorAll(".capsulePause");
coverImg.forEach((element, i) => {
  element.src = songs[i].coverPath;
});
songName.forEach((element, i) => {
  element.innerText = songs[i].songName;
});

//Capsule play and pause
const makeAllPlay = () => {
  capsulePlay.forEach((element, i) => {
    element.classList.remove("hide");
    capsulePause[i].classList.add("hide");
  });
};
makeAllPlay();
capsulePlay.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    makeAllPlay();
    songIndex = parseInt(element.id);
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.play();
    masterSongInfo.innerText = songs[songIndex].songName;
    element.classList.add("hide");
    capsulePause[i].classList.remove("hide");
    masterPlay.classList.add("hide");
    masterPause.classList.remove("hide");
    gif.style.opacity = 1;
  });
});
capsulePause.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    makeAllPlay();
    audioElement.pause();
    element.classList.add("hide");
    capsulePlay[i].classList.remove("hide");
    masterPlay.classList.remove("hide");
    masterPause.classList.add("hide");
    gif.style.opacity = 0;
  });
});

//Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterSongInfo.innerText = songs[songIndex].songName;
    masterPlay.classList.add("hide");
    masterPause.classList.remove("hide");
    gif.style.opacity = 1;
  }
});
masterPause.addEventListener("click", () => {
  if (audioElement.play || audioElement.currentTime === audioElement.duration) {
    audioElement.pause();
    masterPlay.classList.remove("hide");
    masterPause.classList.add("hide");
    gif.style.opacity = 0;
  }
});
// Listen to Events

audioElement.addEventListener("timeupdate", () => {
  //Update Seekbar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100,
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex > 8) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.play();
  gif.style.opacity = 1;
  masterSongInfo.innerText = songs[songIndex].songName;
  masterPlay.classList.add("hide");
  masterPause.classList.remove("hide");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.play();
  masterSongInfo.innerText = songs[songIndex].songName;
  masterPlay.classList.add("hide");
  gif.style.opacity = 1;
  masterPause.classList.remove("hide");
});
