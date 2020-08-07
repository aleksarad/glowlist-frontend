import React from 'react';
import LookCard from './LookCard'

export default function LookContainer({looks}) {
    console.log(looks)

    const lookCards = looks.map(look => <LookCard key={look.id} look={look}/>)

    return (
        <div>{lookCards}</div>
    )
}