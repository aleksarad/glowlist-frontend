import React from 'react';
import jellyFish from "../images/jellyfish.png"

export default function HomePage() {
    return (
        <div className="centered-container-horizontal">
            <span className="main-logo">glowlist</span>
            <div id="github-bubble-container">
                <div className="github-bubble">made by <a href="https://github.com/aleksarad" target="_blank" rel="noopener noreferrer">aleksa</a> with 💗</div>
                <img src={jellyFish} alt="a pink, smiling, cartoon jellyfish" className="jellyfish"></img>
            </div>
        </div>
    )
}