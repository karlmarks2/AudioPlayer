//HTML документ загрузился и дерево DOM построено - можно подписываться на события
document.addEventListener("DOMContentLoaded", subscribeToEvents);
function subscribeToEvents(event) {
    var elmSong = document.getElementById('song'); //audio element
    var elmPlayPause = document.getElementById('btn-play-pause'); //div element с id='btn-play-pause'
    var elmDownLoad = document.getElementById('btn-download'); //div element с id='btn-download'
    var elmUpLoad = document.getElementById('btn-upload'); //div element с id='btn-upload'
    var elmSpeaker = document.getElementById('btn-speaker'); //div element с id='btn-speaker'
    var elmTrackTime = document.getElementById('track-time'); //div element с id='track-time'
    var elmTrackSlider = document.getElementById('track-slider'); //div element с id='track-slider'
    var elmTimePassed = document.getElementById('time-passed');
    var elmTimeElasted = document.getElementById('time-elasted');  
    var songDuration; // Duration of song clip
    
    // handler clickElmSong event listenter   
    elmPlayPause.addEventListener("click", function(event){
        console.log(elmSong.paused);       
        if (elmSong.paused) { // start song
            elmSong.play();
            // remove play, add pause
             elmPlayPause.className = "";
             elmPlayPause.className = "btn-pause btn-all";
        }else { // pause song
             elmSong.pause();
             // remove pause, add play
             elmPlayPause.className = "";
             elmPlayPause.className = "btn-play btn-all";
        }
    })
    // handler clickElmDownLoad event listenter   
    elmDownLoad.addEventListener("click", function(event){
        console.log('Pressed click on button DownLoad');       
    })
    // handler clickElmUpLoad event listenter   
    elmUpLoad.addEventListener("click", function(event){
        console.log('Pressed click on button UpLoad');    
    })
    // handler clickElmSpeaker event listenter   
    elmSpeaker.addEventListener("click", function(event){
        console.log('Pressed click on button Speaker');    
    })
    // handler clickElmTrackTime event listenter   
    elmTrackTime.addEventListener("click", function(event){
        console.log('Pressed click on track time'); 
        // moveplayhead(event);
        //elmSong.currentTime = songDuration * clickPercent(event);
        // timeline.addEventListener("click", function(event) {
        //     moveplayhead(event);
        //     elmSong.currentTime = songDuration * clickPercent(event);
        // }, false);
        
    })
    // handler clickElmTrackSlider event listenter   
    elmTrackSlider.addEventListener("click", function(event){
        console.log('Pressed click on track slider');    
    }) 
    // getSongDuration event listenter   
    elmSong.addEventListener("canplaythrough", function(event){
        songDuration = elmSong.duration;
        elmTimePassed.textContent=0.00;
        elmTimeElasted.textContent=songDuration;
        //console.log(`songDuration=${songDuration}`);    
    },false) 
    // getSongTimeUpdate event listenter   
    elmSong.addEventListener("timeupdate", function(event){
        let currentTime = elmSong.currentTime;
        //console.log(`currentTime=${currentTime}`)
        let delta = elmTrackTime.offsetWidth - elmTrackSlider.offsetWidth;
        let playPercent = delta * (elmSong.currentTime / songDuration);
        elmTrackSlider.style.marginLeft = playPercent + "px";  
        elmTimePassed.textContent = currentTime;
        elmTimeElasted.textContent = songDuration-currentTime;
        if (elmSong.currentTime == songDuration) {
            elmPlayPause.className = "";
            elmPlayPause.className = "btn-play btn-all";
        }    
    }, false);

function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;

}
function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}

    }
