var music_player = null;
SC.initialize({
  client_id: 'f665fc458615b821cdf1a26b6d1657f6'
})


// defining the physical buttons of your jukebox
var x = document.getElementById('btn1');
var search = document.getElementById('search');
var genre = document.getElementById('genre');
var pauseSong = document.getElementById('btn2');
// // how jhukebox will display to the viewer
var music_list = document.getElementById('response');
// var music_player = document.getElementById('player');
// var displaybox = document.getElementById('displaybox');
// var displaybox2 = document.getElementById('displaybox2');
// var displaybox3 = document.getElementById('displaybox3');
// var displaybox4 = document.getElementById('displaybox4');
/////////////////////////////////////////////////////////////
class Jukebox {
  constructor() {}
  playSong() {
    music_player.play()
  }
  pauseSong() {
    music_player.pause();
  }
  stopSong() {}

  getSong() {
    // SC searching for tracks correlating with genre choice
    SC.get("/tracks/", {
      // loading up the song
      q: genre.value
    }).then(function(response) {
      music_list = response
      SC.stream("/tracks/" + response[0].id).then(function(player) {
        console.log(response[0])
        music_player = player;
        displaybox.innerHTML = `<a href='${response[0].user.permalink_url}'>${response[0].user.username}</a>`
        displaybox2.innerHTML = `<a href='${response[0].permalink_url}'>${response[0].title}</a>`;
        displaybox3.innerHTML = response[0].genre;
        displaybox4.innerHTML = response[0].description;
        this.playSong();
      });
    });
  }
}
var jukebox = new Jukebox();

// x acting as a variable

x.addEventListener('click', function() {

  // basketball is the test word to see if the code is working
  console.log('please work')
  jukebox.playSong();
});
// inserting physical pause ability with the click function
pauseSong.addEventListener('click', function() {
  jukebox.pauseSong();
});

// inserting physical pause ability with the click function
search.addEventListener('click', function() {
  jukebox.getSong();
});