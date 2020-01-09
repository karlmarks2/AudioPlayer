
document.addEventListener("DOMContentLoaded", subscribeToEvents); //HTML документ загрузился и DOM 
function subscribeToEvents(event) { //+ построен - можно подписываться на события
    let elmSong = document.getElementById('song'); //audio element
    let elmPlayPause = document.getElementById('btn-play-pause');
    let elmDownLoad = document.getElementById('btn-download');
    let elmUpLoad = document.getElementById('btn-upload');
    let elmPlaySpeed = document.getElementById('play-speed');
    //-------------------------------------------------
    let elmsLi = document.getElementsByTagName('li');   
    for ( let i = 0; i < elmsLi.length; i++ ) {
        elmsLi[i].addEventListener("click", clickElmsLi)
        };
    //-------------------------------------------------
    let elmSpeaker = document.getElementById('btn-speaker');
    let elmTrackTime = document.getElementById('track-time'); //visual track-time song play 
    let elmTrackSlider = document.getElementById('track-slider'); //track-slider (polzunok) 
    let elmTimePassed = document.getElementById('time-passed'); //time-passed song play
    let elmTimeElasted = document.getElementById('time-elasted'); //time-elasted song play 
    let songDuration; //duration of song clip
	let visualTrackLen = elmTrackTime.offsetWidth - elmTrackSlider.offsetWidth;
	// console.log(`
	// 	visualTrackLen=${visualTrackLen}, 
	// 	elmTrackTimeWidth=${elmTrackTime.offsetWidth},
	// 	elmTrackSliderWidth=${elmTrackSlider.offsetWidth}
    // 		`);   
    // --------------------------------------------
    // handler clickElmSong event
    //---------------------------------------------
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
    // --------------------------------------------
    // handler clickElmDownLoad event
    // --------------------------------------------
    elmDownLoad.addEventListener("click", function(event){
        console.log('Pressed click on button DownLoad');       
    })
    // --------------------------------------------
    // handler clickElmUpLoad event
    // --------------------------------------------  
    elmUpLoad.addEventListener("click", function(event){
        console.log('Pressed click on button UpLoad');    
    })
    // --------------------------------------------
    // handler clickElmPlaySpeed event ++++++++++++
    // --------------------------------------------  
    elmPlaySpeed.addEventListener("click", function(event){
        console.log('Pressed click on elememt play-speed'); 
        let elmPlaySpeedMenu = document.getElementById('play-speed-menu'); 
        elmPlaySpeedMenu.classList.toggle('open');
    })
    // --------------------------------------------
    // handler clickElmsLI event ++++++++++++
    // --------------------------------------------
    function clickElmsLi(event) {
        let elmLi = document.getElementById(this.id);
        console.log(`Pressed click on elememts li, ${elmLi.id}`);
        console.log(elmLi.textContent);
        elmPlaySpeed.textContent = elmLi.textContent + 'x';
        elmSong.playbackRate = elmLi.textContent;
    }
    // --------------------------------------------
    // handler clickElmSpeaker event
    // -------------------------------------------- 
    elmSpeaker.addEventListener("click", function(event){
        console.log('Pressed click on button Speaker');    
    })
    // --------------------------------------------
    // handler clickElmTrackTime event 
    // --------------------------------------------  
    elmTrackTime.addEventListener("click", function(event){
        console.log('Pressed click on track time');		
	    let songRestTimePlay = (event.clientX - elmTrackTime.getBoundingClientRect().left) / visualTrackLen	
        elmSong.currentTime = songDuration * songRestTimePlay;       
    })
    // --------------------------------------------
    // handler clickElmTrackSlider event (not used)
    // --------------------------------------------  
    // elmTrackSlider.addEventListener("click", function(event){
    //     console.log('Pressed click on track slider');    
    // }) 
    // --------------------------------------------
    // handler canplaythroughElmSong event
    // --------------------------------------------  
    elmSong.addEventListener("canplaythrough", function(event){
        songDuration = elmSong.duration;
        elmTimePassed.textContent=0.00;
        elmTimeElasted.textContent=songDuration;
        //console.log(`songDuration=${songDuration}`);    
    },false) 
    // --------------------------------------------
    // handler timeUpdateElmSong event  
    // -------------------------------------------- 
    elmSong.addEventListener("timeupdate", function(event){
        let currentTime = elmSong.currentTime;
        //console.log(`currentTime=${currentTime}`)
        let songRestTimePlay = visualTrackLen * (elmSong.currentTime / songDuration);
        elmTrackSlider.style.marginLeft = songRestTimePlay + "px";  
        elmTimePassed.textContent = currentTime;
        elmTimeElasted.textContent = songDuration-currentTime;
        if (elmSong.currentTime == songDuration) {
            elmPlayPause.className = "";
            elmPlayPause.className = "btn-play btn-all";
        }    
    }, false);
}
