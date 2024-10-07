'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';
import PushButton from '../components/PushButton';
import { cn } from '@/utiils/cn';

const WhackAMole: React.FC = () => {
  const moleImage = '/media/monty-mole.png';
  const plantImage = '/media/pirhanaPlant.png';

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currMoleTile, setCurrMoleTile] = useState<string | null>(null);
  const [currPlantTile, setCurrPlantTile] = useState<string | null>(null);
  const [level, setLevel] = useState(1);
  const [wamMsg, setWamMsg] = useState('');

  const moleSpeedRef = useRef(1000);
  const plantSpeedRef = useRef(2000);
  const moleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const plantIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const scoreMotionValue = useMotionValue(0);
  const roundedScore = useTransform(scoreMotionValue, Math.round);

  useEffect(() => {
    startGame();
    return () => clearIntervals(); // Clean up intervals on unmount
  }, []);

  const startGame = () => {
    clearIntervals();
    setGameOver(false);
    moleIntervalRef.current = setInterval(setMole, moleSpeedRef.current);
    plantIntervalRef.current = setInterval(setPlant, plantSpeedRef.current);
  };

  const clearIntervals = () => {
    if (moleIntervalRef.current) clearInterval(moleIntervalRef.current);
    if (plantIntervalRef.current) clearInterval(plantIntervalRef.current);
  };

  // Function to set mole avoiding overlap with plant
  const setMole = () => {
    if (gameOver) return;

    // Generate a random tile and ensure it doesn't overlap with the plant
    let randomTile;
    do {
      randomTile = Math.floor(Math.random() * 9).toString();
    } while (randomTile === currPlantTile);

    setCurrMoleTile(randomTile);
  };

  // Function to set plant avoiding overlap with mole
  const setPlant = () => {
    if (gameOver) return;

    // Generate a random tile and ensure it doesn't overlap with the mole
    let randomTile;
    do {
      randomTile = Math.floor(Math.random() * 9).toString();
    } while (randomTile === currMoleTile);

    setCurrPlantTile(randomTile);
  };

  const selectTile = (tileId: number) => {
    if (gameOver) return;

    const tileIdStr = tileId.toString();

    if (currMoleTile === tileIdStr) {
      setScore((prevScore) => {
        const newScore = prevScore + 10;
        animate(scoreMotionValue, newScore, { duration: 0.5, ease: 'easeOut' });
        return newScore;
      });
      checkScoreForSpeedIncrease();
    } else if (currPlantTile === tileIdStr) {
      triggerGameOver();
    }
  };

  const checkScoreForSpeedIncrease = () => {
    if ((score + 10) % 100 === 0) {
      increaseGameSpeed();
    }
  };

  const increaseGameSpeed = () => {
    moleSpeedRef.current = Math.max(500, moleSpeedRef.current - 100);
    plantSpeedRef.current = Math.max(500, plantSpeedRef.current - 100);

    setLevel((prevLevel) => prevLevel + 1);
    setWamMsg(`Level ${level + 1}`);

    clearIntervals();
    startGame();

    setTimeout(() => {
      setWamMsg('');
    }, 2000);
  };

  const triggerGameOver = () => {
    setWamMsg(`GAME OVER: ${score}`);
    setGameOver(true);
    clearIntervals(); // Stop all intervals
  };

  const resetGame = () => {
    setScore(0);
    animate(scoreMotionValue, 0, { duration: 0.5, ease: 'easeOut' });
    setLevel(1);
    moleSpeedRef.current = 1000;
    plantSpeedRef.current = 1987;
    setCurrMoleTile(null);
    setCurrPlantTile(null);
    setWamMsg('');
    startGame();
  };

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <div
        id="board"
        className="relative grid grid-cols-3 gap-0 border-3 border-white rounded-[25px]
         bg-[url('/media/soil.png')] bg-cover w-[95vw] h-[50vh] md:w-[50vw] md:h-[76vh]"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            id={i.toString()}
            className="relative w-[28vw] h-[15vh] md:w-[15vw] md:h-[25vh] bg-[url('/media/pipe.png')] bg-cover flex items-center justify-center cursor-pointer"
            onClick={() => selectTile(i)}
          >
            {currMoleTile === i.toString() && (
              <Image
                src={moleImage}
                alt="Mole"
                width={800}
                height={800}
                className="user-select-none pointer-events-none w-20 h-20 md:w-32 md:h-32 absolute bottom-1/2 left-1/3 ml-[-10px]"
              />
            )}
            {currPlantTile === i.toString() && (
              <Image
                src={plantImage}
                alt="Plant"
                width={800}
                height={800}
                 className="user-select-none pointer-events-none w-24 h-24 md:w-32 md:h-32 absolute bottom-1/2 left-1/3 ml-[-10px] "
              />
            )}
          </div>
        ))}
        <div id="wamMsg"
        className= {cn("text-5xl font-bold z-50",
          gameOver
          ? "text-red-700 absolute top-1/2 md:left-1/4 z-50 left-4 text-center"
          : "text-amber-400 whitespace-nowrap drop-shadow-[0_120px_120px_rgba(0,0,0,0.25)] flex-center text-center blur-xs absolute top-[-5vh] left-[28vw] md:left-[20vw]"

        )}>{wamMsg}</div>
      </div>
      <motion.div id="score" className="mt-4 font-mono text-lg py-6">
        Score: <motion.span>{roundedScore}</motion.span>
      </motion.div>
      <PushButton
      text="Reset"
      onClick={resetGame}/>
    </div>
  );
};

export default WhackAMole;
