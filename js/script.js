var listFilm=document.querySelector(".list");
var player=document.querySelector(".playerContainer");
for(var i=0;i<data.films.length;i++){
  listFilm.innerHTML+='<li class="filmName">'+data.films[i].title+'</li>';
}
var link=document.querySelectorAll(".filmName");
var p=1

for(let i=0;i<link.length;i++){
  link[i].addEventListener("click", function(){
    player.innerHTML='<video id="our-video" width="600" height="400">'+
    '<source src="video/'+data.films[i].src+'" type="video/mp4">'+
    '</video>'+
    '<nav class="vidMenu">'+
    '<button class="pause"></button>'+
    '</nav>';
    var video=document.getElementById('our-video');
    video.play();
    p=1;
    var menu=document.querySelector(".vidMenu");
    var play = document.querySelector(".pause");
    play.className="pause";
    menu.style.display="none";

    player.addEventListener("mouseover", function(){
      menu.style.display="";
    });
    player.addEventListener("mouseout", function(){
      menu.style.display="none";
    });
    play.addEventListener("click", function(){
      play.classList.toggle("play");
      var video=document.getElementById("our-video");
      if(p===1){
        video.pause();
        p=0;
      }
      else{
        video.play();
        p=1;
      }
    });
  })
}
