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

const playMusic = (track) => {
  let audio = new Audio(`/songs/${track}`);  // ✅ Correct path
  console.log("Trying to play:", `/songs/${track}`);
  audio.play().catch(err => console.error("Audio play error:", err));
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});

async function main() {

  let currentsong;

  // Get the  list of all the  songs
  let songs = await getsongs();
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
    });
  });

}



