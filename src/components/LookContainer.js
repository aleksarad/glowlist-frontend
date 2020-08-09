import React from 'react';
import LookCard from './LookCard'

export default function LookContainer({looks, setLooks}) {
    console.log(looks)

    const lookCards = looks.map(look => <LookCard key={look.id} look={look} setLooks={setLooks}/>)

    return (
        <div>{lookCards}</div>
    )
}