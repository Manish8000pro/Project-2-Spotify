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
      songs.push(element.href.split("/song")[1])
    }
  }
  return songs
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});

async function main() {
  let songs = await getsongs();
  console.log(songs);

  let songUL = document.querySelector(".songlist ul");

  for (const song of songs) {
    let li = document.createElement("li");
    li.textContent = song;
    songUL.appendChild(li);


  }

  let audio = new Audio(songs[0]);
  audio.play();
  audio.addEventListener("loadeddata", () => {
    console.log(audio.duration, audio.currentSrc, audio.currentTime);
  });
}




