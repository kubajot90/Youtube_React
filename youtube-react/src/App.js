
import Navigation from './components/navigation/Navigation';
import SideBar from './components/SideBar';

import classes from './App.module.css';
import { Fragment } from 'react';

function App() {
return(
  <Fragment>
    <SideBar/>
    <Navigation/>
  </Fragment>
)
}

export default App;
