import React, { useState } from 'react'

const DetailsSection = ({ children }) => {
    const [section, setSection] = useState(0)

    const titles = children.map( c => c.props.buttontitle )
    return (
        <div className='detailssection'>
            <div className='tabButtons'>
                { titles.map( (t,i) => <button key={`projdet${t}`} 
                            className={ section === i ? "active" : "" } 
                            onClick={() => setSection(i)}>{t}</button> )}
            </div>
            <div className='content'>
                {children[section]}
            </div>
        </div>
    )
}

export default DetailsSection