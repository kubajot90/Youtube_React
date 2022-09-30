import SideBar from './components/SideBar';
import Main from './components/Main';
import { Fragment} from 'react';
import { useContext } from 'react';
import { PlayerOpenContext } from './context/PlayerOpenContext';


import './App.css';


function App() {

const isPlayerOpen = useContext(PlayerOpenContext);

return(
  <Fragment>
      <SideBar/>
      <Main/>
  </Fragment>
)
}

export default App;
