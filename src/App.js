import React from 'react'
import Timer from './components/timer/timer'
import PageContainer from './components/pageContainer'
import './dragndrop.css';
import { useSelector } from 'react-redux';

function App() {
const dragging = useSelector( state => state.dragndrop )

  const appClass = dragging === 'project' ? 'dragProject' : ''

  return (
    <div className={appClass}>
      <Timer />
    
      <PageContainer />
      
    </div>
  )
}

export default App;
