const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const BOX_SIZE = 50;
const NUMBER_OF_BOXES = 13;
const BOX_STROKE = 2;

let boxes = [];
let t = 0;
let b;


function setup ()
{
    canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);
    background('gray');
    angleMode(RADIANS);

    let offset = (BOX_SIZE * NUMBER_OF_BOXES) / 2 - BOX_SIZE / 2;
    let colorIndexX = 0;
    let colorIndexY = 0;
    let offsetX = 0;

    for (let i = 0; i < NUMBER_OF_BOXES; i++) {
        boxes[i] = [];

        offsetX = abs(i - floor(NUMBER_OF_BOXES / 2)); 
        colorIndexX = floor(map(offsetX, 0, NUMBER_OF_BOXES / 2, 120, 60));

        for (let j = 0; j < NUMBER_OF_BOXES; j++) {
            offsetY = abs(j - floor(NUMBER_OF_BOXES / 2)); 
            colorIndexY = floor(map(offsetY, 0, NUMBER_OF_BOXES / 2, 200, 160));

            boxes[i].push(new Box(i * BOX_SIZE - offset,
                                  j * BOX_SIZE - offset,
                                  0,
                                  BOX_SIZE,
                                  BOX_SIZE,
                                  BOX_SIZE,
                                  color('rgb(' +
                                        str(colorIndexX) + ', ' +
                                        str(colorIndexX) + ',' + 
                                        str(colorIndexY) + ')')));
        }
    }

    frameRate(60);
}


function draw ()
{
    background('gray');

    ambientLight(100);
    pointLight(color('white'), 100, -100, -1);
    
    for (let i = 0; i < NUMBER_OF_BOXES; i++) {
        for (let j = 0; j < NUMBER_OF_BOXES; j++) {
            let phaseX = abs(i - (floor(NUMBER_OF_BOXES / 2)));
            let phaseY = abs(j - (floor(NUMBER_OF_BOXES / 2)));
            let phaseMultiplier = 0.4

            boxes[i][j].sizeZ = BOX_SIZE * 3 * (1.5 + sin(frameCount * 0.05 - phaseX * phaseMultiplier - phaseY * phaseMultiplier));
            boxes[i][j].display();
        }
    }
}



class Box {
    constructor (x, y, z, sizeX, sizeY, sizeZ, color)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sizeZ = sizeZ;
        this.color = color;
    }

    display ()
    {
        push();

        noStroke();
        ambientMaterial(this.color);

        rotateX(radians(50));
        rotateZ(radians(45));
        translate(-400, -400, -400);

        translate(this.x, this.y, this.z);
        box(this.sizeX, this.sizeY, this.sizeZ);
    
        pop();
    }
}
