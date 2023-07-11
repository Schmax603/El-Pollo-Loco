class Character extends MovableObject {

    height = 250;
    y = 150;
    speed = 5;
    isHurting = false
    deadhasbeninrun = 0
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-31.png'
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30
    }

    charAnimateInt;
    world;


    jump_sound = new Audio('audio/jump.mp3');

    running_sound = new Audio('audio/running.mp3');
    deadhasbeninrun = false



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.dead()
    }


    animate() {
        this.charAnimateInt =
            setInterval(() => {
                this.running_sound.pause();
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    if (this.world.keyboard.SPACE == false && !this.isAboveGround()) {
                        this.running_sound.play();
                    }
                }

                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();

                    if (this.world.keyboard.SPACE == false && !this.isAboveGround()) {
                        this.running_sound.play();
                    }
                    this.otherDirection = true;
                }

                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                }

                this.world.camera_x = -this.x + 100;
            }, 1000 / 144);


        setInterval(() => {
            if (!this.isDead()) {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.isAboveGround()) {
                    this.setPath();
                } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
        setInterval(() => {
            if (!this.isDead()) {
                if (this.world.keyboard.timeSinceLastInput < -0 && this.world.keyboard.timeSinceLastInput > -9) {
                    this.playAnimation(this.IMAGES_STANDING);
                } else if (this.world.keyboard.timeSinceLastInput < -10) {
                    this.playAnimation(this.IMAGES_SLEEP);
                }
            }
        }, 200);
    }

    dead() {
        setInterval(() => {
            if (this.isDead() && this.deadhasbeninrun < 5) {
                clearInterval(this.charAnimateInt)
                this.playAnimation(this.IMAGES_DEAD)
                this.deadhasbeninrun ++
            }
        }, 100);
    }

    jump() {
        this.speedY = 30;
        this.jump_sound.play();
    }

    setPath() {
        let path = this.IMAGES_JUMPING[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.y > 175) {
            return 7;
        } else if (this.y > 147) {
            return 6;
        } else if (this.y > 119) {
            return 5;
        } else if (this.y > 91) {
            return 4;
        } else if (this.y > 63) {
            return 3;
        } else if (this.y > 35) {
            return 2;
        } else {
            return 1;
        }
    }
}