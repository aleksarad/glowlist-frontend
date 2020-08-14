import React from 'react';

export default function SearchBar({setSearch}) {
    return (
        <div>
            <input onChange={e => setSearch(e.target.value.toLowerCase())}></input>
        </div>
    )
}