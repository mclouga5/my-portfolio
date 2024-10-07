'use client';

import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import "../globals.css";
import { motion, Variants } from "framer-motion";

interface CardProps {
    element: {
      id: number;
      name: string;
      image: string;
    };
    onClick: () => void;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  },
  hover: {
    scale: 1.05,
    rotate: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  }
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

export default function SplashCard({ element, onClick }: CardProps) {
    const predefinedHues = [
        { hueA: 340, hueB: 10 },
        { hueA: 20, hueB: 40 },
        { hueA: 60, hueB: 90 },
        { hueA: 80, hueB: 120 },
        { hueA: 100, hueB: 140 },
        { hueA: 205, hueB: 245 },
        { hueA: 260, hueB: 290 },
        { hueA: 290, hueB: 320 },
    ];
    const { hueA, hueB } = predefinedHues[(element.id - 1) % predefinedHues.length];
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

    const [dimensions, setDimensions] = useState({ width: 0, height: 0, scale: 0 });

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scale = Math.min(width, height) / 1000;
        setDimensions({ width, height, scale });
    }, []); 

    // Get the calculated values from state
    const { scale } = dimensions;
    const clipPath = `path("M ${0 * scale} ${303.5 * scale} C ${0 * scale} ${292.454 * scale} ${8.995 * scale} ${285.101 * scale} ${20 * scale} ${283.5 * scale} L ${460 * scale} ${219.5 * scale} C ${470.085 * scale} ${218.033 * scale} ${480 * scale} ${228.454 * scale} ${480 * scale} ${239.5 * scale} L ${500 * scale} ${430 * scale} C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`;

    return (
        <motion.div
            className="card-container w-full h-full"
            initial="offscreen"
            whileInView="onscreen"
            whileHover="hover"
            viewport={{ once: true, amount: 0.8 }}
            onClick={onClick}
        >
            <div className="splash" style={{ background, clipPath }} />
            <motion.div className="card md:h-[40vh]" variants={cardVariants}>
                <img
                    src={element.image} // Use the image path directly
                    alt={element.name}
                    className="element-image" // Add styling for the image
                />
            </motion.div>
        </motion.div>
    );
}

