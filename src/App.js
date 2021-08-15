import React from 'react'
import PageContainer from './components/pageContainer'
import './dragndrop.css';
import { useSelector } from 'react-redux';
import Header from './components/header';

function App() {
const dragging = useSelector( state => state.dragndrop )

  const appClass = dragging === 'project' ? 'dragProject' : ''

  return (
    <div className={appClass}>
      <Header />
    
      <PageContainer />
      
    </div>
  )
}

export default App;
