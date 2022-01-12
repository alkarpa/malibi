import React, { useState } from 'react'

const ProjectDropdown = ({
    interval,
    options,
    value = { title: '--no project--' },
    handleChange
    
}) => {
    const [selecting, setSelecting] = useState(false)

    const optionSelected = (event) => {
        handleChange( interval, event.target.value )
        setSelecting(false)
        return { selectValue: event.target.value }
    }

    return (
        <div className='intervalproject '>
            {
                selecting
                    ? (
                        <select 
                            value={value.id} 
                            onChange={optionSelected}
                            style={{width: '100%'}}
                        >
                            <option value={undefined}>N/A</option>
                            { options.map( o => (
                                <option value={o.id} key={o.id}>{o.title}</option>
                             ) ) }
                        </select>
                      )
                    : (<span onClick={() => setSelecting(!selecting)}>{value.title}</span>)
            }
        </div>
    )
}

export default ProjectDropdown