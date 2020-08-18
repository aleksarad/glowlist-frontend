import React from 'react';

export default function SearchBar({setSearch}) {
    return (
            <input id="search" placeholder="search" onChange={e => setSearch(e.target.value.toLowerCase())}></input>
    )
}