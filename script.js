console.log("lets write the javascript")
let currentsong = new Audio();

let songs;

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
  // Stop the current song
  currentsong.pause();
  currentsong.currentTime = 0;

  // Set the new song
  currentsong.src = `/songs/${track}`;
  console.log(`${track}`);

  // Play if not paused by user
  if (pause !== false) {
    currentsong.play();
    play.src = "pause.svg";
    isPlaying = true;
  } else {
    play.src = "play.svg";
    isPlaying = false;
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track.replace(".mp3", ""));
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};



document.addEventListener("DOMContentLoaded", () => {
  main();
});

async function main() {



  // Get the  list of all the  songs
  songs = await getsongs();
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
    document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
  });

  // add evantlistner to seekbar 
  document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = ((currentsong.duration) * percent / 100)
  })


  // Add Event Listener for hamburger 

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0"
  })

  // Add Event Listener for close button
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-130%"
  })

  // Add an Evant listener for previous

  previous.addEventListener("click", () => {
  console.log("previous clicked");
  let currentFilename = currentsong.src.split("/").pop();
  let filenames = songs.map(song => song.split("/").pop());
  let index = filenames.indexOf(currentFilename);

  if (index !== -1) {
    let prevIndex = (index - 1 + filenames.length) % filenames.length;
    let prevTrack = filenames[prevIndex];
    playMusic(prevTrack, true);
  } else {
    console.error("Current song not found in list.");
  }
});

  


  // Add an Evant listener for next
  next.addEventListener("click", () => {
  console.log("next clicked");

  // ✅ Extract current filename from the audio src
  let currentFilename = currentsong.src.split("/").pop();

  // ✅ Normalize songs list to just filenames
  let filenames = songs.map(song => song.split("/").pop());

  // ✅ Find index of current song
  let index = filenames.indexOf(currentFilename);

  if (index !== -1) {
    // ✅ Calculate next song index (wrap around to 0 if at the end)
    let nextIndex = (index + 1) % filenames.length;

    // ✅ Get the filename of the next song
    let nextTrack = filenames[nextIndex];

    // ✅ Play it
    playMusic(nextTrack, true);
  } else {
    console.error("Current song not found in list.");
  }
});

// Add an event to volume

  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",
    (e)=>{
      console.log("setting volume to", e,e.target,e.target.value)
      currentsong.volume = parseInt(e.target.value)/100
    })
}
