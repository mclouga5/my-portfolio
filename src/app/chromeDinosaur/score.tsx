export default class Score {
    score: number = 0;
    HIGH_SCORE_KEY: string = "highScore";
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    scaleRatio: number;

    constructor(ctx: CanvasRenderingContext2D, scaleRatio: number) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
    }

    update(frameTimeDelta: number): void {
        this.score += frameTimeDelta * 0.01;
    }

    reset(): void {
        this.score = 0;
    }

    setHighScore(): void {
        const highScore: number = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        if (this.score > highScore) {
            localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score).toString());
        }
    }

    draw(): void {
        const highScore: number = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        const y: number = this.canvas.height - 6;

        const fontSize: number = 15 * this.scaleRatio;
        this.ctx.font = `${fontSize}px Lobster serif`;
        this.ctx.fillStyle = "#525250";
        const scoreX: number = this.canvas.width / 1.8;
        const highScoreX: number = scoreX / 1.5;

        const scorePadded: string = Math.floor(this.score).toString().padStart(6, '0');
        const highScorePadded: string = highScore.toString().padStart(6, '0');

        this.ctx.fillText(scorePadded, scoreX, y);
        this.ctx.fillText(`High Score: ${highScorePadded}`, highScoreX, y);
    }
}