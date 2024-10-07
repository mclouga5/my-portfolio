import { cn } from '@/utiils/cn';
import React from 'react';


export interface ContainerProps{
    className?: string;
}

export default function Container({className, ...props}: ContainerProps){
    return(
        <div className={cn('w-screen h-screen overflow-hidden bg-gray-500', className)}>
        </div>

    );
}