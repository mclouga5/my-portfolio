import React from 'react';
import dinoRunImage1 from '/media/dinoRun1.png';
import dinoRunImage2 from '/media/dinoRun2.png';
import standingStill from '/media/standingStill.png';

export default class Player {
    WALK_ANIMATION_TIMER: number = 200;
    walkAnimationTimer: number = this.WALK_ANIMATION_TIMER;
    dinoRunImages: HTMLImageElement[] = [];

    jumpPressed: boolean = false;
    jumpInProgress: boolean = false;
    falling: boolean = false;
    JUMP_SPEED: number = 0.6;
    GRAVITY: number = 0.4;

    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    minJumpHeight: number;
    maxJumpHeight: number;
    scaleRatio: number;
    x: number;
    y: number;
    yStandingPosition: number;

    standingStillImage: HTMLImageElement;
    image: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, minJumpHeight: number, maxJumpHeight: number, scaleRatio: number) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 20 * scaleRatio;
        this.yStandingPosition = this.y;

        // Initialize images
        this.standingStillImage = new Image();
        this.standingStillImage.src = standingStill.src; 

        this.image = this.standingStillImage; // Set default image

        // Load running images
        this.dinoRunImages.push(this.createImage(dinoRunImage1));
        this.dinoRunImages.push(this.createImage(dinoRunImage2));

        // Add event listeners for jump
        this.addEventListeners();
    }

    createImage(src: { src: string; height: number; width: number }): HTMLImageElement {
        const img = new Image();
        img.src = src.src;
        return img;
    }

    addEventListeners() {
        window.addEventListener("mousedown", this.mousedown);
        window.addEventListener("mouseup", this.mouseup);
        window.addEventListener("touchstart", this.touchstart);
        window.addEventListener("touchend", this.touchend);
    }

    touchstart = (): void => {
        this.jumpPressed = true;
    };

    touchend = (): void => {
        this.jumpPressed = false;
    };

    mousedown = (): void => {
        this.jumpPressed = true;
    };

    mouseup = (): void => {
        this.jumpPressed = false;
    };

    update(gameSpeed: number, frameTimeDelta: number): void {
        this.run(gameSpeed, frameTimeDelta);

        if (this.jumpInProgress) {
            this.image = this.standingStillImage;
        }

        this.jump(frameTimeDelta);
    }

    jump(frameTimeDelta: number): void {
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }

        if (this.jumpInProgress && !this.falling) {
            if (
                this.y > this.canvas.height - this.minJumpHeight ||
                (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)
            ) {
                this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            } else {
                this.falling = true;
            }
        } else {
            if (this.y < this.yStandingPosition) {
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                if (this.y + this.height > this.canvas.height) {
                    this.y = this.yStandingPosition;
                }
            } else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    run(gameSpeed: number, frameTimeDelta: number): void {
        if (this.walkAnimationTimer <= 0) {
            this.image = this.image === this.dinoRunImages[0] ? this.dinoRunImages[1] : this.dinoRunImages[0];
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw(): void {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
