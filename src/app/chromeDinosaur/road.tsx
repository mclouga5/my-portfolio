'use client'

export default class Ground {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    speed: number;
    scaleRatio: number;
    x: number;
    y: number;
    groundImage: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, speed: number, scaleRatio: number) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.scaleRatio = scaleRatio;

        this.x = 0;
        this.y = this.canvas.height - this.height - 50;

        this.groundImage = new Image();
        this.groundImage.src = "media/road.png";
    }

    update(gameSpeed: number, frameTimeDelta: number): void {
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
    }

    draw(): void {
        this.ctx.drawImage(
            this.groundImage,
            this.x,
            this.y,
            this.width,
            this.height
        );

        this.ctx.drawImage(
            this.groundImage,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        );

        if (this.x < -this.width) {
            this.x = 0;
        }
    }

    reset(): void {
        this.x = 0;
    }
}