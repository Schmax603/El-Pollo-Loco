class ThrowableObject extends MovableObject {

    animateRotation = setInterval(() => {this.playAnimation(this.IMAGES_ROTATE);}, 50);
    otherDirection;

    IMAGES_KABOOM = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    world;
    throwInterval;
    
    throw_sound = new Audio('audio/throw.mp3');
    kaboom_sound = new Audio('audio/glass.mp3');

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.energy = 1
        this.loadImages(this.IMAGES_KABOOM);
        this.loadImages(this.IMAGES_ROTATE);
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throw_sound.play();
        this.otherDirection = world.character.otherDirection
        this.throwInterval =
        setInterval(() => {
            if (this.otherDirection == true) {
                this.x -= 15;
            } else {
                this.x += 15;
            }
        }, 25);

    }

    AnimateKaboom() {
        this.kaboom_sound.play();
        setInterval(() => {
            this.playAnimation(this.IMAGES_KABOOM);
        }, 200);
    }

}