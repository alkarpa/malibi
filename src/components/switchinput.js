import React from 'react'

const SwitchInput = ({checked, onChange, onlabel='on', offlabel='off'}) => {

    return (
        <label className='switch'>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className='slider'>{ checked ? onlabel : offlabel }</span>
        </label>
    )
}

export default SwitchInput