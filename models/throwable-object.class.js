class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 20;

    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.x = 100;
        this.y = 300;
        this.height = 60;
        this.width = 50;
        this.trow(100, 300);
    }

    trow(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() =>{
            console.log("y",this.y)
            console.log("x",this.x)
            this.x += 10;
        }, 25);
    }
}