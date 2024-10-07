import Cactus from "./cactus";

export default class CactiController {
  CACTUS_INTERVAL_MIN: number = 500;
  CACTUS_INTERVAL_MAX: number = 2000;

  nextCactusInterval: number | null = null;
  cacti: Cactus[] = [];
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  cactiImages: { width: number; height: number; image: HTMLImageElement }[];
  scaleRatio: number;
  speed: number;

  constructor(ctx: CanvasRenderingContext2D, cactiImages: { width: number; height: number; image: HTMLImageElement }[], scaleRatio: number, speed: number) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.cactiImages = cactiImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextCactusTime();
  }

  setNextCactusTime(): void {
    const num: number = this.getRandomNumber(
      this.CACTUS_INTERVAL_MIN,
      this.CACTUS_INTERVAL_MAX
    );

    this.nextCactusInterval = num;
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createCactus(): void {
    const index: number = this.getRandomNumber(0, this.cactiImages.length - 1);
    const cactusImage = this.cactiImages[index];
    const x: number = this.canvas.width * 1.5;
    const y: number = this.canvas.height - cactusImage.height;
    const cactus: Cactus = new Cactus(
      this.ctx,
      x,
      y,
      cactusImage.width,
      cactusImage.height,
      cactusImage.image
    );

    this.cacti.push(cactus);
  }

  update(gameSpeed: number, frameTimeDelta: number): void {
    if (this.nextCactusInterval !== null && this.nextCactusInterval <= 0) {
      this.createCactus();
      this.setNextCactusTime();
    }
    if (this.nextCactusInterval !== null) {
      this.nextCactusInterval -= frameTimeDelta;
    }

    this.cacti.forEach((cactus) => {
      cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    this.cacti = this.cacti.filter((cactus) => cactus.x > -cactus.width);
  }

  draw(): void {
    this.cacti.forEach((cactus) => cactus.draw());
  }

  collideWith(sprite: any): boolean {
    return this.cacti.some((cactus) => cactus.collideWith(sprite));
  }

  reset(): void {
    this.cacti = [];
  }
}