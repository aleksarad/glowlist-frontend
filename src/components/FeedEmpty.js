import React from 'react';
import { Link } from "react-router-dom";
import jellyFish from "../images/sadjelly.png"

export default function FeedEmpty() {
    return (
    <div className="centered-container">
        <img className="feed-jellyfish" alt="a confused cartoon jellyfish" src={jellyFish}></img>
        <h2 className="bubble">oops, there's nothing here... why dont you<Link to='/look' className="new-look" style={{marginLeft: '5px'}}>create a look</Link></h2>
    </div>
    )
}