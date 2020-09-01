import React from 'react';
import jellyFish from "../images/jellyfish.png"

export default function HomePage() {
    return (
        <div className="centered-container-horizontal">
            <span className="main-logo">glowlist</span>
            <img src={jellyFish} alt="a pink, smiling, cartoon jellyfish" className="jellyfish"></img>
        </div>
    )
}