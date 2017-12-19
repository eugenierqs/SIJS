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
      var playerContainer=document.querySelector(".playerContainer");
      var menu = document.querySelector(".vidMenu");
      var play = document.querySelector(".pause");
      var stop = document.querySelector(".stop");
      var fullscreen = document.querySelector(".fullScreen");
      var songBar=document.querySelector(".songBar");
      play.className = "pause";
      menu.style.display = "none";

      hoverVideo(player, menu);
      p = 1;
      p =stopVideo(stop, video, play, p);
      playPause(play, video, p);
      songBar.addEventListener("click", function(){
        video.volume=songBar.value*0.1;
      })
      video.addEventListener("timeupdate", function(){
        update(video);
        document.querySelector('#progressTime').textContent = formatTime(video.currentTime);

      });
      fullScreen(video, playerContainer, menu, fullscreen);
      player.addEventListener("mousemove", function(){
        setTimeout(function(){
          menu.style.display="none";
          player.addEventListener("mousemove", function(){
            menu.style.display="";
          });
        }, 3000);
      })
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
    '<img class="stop" src="img/stop.png">'+
    '<div class="progressContainer">'+
      '<div id="progressBarControl">'+
          '<div id="progressBar" onclick="clickProgress(our-video, this, event)"></div>'+
      '</div>'+
      '<span id="progressTime">00:00</span>'+
      '<span class="totalTime">'+data.films[c].duration+'</span>'+
      '</div>'+
      '<div class="songContainer">'+
      '<div class="songIconContainer"><img class="songIcon" src="img/son.png"></div>'+
      '<input class="songBar" type="range" min="0" max ="10" value="5" style="width=100px">'+
      '</div>'+
    '<img class="fullScreen" src="img/fullscreen.png">' +
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
  var container=document.querySelector(".containerAllVideo");
  return video;
}

function hoverVideo(player, menu) {
  player.addEventListener("mouseover", function() {
    menu.style.display = "";
    setTimeout(function(){
      menu.style.display="none";
      player.addEventListener("mousemove", function(){
        menu.style.display="";
      });
    }, 3000);
  });
  player.addEventListener("mouseout", function() {
    menu.style.display = "none";
  });
}

function playPause(play, video, p) {
  play.addEventListener("click", function() {
    var video = document.getElementById("our-video");
    if (p === 1) {
      play.className="play";
      video.pause();
      p = 0;
    } else {
      play.className="pause";
      video.play();
      p = 1;
    }
  });
}

function stopVideo(stop, video, play, p){
  stop.addEventListener("click", function(){
    video.currentTime=0;
    video.pause();
    play.className="play";
    p=0;
    return p;
  })
}

function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins  = Math.floor((time % 3600) / 60);
    var secs  = Math.floor(time % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }

        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return mins + ":" + secs; // mm:ss
    }
}

function update(player) {
    var duration = player.duration;    // Durée totale
    var time     = player.currentTime; // Temps écoulé
    var fraction = time / duration;
    var percent  = fraction * 100;

    var progress = document.querySelector('#progressBar');

    progress.style.width = percent + '%';
}

function fullScreen(video, playerContainer, menu, fullscreen) {
  var f = 1;
  var container=document.querySelector(".containerAllVideo");
  var description=document.querySelector(".describ");
  fullscreen.addEventListener("click", function() {
    video.classList.toggle("videoFullScreen");
    playerContainer.classList.toggle("playerContainerFullScreen");
    menu.classList.toggle("vidMenuFullScreen");
    container.classList.toggle("containerAllVideoFullScreen");
    var docElm = document.documentElement;
    if (f === 1) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      description.style.display="";
      f = 0;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      description.style.display="block";
      f = 1;
    }
    window.addEventListener("keydown", function(event) {
      if (event.which === 27) {
        video.className = "video";
        playerContainer.className="playerContainer";
        menu.className="vidMenu";
        container.className="containerAllVideo";
        description.style.display="block";
        f = 1;
      }
    });
  });
}
