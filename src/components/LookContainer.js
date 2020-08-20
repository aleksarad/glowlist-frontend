import React from 'react';
import LookCard from './LookCard'


export default function LookContainer({looks, setLooks, handleEditing, routeProps, updateLookState }) {


    const lookCards = looks.map(look => <LookCard key={look.id} {...routeProps} look={look} setLooks={setLooks} updateLookState={updateLookState} handleEditing={handleEditing}/>)

    return (
        <>{lookCards}</>
    )
}