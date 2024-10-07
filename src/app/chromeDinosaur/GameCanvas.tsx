'use client'

import React, { useEffect, useRef } from 'react';
import CactiController from './cactiController';
import Player from './player';
import Ground from './road';
import Score from './score';

const GAME_SPEED_START: number = 0.7;
const GAME_SPEED_INCREMENT: number = 0.00001;

const GAME_WIDTH: number = 800;
const GAME_HEIGHT: number = 200;
const PLAYER_WIDTH: number = 88 / 1.5;
const PLAYER_HEIGHT: number = 94 / 1.5;
const MAX_JUMP_HEIGHT: number = GAME_HEIGHT;
const MIN_JUMP_HEIGHT: number = 150;
const GROUND_WIDTH: number = 2400;
const GROUND_HEIGHT: number = 24;
const GROUND_AND_CACTUS_SPEED: number = 0.5;

interface CactusConfig {
  width: number;
  height: number;
  image: string;
}

const CACTI_CONFIG: CactusConfig[] = [
  { width: 48 / 1.5, height: 100 / 1.5, image: "media/cactus_1.png" },
  { width: 98 / 1.5, height: 100 / 1.5, image: "media/cactus_2.png" },
  { width: 68 / 1.5, height: 70 / 1.5, image: "media/cactus_3.png" },
];

const GameCanvas = () => {
  // Create a ref for the canvas element
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Game variables and objects
    let player: Player | null = null;
    let ground: Ground | null = null;
    let cactiController: CactiController | null = null;
    let score: Score | null = null;

    let scaleRatio: number | null = null;
    let previousTime: number | null = null;
    let gameSpeed: number = GAME_SPEED_START;
    let gameOver: boolean = false;
    let hasAddedEventListenersForRestart: boolean = false;
    let waitingToStart: boolean = true;

    function createSprites(): void {
      const playerWidthInGame: number = PLAYER_WIDTH * scaleRatio!;
      const playerHeightInGame: number = PLAYER_HEIGHT * scaleRatio!;
      const minJumpHeightInGame: number = MIN_JUMP_HEIGHT * scaleRatio!;
      const maxJumpHeightInGame: number = MAX_JUMP_HEIGHT * scaleRatio!;

      const groundWidthInGame: number = GROUND_WIDTH * scaleRatio!;
      const groundHeightInGame: number = GROUND_HEIGHT * scaleRatio!;

      player = new Player(
        ctx,
        playerWidthInGame,
        playerHeightInGame,
        minJumpHeightInGame,
        maxJumpHeightInGame,
        scaleRatio!
      );

      ground = new Ground(
        ctx,
        groundWidthInGame,
        groundHeightInGame,
        GROUND_AND_CACTUS_SPEED,
        scaleRatio!
      );

      const cactiImages = CACTI_CONFIG.map((cactus: CactusConfig) => {
        const image: HTMLImageElement = new Image();
        image.src = cactus.image;
        return {
          image: image,
          width: cactus.width * scaleRatio!,
          height: cactus.height * scaleRatio!,
        };
      });

      cactiController = new CactiController(
        ctx,
        cactiImages,
        scaleRatio!,
        GROUND_AND_CACTUS_SPEED
      );

      score = new Score(ctx, scaleRatio!);
    }

    function setScreen(): void {
      scaleRatio = getScaleRatio();
      canvas.width = GAME_WIDTH * scaleRatio!;
      canvas.height = GAME_HEIGHT * scaleRatio!;
      createSprites();
    }

    function getScaleRatio(): number {
      const screenHeight: number = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight
      );

      const screenWidth: number = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
      );

      if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
      } else {
        return screenHeight / GAME_HEIGHT;
      }
    }

    function gameLoop(currentTime: number): void {
      if (previousTime === null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
      }
      const frameTimeDelta: number = currentTime - previousTime;
      previousTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw game objects
      if (!gameOver && !waitingToStart) {
        ground!.update(gameSpeed, frameTimeDelta);
        cactiController!.update(gameSpeed, frameTimeDelta);
        player!.update(gameSpeed, frameTimeDelta);
        score!.update(frameTimeDelta);
        gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
      }

      ground!.draw();
      cactiController!.draw();
      player!.draw();
      score!.draw();

      requestAnimationFrame(gameLoop);
    }

    setScreen();
    window.addEventListener('resize', () => setTimeout(setScreen, 500));
    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', setScreen);
    };
  }, []);

  return <canvas ref={canvasRef} id="game" />;
};

export default GameCanvas;
