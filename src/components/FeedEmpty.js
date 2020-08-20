import React from 'react';
import { Link } from "react-router-dom";

//not sure if using this
export default function FeedEmpty() {
    return (
    <div className="centered-container">
        <h2 id="feed-empty">there's nothing here... why dont you <Link to='/look' id="feed-empty-link">create a look</Link></h2>
    </div>
    )
}