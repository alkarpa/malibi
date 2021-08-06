import React, { useState } from 'react'

const ProjectDropdown = ({
    interval,
    options = [],
    value = { title: '--no project--' },
    handleChange = console.log
    
}) => {
    const [selecting, setSelecting] = useState(false)

    const optionSelected = (event) => {

        handleChange( interval, event.target.value )
        setSelecting(false)
    }

    return (
        <div onClick={() => setSelecting(!selecting)}>
            {
                selecting
                    ? (
                        <select value={value.id} onChange={optionSelected}>
                            <option value={undefined}>N/A</option>
                            { options.map( o => (
                                <option value={o.id} key={o.id}>{o.title}</option>
                             ) ) }
                        </select>
                      )
                    : (<span>{value.title}</span>)
            }

        </div>
    )
}

export default ProjectDropdown