class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280; 
    height = 150;
    width = 120;
    offsety = 0;



    
    // loadImage('img/test.png);
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="iamge" src>
        this.img.src = path;
    }
    

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
     */
     loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            debugger
            console.log(this.imageCache)
            console.warn(e)
        }
        
    }
}