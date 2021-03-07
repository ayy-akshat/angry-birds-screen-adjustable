class Bird extends BaseClass
{
    constructor(x, y)
    {
        super(x, y, 100, 100);
        this.image = loadImage("sprites/bird.png");
        this.smokeImage = loadImage("sprites/smoke.png");
        this.smokes = [];
    }

    move()
    {
        var x;
        var y;

        x = 1600*mouseX/windowWidth;
        y = 800*mouseY/windowHeight;
        
        if (touches)
        {
            x = touches[0];
            y = touches[1];
            touches = null;
        }
        
        this.body.position.x = x;
        this.body.position.y = x;
    }

    smokeTrail()
    {
        if (this.body.speed > 5)
        {
            if (this.smokes.length > 0)
            {
                var dist = ((windowWidth+windowHeight)/2)*Math.sqrt(Math.pow(this.body.position.x - this.smokes[this.smokes.length-1].x, 2) + Math.pow(this.body.position.y - this.smokes[this.smokes.length-1].y, 2))/1600;
                if (dist > 50)
                {
                    this.smokes.push(
                        {
                            x:windowWidth*this.body.position.x/1600, 
                            y:windowHeight*this.body.position.y/800, 
                            size:1, 
                            tint:255
                        });
                }
            }
            else
            {
                this.smokes.push(
                    {
                        x:windowWidth*this.body.position.x/1600, 
                        y:windowHeight*this.body.position.y/800,
                        size:0.2, 
                        tint:255
                    });
            }
        }
        if (this.smokes.length > 10)
        {
            this.smokes.shift();
        }
        for (var i = 0; i < this.smokes.length; i++)
        {
        
            this.smokes[i].size+=0.02;
            this.smokes[i].tint-=3;
            push();
            tint(255, this.smokes[i].tint);
            image(this.smokeImage, this.smokes[i].x, this.smokes[i].y, this.smokes[i].size * 50, this.smokes[i].size * 50);
            pop();
        }
    }
}
