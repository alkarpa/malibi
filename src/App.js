import React from 'react'
import PageContainer from './components/pageContainer'
import './dragndrop.css';
import './timestable.css';
import { useSelector } from 'react-redux';
import Header from './components/header';
import Footer from './components/footer';

function App() {
const dragging = useSelector( state => state.dragndrop )

  const appClass = dragging === 'project' ? 'dragProject' : ''

  return (
    <div className={`app ${appClass}`}>
      <Header />
    
      <PageContainer />
      
      <Footer />
    </div>
  )
}

export default App;
