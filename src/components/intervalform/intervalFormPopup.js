import React, { useState } from 'react'
import IntervalForm from './intervalForm'

const EditForm = ({ interval, hideForm }) => {

    return (
        <div className='alibiformcontainer'>
            <div className='alibiform'>
                <button onClick={hideForm} className="closebutton">Close &times;</button>
                <IntervalForm intervalId={interval.id} />
            </div>
        </div>
    )
}

const IntervalFormPopup = ({ interval }) => {
    const [showForm, setShowForm] = useState(false)

    const handleButton = () => {
        setShowForm(true)
    }
    const hideForm = () => {
        setShowForm(false)
    }

    return (
        <div className='alibiedit'>
            <button className={`${showForm ? 'selected' : ''}`} onClick={handleButton} title='Edit'>&#9998;</button>
            {
                showForm && (
                    <EditForm interval={interval} hideForm={hideForm} />
                )
            }

        </div>
    )
}

export default IntervalFormPopup