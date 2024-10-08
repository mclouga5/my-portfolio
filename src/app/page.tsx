'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WhackAMole from './whackAMole/wam';
import TicTacToe from './ticTacToe/ttt';
import SplashCard from './components/SplashCard';
import { ColourDrag } from './components/ColourDrag';
import ProjectCarousel from './ExternalProjects/projectsShowcase';

export default function Home() {
  const [activeGame, setActiveGame] = useState(0);

  const games = [
    {
      id: 1,
      name: 'Whack-A-Mole',
      component: <WhackAMole />,
      image: '/media/monty-mole.png',
    },
    {
      id: 2,
      name: 'Tic Tac Toe',
      component: <TicTacToe />,
      image: '/media/ttt.png',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Welcome Section */}
      <motion.section
        className="relative flex flex-col justify-center items-center h-screen w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <motion.p
          className="text-6xl font-bold text-white mb-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        >
          A Personal Portfolio
        </motion.p>
        <motion.p
          className="text-white text-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } }}
        >
          By Aoife McLoughlin
        </motion.p>
        <ColourDrag />
      </motion.section>

      {/* Games Section */}
      <div>
        <div className="h-screen flex flex-col md:flex-row">
          <div className=" md:w-1/3 p-6 flex justify-center md:flex-col md:space-y-12 gap-6 h-[30vh] md:h-[100vh]">
            {games.map((game, index) => (
              <SplashCard
                key={game.id}
                element={game}
                onClick={() => setActiveGame(index)}
              />
            ))}
          </div>

          {/* Main area showing the selected game */}
          <div className="w-full md:w-2/3 flex items-center justify-center md:p-10 h-[75vh] md:h-[100vh]">
            {activeGame !== null && (
              <motion.div
                key={games[activeGame].id}
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
                className="w-full h-full"
              >
                {games[activeGame].component}
              </motion.div>
            )}
          </div>
        </div>
      </div>

       <div className='h-screen w-screen flex items-center justify-center'>
            <ProjectCarousel />

      </div>
    </div>
  );
}
