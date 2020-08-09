import React from 'react';
import LookCard from './LookCard'

export default function LookContainer({looks, setLooks, handleEditing, routeProps}) {

    const lookCards = looks.map(look => <LookCard key={look.id} {...routeProps} look={look} setLooks={setLooks} handleEditing={handleEditing}/>)

    return (
        <div>{lookCards}</div>
    )
}