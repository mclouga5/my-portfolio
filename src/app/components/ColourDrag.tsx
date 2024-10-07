import * as React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';



export function ColourDrag() {
  const [_, setFinalBackgroundColor] = React.useState('#008b8b');

  const pink = 'hsl(340, 57%, 64%)';
  const teal = 'hsl(180, 100%, 27%)';

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const scale = useTransform(x, [-200, 0, 200], [2, 1, 2]);

  const backgroundColor = useTransform(
    y,
    [-200, 0, 200],
    [teal, '#5f9ea0', pink]
  );

  React.useEffect(() => {
    const updateBackground = () => {
      document.body.style.backgroundColor = backgroundColor.get();
    };

    const unsubscribeY = y.on('change', updateBackground);

    return () => {
      unsubscribeY();
    };
  }, [y, backgroundColor]);

  return (
    <div>
      <motion.div
        className="h-20 w-20 rounded-[30px] flex items-center justify-center text-gray-600 font-bold z-0 bg-gray-100/40"
        drag
        dragElastic={1}
        dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        style={{
            x,
            y,
            scale,
          }}
        onDragEnd={() => {
          const finalColor = backgroundColor.get();
          document.body.style.backgroundColor = finalColor;
          setFinalBackgroundColor(finalColor);
        }}
      >
      Drag me!
      </motion.div>
    </div>
  );
}





