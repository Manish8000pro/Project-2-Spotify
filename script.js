console.log("lets write the javascript")
let currentsong = new Audio();


function secondsToMinuteSeconds(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/")
  let response = await a.text();
  let div = document.createElement("div")
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")
  console.log(as)
  let songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href)
    }
  }
  return songs
}


const playMusic = (track, pause = false) => {
  // ✅ Stop and reset the current song if it’s playing
  currentsong.pause();
  currentsong.currentTime = 0;

  // ✅ Load and play the new song
  currentsong.src = `/songs/${track}`;
  console.log(`${track}`);
  if (pause!==true) {
    currentsong.play()
    
  }
play.src = "pause.svg"
  document.querySelector(".songinfo").innerHTML = decodeURI(track.replace(".mp3", ""));
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
};



document.addEventListener("DOMContentLoaded", () => {
  main();
});

async function main() {



  // Get the  list of all the  songs
  let songs = await getsongs();
  let firstTrack = songs[0].split("/songs/")[1]; // Just the filename
  playMusic(firstTrack, false);

  console.log(songs);

  // show all the song in playlist

  let songUL = document.querySelector(".songlist ul");

  for (const song of songs) {
    let li = document.createElement("li");
    li.textContent = song.split("/songs/")[1].replace(".mp3", "");
    li.innerHTML = `
    <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.split("/songs/")[1].replace(".mp3", "")} </div>
                                 <div>Manish</div>
                            </div>
                           <div class="playnow">
                            <span>Play Now</span>
                            <img class="invert" src="play.svg" alt="">
                           </div>
                       
  `;
    songUL.appendChild(li);

  }
  // attach evantlistner to each song
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(li => {
    li.addEventListener("click", () => {
      let name = li.querySelector(".info").firstElementChild.innerHTML.trim();
      let filename = name + ".mp3";  // ✅ Add ".mp3" if missing
      playMusic(filename);
      // currentSong = new Audio(`/songs/${filename}`);
    });
  });


  // Attach an evantlistner to Play, pause and previous song;
  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play()
      play.src = "pause.svg"
    }
    else {
      currentsong.pause()
      play.src = "play.svg"
    }
  })
  // listen for time update Evant
  currentsong.addEventListener("timeupdate", () => {
    if (!isNaN(currentsong.duration)) {
      document.querySelector(".songtime").innerHTML =
        `${secondsToMinuteSeconds(currentsong.currentTime)} / ${secondsToMinuteSeconds(currentsong.duration)}`;
    }
  });
}



