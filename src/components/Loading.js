import React from 'react';
import FeedEmpty from './FeedEmpty'

export default function Loading() {
    return (
    <div className="centered-container">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>
    )
}