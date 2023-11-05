"use client"; 
import React from 'react'
import Typewriter from 'typewriter-effect'; 
type Props = {
    
};

const TypeWriterTitle = (props: Props) => {
    return (
        <Typewriter 
        options={{
            loop:true,
        }}
        onInit={(typewriter) => {
            typewriter
            .typeString('Powerful!')
            .pauseFor(1000).deleteAll()
            .typeString('Efficient')
            .pauseFor(1000).deleteAll() 
            .typeString('Great')
            .pauseFor(1000).deleteAll()
            .typeString('Easy') 
            .pauseFor(1000).deleteAll()
            .start();
        }}
        />

       
    );
};

export default TypeWriterTitle
 