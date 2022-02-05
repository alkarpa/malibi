import React from 'react'

export const TEXT = {
    nocontent: 'Not a single alibi to give...'
}

const EmptyAlibis = () => {

    return (
        <div className='nocontent'>
        <div className='backstyling' />
            <div>
                <h2>
                    {TEXT.nocontent}
                </h2>
            </div>
        </div>
    )
}

export default EmptyAlibis