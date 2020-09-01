import React, { useEffect } from 'react';

export default function SearchBar({setSearch}) {
    //reset search term
    useEffect(() => {
        setSearch("")
    }, []);

    return (
            <input id="search" placeholder="search looks" onChange={e => setSearch(e.target.value.toLowerCase())}></input>
    )
}