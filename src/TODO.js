import React from 'react'

const Todo = () => { 
    return (
    <div style={{ display: 'block', backgroundColor: 'yellow' }}>
        <h3>To do:</h3>
        <ul>
          <li>Customizing/Storing the projects</li>
          <li><strike>Remove the idea of completed sessions and just store the intervals</strike>
            <ul>
              <li><strike>Group by start date instead of sessions (abstract groupings of intervals)</strike></li>
              <li><b>Simplify the stored data and recalculate the derivative data when needed</b>
                <ul>
                  <li>The current hack needs refactorization and thought</li>
                </ul>
              </li>
            </ul>
          </li>
          <li><strike>Project changes in completed intervals</strike></li>
          <li>Editing modes for active session and completed intervals</li>
          <li>Permanent storage solutions other than localStorage (start with json-server?)</li>
          <li>Make it pretty</li>
          <li>Improve and optimize the drag and drop style changes</li>
          <li>History and statistics
            <ul>
              <li>Out of sight storage for Completed sessions</li>
              <li>Total time spent on projects</li>
            </ul>
          </li>
        </ul>
      </div>
)
}

export default Todo