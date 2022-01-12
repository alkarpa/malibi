import React, {useState} from 'react'
import TimesTable from './timesTable'
import { useSelector } from 'react-redux'
import { intervalsDateMapper } from '../services/intervals'

const Completed = () => {

    const intervals = useSelector( state => state.intervals )

    const [daysToShow, setDaysToShow] = useState(2)

    const handleDaysToShowSelection = (event) => {
        setDaysToShow( event.target.value )
    }

    const dateMap = intervalsDateMapper(intervals)

    const array = Object.keys( dateMap ).sort().slice(-daysToShow).reverse()
    

    return (
        <div className='recent'>
            <div className='settings'>
            &#9881;
            <label>
             Days to show
                <select onChange={handleDaysToShowSelection} value={daysToShow}>
                    { Array.from({length:5}, (v,i) => i+1).map( v => (
                        <option key={`daysToShow${v}`} value={v}>
                            {v}
                        </option>
                    ) ) }
                </select>
            </label>
            </div>
            { array.map( day => (
                <div className='completedCard' key={'c'+dateMap[day][0].start}>
                    <TimesTable title={day} keyprefix='ctt' day={dateMap[day]} /> 
                </div>
            )) }
        </div>
    )

}

export default Completed