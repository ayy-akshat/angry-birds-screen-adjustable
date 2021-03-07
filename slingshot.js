class Slingshot {

    constructor(body, length, strength, bodyOffset, point) {
        var conOpt =
        {
            bodyA: body,
            length: length,
            stiffness: strength,
            pointA: bodyOffset,
            pointB: point
        }

        this.bodyReleased = false;
        this.point = point;
        this.constraint = Constraint.create(conOpt);
        this.sling1 = loadImage("sprites/sling1.png");
        this.sling2 = loadImage("sprites/sling2.png");
        this.sling3 = loadImage("sprites/sling3.png");
        World.add(world, this.constraint);
    }

    drawLine(color, width)
    {
        if (this.constraint.bodyA == null) { return; }
        push();
        stroke(color);
        strokeWeight(width);
        
        var body1ConPos = {x:windowWidth*(this.constraint.bodyA.position.x + this.constraint.pointA.x)/1600, y:windowHeight*(this.constraint.bodyA.position.y + this.constraint.pointA.y)/800};
        var point = {x:windowWidth*this.point.x/1600, y:windowHeight*this.point.y/800};

        if (this.constraint.bodyA.position.x > this.point.x)
        {
            strokeWeight(width/2);
            line(body1ConPos.x+45, body1ConPos.y+10, point.x-20, point.y);
            line(body1ConPos.x+45, body1ConPos.y+10, point.x+45, point.y);
            image(this.sling3, body1ConPos.x+50, body1ConPos.y+10, 25, 30);
        }
        else
        {
            strokeWeight(width*1.5);
            line(body1ConPos.x-35, body1ConPos.y, point.x-20, point.y);
            line(body1ConPos.x-35, body1ConPos.y, point.x+45, point.y);
            image(this.sling3, body1ConPos.x-40, body1ConPos.y, 25, 30);
        }

        image
        pop();
    }

    drawCatapult()
    {
        image(this.sling1, windowWidth*(this.point.x + 30)/1600, windowHeight*(this.point.y + 105)/800, windowWidth*(this.sling1.width * 1.5)/1600, windowHeight*(this.sling1.height * 1.5)/800);
        image(this.sling2, windowWidth*(this.point.x - 9)/1600, windowHeight*(this.point.y + 37.5)/800, windowWidth*(this.sling2.width * 1.5)/1600, windowHeight*(this.sling2.height * 1.5)/800);
    }
    
    drawPoints(size, point1color, point2color)
    {
        if (this.constraint.bodyA == null) { return; }
        var body1ConPos = {x:this.constraint.bodyA.position.x + this.constraint.pointA.x, y:this.constraint.bodyA.position.y + this.constraint.pointA.y};

        push();
        strokeWeight(size);
        stroke(point1color);
        point(body1ConPos.x, body1ConPos.y);
        stroke(point2color)
        point(this.point.x, this.point.y);
        pop();
    }

    shootBody()
    {
        this.bodyReleased = true;
        this.constraint.bodyA = null;
    }

    resetBody(body)
    {
        this.bodyReleased = false;
        this.constraint.bodyA = body;
        Matter.Body.setAngularVelocity(body, 0);
        Matter.Body.setAngle(body, 0);
        Matter.Body.setPosition(body, {x:this.point.x, y:this.point.y});
    }
}