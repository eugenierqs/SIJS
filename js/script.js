var listFilm=document.querySelector(".list");
var player=document.querySelector(".playerContainer");
for(var i=0;i<data.films.length;i++){
  listFilm.innerHTML+='<li class="filmName">'+data.films[i].title+'</li>';
}
var link=document.querySelectorAll(".filmName");
for(let i=0;i<link.length;i++){
  link[i].addEventListener("click", function(){
    player.innerHTML='<video id="our-video" width="600" height="400" controls>'+
    '<source src="video/'+data.films[i].src+'" type="video/mp4">'+
    '</video>';
    var video=document.getElementById('our-video');
    video.play();
    listFilm.style.display="none";
  })
}
var btnPlay = document.querySelector('.play');
var btnPause = document.querySelector('.pause');
  btnPlay.addEventListener("click", function(){
    if(btnPlay.style.display==="block"){
      btnPause.style.display="block";
    }
  });
