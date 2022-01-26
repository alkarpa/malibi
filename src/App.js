import React, { useEffect } from 'react'
import PageContainer from './components/pageContainer'
import './dragndrop.css';
import './timestable.css';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/header';
import Footer from './components/footer';
import initialize from './services/initializeData';
//import storageAPI from './services/storageAPI';

function App() {
const dragging = useSelector( state => state.dragndrop )

  const appClass = dragging === 'project' ? 'dragProject' : ''
  const dispatch = useDispatch()

  // Initialize asynchronous states
  useEffect( () => {
    dispatch( initialize )
  }, [dispatch])


  return (
    <div className={`app ${appClass}`}>
      <Header />
    
      <PageContainer />
      
      <Footer />
    </div>
  )
}

export default App;
