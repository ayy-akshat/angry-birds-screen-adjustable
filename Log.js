class Log extends BaseClass
{
    constructor(x, y, length, angle)
    {
        super(x, y, 25, length);
        Matter.Body.setAngle(this.body, angle);
        this.image = loadImage("sprites/wood2.png");
        this.initialAngle = angle;
    }

    resetPosition()
    {
        super.resetPosition();
        Matter.Body.setAngle(this.body, this.initialAngle);
    }
}