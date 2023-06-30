class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 1000;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }

    isColliding(obj) {
        return (this.x + this.width) >= obj.x &&
            this.x <= (obj.x + obj.width) &&
            this.y + this.height > obj.y
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    removeDeads() {
        let arr = world.level.enemies
        for (let i =  0; i < arr.length; i++) {
            console.log('arr[i]: ', arr[i]);
            //console.log('arr[i].isDead == true: ', arr[i].isDead() == true);
            if (arr[i].isDead() == true) {
                try {
                    delete arr[i]
                } catch (error) {
                    console.warn('error: ', error);
                    // https://tenor.com/view/what-kid-awkward-confused-gif-10267418 What?
                }

            }
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; =>  1, Rest 1 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveStop() {
        this.speed = 0
        this.x += this.speed;
    }

    jump() {
        this.speedY = 30;
    }

}

