class Pig extends BaseClass
{
    constructor(x, y)
    {
        super(x, y, 100, 100);
        this.image = loadImage("sprites/enemy.png");
        this.opacity = 255;
    }

    display()
    {
        if (this.body.speed < 2.5)
        {
            super.display();
            this.opacity = 255;
        }
        else
        {
            World.remove(world, this.body);
            this.opacity-=5;
            push();
            tint(255, this.opacity);
            translate(windowWidth*this.body.position.x/1600, windowHeight*this.body.position.y/800);
            rotate(this.body.angle);
            image(this.image, 0, 0, windowWidth*this.width/1600, windowHeight*this.height/800);
            pop();
        }
        if (this.opacity == 250)
        {
            score += 100;
        }
    }
}