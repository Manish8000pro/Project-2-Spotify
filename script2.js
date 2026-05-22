
console.log("lets write the javascript")

let isPlaying = false;
let currentsong = new Audio();
let songs = [];

// Convert seconds into mm:ss
function secondsToMinuteSeconds(seconds) {

  if (isNaN(seconds)) return "00:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Song List
// THIS IS THE ONE BY ONE SONG ADD , THIS WORK WITH THE ALL SERVERS  THIS WORK NETLYFY , VERSEL ETC
// async function getsongs() {

//   songs = [
//     "better-day-186374.mp3",
//     "alone-296348.mp3",
//     "flow-211881.mp3",
//     "brain-implant.mp3",
//     "solitude-dark.mp3"
//   ];

//   return songs;
// }

// HERE IS THE WAY TO CAME THE FOLDER COMPLETELY IN LIBRARY . THIS NOT WORK THE NETLYFY. VERSEL ETC SERVERS

// SONG LIST
// SONG LIST
async function getsongs() {

  let response = await fetch("songs/info.json");

  songs = await response.json();

  return songs;
}

// Play Music
const playMusic = (track, playNow = false) => {

  currentsong.src = `songs/${track}`;

  if (playNow) {

  currentsong.play()
    .then(() => {
      play.src = "pause.svg";
      isPlaying = true;
    })
    .catch(err => console.log(err));

}

  else {
    play.src = "play.svg";
    isPlaying = false;
  }

  document.querySelector(".songinfo").innerHTML =
    track.replace(".mp3", "").replace(".m4a", "")

  document.querySelector(".songtime").innerHTML =
    "00:00 / 00:00";
};

// MAIN FUNCTION
async function main() {

  // Get Songs
  songs = await getsongs();

  // Load First Song
  playMusic(songs[0]);

  // Show Songs in Library
  let songUL = document.querySelector(".songlist ul");

  for (const song of songs) {

    songUL.innerHTML += `
    
      <li>

        <img class="invert" src="music.svg" alt="">

        <div class="info">
          <div>${song.replace(".mp3", "")}</div>
          <div>Manish</div>
        </div>

        <div class="playnow">
          <span>Play Now</span>
          <img class="invert" src="play.svg" alt="">
        </div>

      </li>
    `;
  }

  // Play Song from Library
  Array.from(document.querySelectorAll(".songlist li")).forEach(li => {

    li.addEventListener("click", () => {

      let songName =
        li.querySelector(".info").firstElementChild.innerHTML.trim();

      let realSong = songs.find(song =>
  ${song.replace(".mp3", "").replace(".m4a", "")}
);

playMusic(realSong, true);

    });

  });

  // Play Pause Button
  play.addEventListener("click", () => {

    if (currentsong.paused) {

      currentsong.play();
      play.src = "pause.svg";

    }

    else {

      currentsong.pause();
      play.src = "play.svg";

    }

  });

  // Time Update
  currentsong.addEventListener("timeupdate", () => {

    document.querySelector(".songtime").innerHTML =

      `${secondsToMinuteSeconds(currentsong.currentTime)} /
       ${secondsToMinuteSeconds(currentsong.duration)}`;

    document.querySelector(".circle").style.left =
      (currentsong.currentTime / currentsong.duration) * 100 + "%";

  });

  // Seekbar
  document.querySelector(".seekbar").addEventListener("click", e => {

    let percent =
      (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    document.querySelector(".circle").style.left =
      percent + "%";

    currentsong.currentTime =
      ((currentsong.duration) * percent) / 100;

  });

  // Hamburger Menu
  document.querySelector(".hamburger").addEventListener("click", () => {

    document.querySelector(".left").style.left = "0";

  });

  // Close Sidebar
  document.querySelector(".close").addEventListener("click", () => {

    document.querySelector(".left").style.left = "-130%";

  });

  // NEXT SONG
  next.addEventListener("click", () => {

    let currentFilename = currentsong.src.split("/").pop();

    let index = songs.indexOf(currentFilename);

    if (index < songs.length - 1) {

      playMusic(songs[index + 1], true);

    }

    else {

      playMusic(songs[0], true);

    }

  });

  // PREVIOUS SONG
  previous.addEventListener("click", () => {

    let currentFilename = currentsong.src.split("/").pop();

    let index = songs.indexOf(currentFilename);

    if (index > 0) {

      playMusic(songs[index - 1], true);

    }

    else {

      playMusic(songs[songs.length - 1], true);

    }

  });

  // Volume Control
  // Volume Slider
let volumeSlider = document.querySelector(".range input");
let volumeIcon = document.querySelector(".volume img");

// Default Volume
currentsong.volume = 0.1;
volumeSlider.value = 10;

// Volume Change
volumeSlider.addEventListener("input", (e) => {

  let volumeValue = e.target.value;

  currentsong.volume = volumeValue / 100;

  // Change icon dynamically
  if (volumeValue == 0) {

    volumeIcon.src = "mute.svg";

  }

  else {

    volumeIcon.src = "volume.svg";

  }

});

// Mute / Unmute
volumeIcon.addEventListener("click", () => {

  if (currentsong.volume > 0) {

    // Mute
    currentsong.volume = 0;
    volumeSlider.value = 0;
    volumeIcon.src = "mute.svg";

  }

  else {

    // Restore volume
    currentsong.volume = 0.1;
    volumeSlider.value = 10;
    volumeIcon.src = "volume.svg";

  }

});

}

// Start App
main();



// console.log("lets write the javascript")
// let isPlaying = false;
// let currentsong = new Audio();

// let songs;

// function secondsToMinuteSeconds(seconds) {
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// }

// async function getsongs() {

//   songs = [
//     "better-day.mp3",
//     "alone-296348.mp3",
//     "flow.mp3"
//   ];

//   return songs;
// }


//   // let div = document.createElement("div")
//   // div.innerHTML = response;
//   // let as = div.getElementsByTagName("a")
//   // console.log(as)
//   // let songs = []
//   // for (let index = 0; index < as.length; index++) {
//   //   const element = as[index];
//   //   if (element.href.endsWith(".mp3")) {
//   //     songs.push(element.href)
//   //   }
//   // }
//   // return songs



// const playMusic = (track, pause = false) => {
//   // Stop the current song
//   currentsong.pause();
//   currentsong.currentTime = 0;

//   // Set the new song
//   currentsong.src = `songs/${track}`;
//   console.log(`${track}`);

//   // Play if not paused by user
//   if (pause !== false) {
//     currentsong.play();
//     play.src = "pause.svg";
//     isPlaying = true;
//   } else {
//     play.src = "play.svg";
//     isPlaying = false;
//   }

//   document.querySelector(".songinfo").innerHTML = decodeURI(track.replace(".mp3", ""));
//   document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
// };



// document.addEventListener("DOMContentLoaded", () => {
//   main();
// });

// async function main() {



//   // Get the  list of all the  songs
//   songs = await getsongs();
//   playMusic(songs[0], false);

//   console.log(songs);

//   // show all the song in playlist

//   let songUL = document.querySelector(".songlist ul");

//   for (const song of songs) {
//     let li = document.createElement("li");
//     // li.textContent = song.split("/songs/")[1].replace(".mp3", "");
//     li.innerHTML = `
//     <img class="invert" src="music.svg" alt="">
//                             <div class="info">
//                                 <div>${song.replace(".mp3", "")} </div>
//                                  <div>Manish</div>
//                             </div>
//                            <div class="playnow">
//                             <span>Play Now</span>
//                             <img class="invert" src="play.svg" alt="">
//                            </div>
                       
//   `;
//     songUL.appendChild(li);

//   }
//   // attach evantlistner to each song
//   Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(li => {
//     li.addEventListener("click", () => {
//       let name = li.querySelector(".info").firstElementChild.innerHTML.trim();
//       playMusic(name + ".mp3", true);
//       // currentSong = new Audio(`/songs/${filename}`);
//     });
//   });


//   // Attach an evantlistner to Play, pause and previous song;
//   play.addEventListener("click", () => {
//     if (currentsong.paused) {
//       currentsong.play()
//       play.src = "pause.svg"
//     }
//     else {
//       currentsong.pause()
//       play.src = "play.svg"

//     }

//   })
//   // listen for time update Evant
//   currentsong.addEventListener("timeupdate", () => {
//     if (!isNaN(currentsong.duration)) {
//       document.querySelector(".songtime").innerHTML =
//         `${secondsToMinuteSeconds(currentsong.currentTime)} / ${secondsToMinuteSeconds(currentsong.duration)}`;
//     }
//     document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
//   });

//   // add evantlistner to seekbar 
//   document.querySelector(".seekbar").addEventListener("click", e => {
//     let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//     document.querySelector(".circle").style.left = percent + "%";
//     currentsong.currentTime = ((currentsong.duration) * percent / 100)
//   })


//   // Add Event Listener for hamburger 

//   document.querySelector(".hamburger").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "0"
//   })

//   // Add Event Listener for close button
//   document.querySelector(".close").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "-130%"
//   })

//   // Add an Evant listener for previous

//   previous.addEventListener("click", () => {
//     console.log("previous clicked");
//     let currentFilename = currentsong.src.split("/").pop();
//     let filenames = songs.map(song => song.split("/").pop());
//     let index = filenames.indexOf(currentFilename);

//     if (index !== -1) {
//       let prevIndex = (index - 1 + filenames.length) % filenames.length;
//       let prevTrack = filenames[prevIndex];
//       playMusic(prevTrack, true);
//     } else {
//       console.error("Current song not found in list.");
//     }
//   });




//   // Add an Evant listener for next
//   next.addEventListener("click", () => {
//     console.log("next clicked");

//     // ✅ Extract current filename from the audio src
//     let currentFilename = currentsong.src.split("/").pop();

//     // ✅ Normalize songs list to just filenames
//     let filenames = songs.map(song => song.split("/").pop());

//     // ✅ Find index of current song
//     let index = filenames.indexOf(currentFilename);

//     if (index !== -1) {
//       // ✅ Calculate next song index (wrap around to 0 if at the end)
//       let nextIndex = (index + 1) % filenames.length;

//       // ✅ Get the filename of the next song
//       let nextTrack = filenames[nextIndex];

//       // ✅ Play it
//       playMusic(nextTrack, true);
//     } else {
//       console.error("Current song not found in list.");
//     }
//   });

//   // Add an event to volume

//   document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",
//     (e) => {
//       console.log("setting volume to", e, e.target, e.target.value, "/100")
//       currentsong.volume = parseInt(e.target.value) / 100
//       if(currentsong.volume>0){
//         document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
//       }
//     })
// }

// // Add an Evantlistener to mute track

// document.querySelector(".volume>img").addEventListener("click", e => {
//   console.log(e.target)
//   if (e.target.src.includes("volume.svg")) {
//     e.target.src = e.target.src.replace("volume.svg", "mute.svg")
//     currentsong.volume = 0;
//     document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
//   }
//   else {
//     e.target.src = e.target.src.replace("mute.svg", "volume.svg")
//     currentsong.volume = .1;
//     document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
//   }
// })