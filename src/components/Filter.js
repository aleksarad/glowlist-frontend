import React from 'react';

export default function Filter({setFilter}) {
    return (
        <select id="filter" onChange={e => setFilter(e.target.value)}>
            <option disabled="disabled" selected="selected">
                filter by
            </option>
            <option>complete</option>
            <option>incomplete</option>
        </select>
    )
}