import React, { useState } from 'react'
import IntervalForm from './intervalForm'

const IntervalFormPopup = ({ interval }) => {
    const [showForm, setShowForm] = useState(false)

    const handleButton = () => {
        setShowForm(true)
    }

    return (
        <div style={{position: 'relative', textAlign: 'left'}}>
            <button onClick={handleButton}>Edit</button>
            {
                showForm && (
                    <div style={{
                        position: 'absolute',
                        minWidth: '300px',
                        backgroundColor: 'white',
                        border: '1px black solid',
                        top: '5px',
                        left: '5px',
                        zIndex: 5,
                    }}>
                        <div onClick={() => setShowForm(false)}
                            style={{backgroundColor: 'gray', textAlign: 'center', cursor: 'pointer'}}
                        >
                            X
                        </div>
                        <IntervalForm interval={interval} />
                    </div>
                )
            }

        </div>
    )
}

export default IntervalFormPopup