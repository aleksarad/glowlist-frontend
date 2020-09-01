import React, { useEffect } from 'react';

export default function Filter({setFilter}) {
    //reset filter
    useEffect(() => {
        setFilter("")
    }, []);

    return (
        <select id="filter" onChange={e => setFilter(e.target.value)}>
            <option disabled="disabled" selected="selected">
                filter by
            </option>
            <option>complete</option>
            <option>incomplete</option>
            <option>all</option>
        </select>
    )
}