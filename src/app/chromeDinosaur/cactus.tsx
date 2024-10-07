export default class Cactus {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, image: HTMLImageElement) {
        this.ctx = ctx;
        this.x = x;
        this.y = y - 50;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    update(speed: number, gameSpeed: number, frameTimeDelta: number, scaleRatio: number): void {
        this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
    }

    draw(): void {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWith(sprite: { x: number; y: number; width: number; height: number }): boolean {
        const adjustBy: number = 1.4;
        if (
            sprite.x < this.x + this.width / adjustBy &&
            sprite.x + sprite.width / adjustBy > this.x &&
            sprite.y < this.y + this.height / adjustBy &&
            sprite.height + sprite.y / adjustBy > this.y
        ) {
            return true;
        } else {
            return false;
        }
    }
}