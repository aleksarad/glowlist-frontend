import React from 'react';

export default function SearchBar({setSearch}) {
    return (
            <input id="search" placeholder="search looks" onChange={e => setSearch(e.target.value.toLowerCase())}></input>
    )
}