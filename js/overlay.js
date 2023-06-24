music_sound = new Audio('audio/music.mp3');

function unMute() {
    music_sound.play();
    document.getElementById("soundMasterBnt").onclick = mute;
    document.getElementById("soundMasterBnt").children[0].src = "/img/11_overlay/volume.png";
}

function mute() {
    music_sound.pause();
    document.getElementById("soundMasterBnt").onclick = unMute;
    document.getElementById("soundMasterBnt").children[0].src = "img/11_overlay/mute.png";
}

function fullscreen() {
    canvasSec = document.getElementById("canvasSec")

    if (canvasSec.fullscreenElement === true) {
        document.exitFullscreen();
      } else {
        canvasSec.fullscreenElement = true;
        canvasSec.requestFullscreen();
      }
}

function goRight() {
    world.character.world.keyboard.RIGHT = true;
}

function stopRight() {
    world.character.world.keyboard.RIGHT = false;
}

function goleft() {
    world.character.world.keyboard.LEFT = true;
}

function stopleft() {
    world.character.world.keyboard.LEFT = false;
}

function goJump() {
    world.character.world.keyboard.SPACE = true;
    setTimeout(() => {
        world.character.world.keyboard.SPACE = false;
    }, 60);
}

function stopJump() {
    world.character.world.keyboard.SPACE = true;
}