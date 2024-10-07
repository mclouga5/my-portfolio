import React from 'react';

interface PushButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
  textColor?: string;
  shadowColor?: string;
  size?: string;
  additionalClasses?: string;
}

const PushButton: React.FC<PushButtonProps> = ({
  text,
  onClick,
  color = 'bg-red-500',
  textColor = 'text-white',
  shadowColor = '#D2042D',
  size = 'w-40 h-16',
  additionalClasses = '',
}) => {
  return (
    <div
    className={`button ${size} ${color} cursor-pointer select-none
      active:translate-y-2 active:border-b-[0px] transition-all duration-150
      rounded-full border-[1px] border-red-400 ${additionalClasses}`}
    onClick={onClick}
    style={{
      boxShadow: `0 10px 0 0 ${shadowColor}, 0 15px 0 0 #8B0000`, // Default 3D shadow effect
    }}
    >
      <span className={`flex flex-col justify-center items-center h-full font-bold text-lg ${textColor}`}>
        {text}
      </span>
    </div>
  );
};

export default PushButton;
