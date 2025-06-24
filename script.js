console.log("lets write the javascript")

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
async function main() {
    let songs = await getsongs()
    console.log(songs)

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> ${song} </li>`;
    }
    // play the first song
    var audio = new Audio(songs[1]);
    audio.play();

    audio.addEventListener("loadeddata", () => {
        let duration = (audio.duration, audio.currentSrc, audio.currentTime)
        console.log(duration)
        // The duration variable now holds the duration (in seconds) of the audio clip
    });
}

main()