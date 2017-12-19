var listAllFilm = document.querySelector(".listAll");
var player = document.querySelector(".playerContainer");
var textDescription = document.querySelector(".describ");
var menuItem = document.querySelectorAll(".menuItem");

for(let e=0;e<menuItem.length;e++){
  menuItem[e].addEventListener("click", function(){
    categoryChoice(listAllFilm, e);
    videoChoice();
  });
}

function categoryChoice(listAllFilm, e){
  listAllFilm.innerHTML="";
  if(e===1){
    var text='Action';
  }
  else if(e===2){
    var text='Animation';
  }
  else if(e===3){
    var text='Comedy';
  }
  else if(e===4){
    var text='Horror / Thriller';
  }
  else{
    var text='All';
  }
  for(i=0;i<data.films.length;i++){
    if(text==='All'){
      listAllFilm.innerHTML+='<li class="filmName">'+data.films[i].title+'</li>';
    }
    else{
      if(data.films[i].category===text){
        listAllFilm.innerHTML+='<li class="filmName">'+data.films[i].title+'</li>';
      }
    }
  }
}

function videoChoice(){
  var link = document.querySelectorAll(".filmName");
  var p = 1
  for (let i = 0; i < link.length; i++) {
    link[i].addEventListener("click", function() {

      var c = compare(link[i]);
      var video = videoCreate(player, textDescription, c);

      var menu = document.querySelector(".vidMenu");
      var play = document.querySelector(".pause");
      var fullscreen = document.querySelector(".fullScreen");
      play.className = "pause";
      menu.style.display = "none";

      hoverVideo(player, menu);
      p = 1;
      playPause(play, video, p);
      fullScreen(video, fullscreen);
    });
  }
}

function compare(text) {
  for (i = 0; i < data.films.length; i++) {
    if (text.innerText === data.films[i].title) {
      return i;
    }
  }
}

function videoCreate(player, textDescription, c) {
  player.innerHTML = '<video id="our-video" class="video">' +
    '<source src="video/' + data.films[c].src + '" type="video/mp4">' +
    '</video>' +
    '<nav class="vidMenu">' +
    '<button class="pause"></button>' +
    '<button class="fullScreen"><img class="fullScreenSkin" src="img/video-focus.png"></button>' +
    '</nav>';
  textDescription.style.display = "block";
  textDescription.innerHTML = '<h2 class="videoTitle">' + data.films[c].title + '</h2>' +
    '<h3 class="videoAuthor">' + data.films[c].author + '</h3>' +
    '<h3 class="videoAuthor">' + data.films[c].year + '</h3>' +
    '<p class="videoDescription">' + data.films[c].description + '</p>'+
    '<div class="ratingContainer"></div>';
  var rating=document.querySelector(".ratingContainer");
  for (var a=0;a<data.films[c].rating;a++){
    rating.innerHTML+='*';
  }
  for (var a=0;a<(5-data.films[c].rating);a++){
    rating.innerHTML+='b';
  }
  var video = document.getElementById('our-video');
  video.play();
  return video;
}

function hoverVideo(player, menu) {
  player.addEventListener("mouseover", function() {
    menu.style.display = "";
  });
  player.addEventListener("mouseout", function() {
    menu.style.display = "none";
  });
}

function playPause(play, video, p) {
  play.addEventListener("click", function() {
    play.classList.toggle("play");
    var video = document.getElementById("our-video");
    if (p === 1) {
      video.pause();
      p = 0;
    } else {
      video.play();
      p = 1;
    }
  });
}

function fullScreen(video, fullscreen) {
  var f = 1;
  fullscreen.addEventListener("click", function() {
    video.classList.toggle("videoFullScreen");
    var docElm = document.documentElement;
    if (f === 1) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      f = 0;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      f = 1;
    }
    window.addEventListener("keydown", function(event) {
      if (event.which === 27) {
        video.className = "video";
        f = 1;
      }
    });
  });
}
