console.log("Lets write the javascript");

let currentsong = new Audio();
let songs = [];

// Convert seconds to mm:ss
function secondsToMinuteSeconds(seconds) {

    if (isNaN(seconds)) return "00:00";

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Get Songs from info.json
async function getsongs() {

    let response = await fetch("songs/info.json");

    songs = await response.json();

    return songs;
}

// Play Music
const playMusic = (track, pause = false) => {

    currentsong.src = `songs/${track}`;

    if (!pause) {
        currentsong.play();
        play.src = "pause.svg";
    }

    document.querySelector(".songinfo").innerHTML =
        decodeURI(track)
            .replace(".mp3", "")
            .replace(".m4a", "");

    document.querySelector(".songtime").innerHTML =
        "00:00 / 00:00";
};

async function main() {

    // Get songs
    songs = await getsongs();

    console.log(songs);

    // Load first song without autoplay
    playMusic(songs[0], true);

    // Show all songs in library
    let songUL = document.querySelector(".songlist ul");

    songUL.innerHTML = "";

    for (const song of songs) {

        songUL.innerHTML += `
        
        <li data-song="${song}">

            <img class="invert" src="music.svg" alt="">

            <div class="info">
                <div>
                    ${decodeURI(song)
                        .replace(".mp3", "")
                        .replace(".m4a", "")}
                </div>

                <div>Manish</div>
            </div>

            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play.svg" alt="">
            </div>

        </li>
        `;
    }

    // Play song from library
    Array.from(document.querySelectorAll(".songlist li")).forEach(li => {

        li.addEventListener("click", () => {

            let song = li.getAttribute("data-song");

            playMusic(song);
        });
    });

    // Play / Pause button
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

    // Time update
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

        document.querySelector(".circle").style.left = percent + "%";

        currentsong.currentTime =
            (currentsong.duration * percent) / 100;
    });

    // Hamburger menu
    document.querySelector(".hamburger").addEventListener("click", () => {

        document.querySelector(".left").style.left = "0";
    });

    // Close sidebar
    document.querySelector(".close").addEventListener("click", () => {

        document.querySelector(".left").style.left = "-130%";
    });

    // Next song
   next.addEventListener("click", () => {

    let currentSong = decodeURIComponent(currentsong.src.split("/").pop());

    let index = songs.indexOf(currentSong);

    if (index !== -1) {

        let nextIndex = (index + 1) % songs.length;

        playMusic(songs[nextIndex]);
    }
});

    // Previous song
    previous.addEventListener("click", () => {

    let currentSong = decodeURIComponent(currentsong.src.split("/").pop());

    let index = songs.indexOf(currentSong);

    if (index !== -1) {

        let prevIndex = (index - 1 + songs.length) % songs.length;

        playMusic(songs[prevIndex]);
    }
});

    // Volume
    let volumeSlider = document.querySelector(".range input");

    let volumeIcon = document.querySelector(".volume img");

    // Default volume
    currentsong.volume = 0.1;
    volumeSlider.value = 10;

    // Change volume
    volumeSlider.addEventListener("input", (e) => {

        let volume = e.target.value;

        currentsong.volume = volume / 100;

        if (volume == 0) {

            volumeIcon.src = "mute.svg";

        }

        else {

            volumeIcon.src = "volume.svg";
        }
    });

    // Mute / Unmute
    volumeIcon.addEventListener("click", () => {

        if (currentsong.volume > 0) {

            currentsong.volume = 0;

            volumeSlider.value = 0;

            volumeIcon.src = "mute.svg";
        }

        else {

            currentsong.volume = 0.1;

            volumeSlider.value = 10;

            volumeIcon.src = "volume.svg";
        }
    });

}

// Start App
main();