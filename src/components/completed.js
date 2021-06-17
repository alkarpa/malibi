import React, {useState} from 'react'
import TimesTable from './timesTable'
import storageService from '../services/storage'
import intervalService from '../services/intervals'


const Completed = ({ completed, setCompleted, projects }) => {

    const [daysToShow, setDaysToShow] = useState(2)

      const setIntervalProject = (interval_id, project) => {
        const interval_completed_index = completed.findIndex( c => c.intervals.find( i => i.id === interval_id ) )
        console.log('completed by index', completed[interval_completed_index])
        const newSession = intervalService.setIntervalProject(completed[interval_completed_index], interval_id, project)
        const newCompleted = completed.map( (c,i) => i === interval_completed_index ? newSession : c )
        setCompleted( newCompleted )
        const allIntervals = newCompleted.reduce( (array, cur) => array.concat(cur.intervals) , [] )
        const newCompletedForStorage = intervalService.prepareIntervalsForStorage( {intervals: allIntervals} )
        console.log('forStorage', newCompletedForStorage)
        storageService.save('completed',  newCompletedForStorage )
    }

    const handleDaysToShowSelection = (event) => {
        setDaysToShow( event.target.value )
    }

    return (
        <div>
            <h1>Recent</h1>
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
            { completed.slice(-daysToShow).reverse().map( c => (
                <div className='completedCard' key={'c'+c.intervals[0].start.millis}>
                    <TimesTable intervalsInfo={c} projects={projects} setProject={setIntervalProject} />

                </div>))}
        </div>
    )

}

export default Completed