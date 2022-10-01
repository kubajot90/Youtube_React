import React from 'react';
import { Fragment} from 'react';
import SideBar from './components/SideBar';
import Main from './components/Main';
import PlayerOpenProvider from './context/PlayerOpenContext';
import './App.css';

export const API_KEY = React.createContext();

function App() {
  const key = 'AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I'
  
  return(
    <Fragment>
      <API_KEY.Provider value={key}>
        <PlayerOpenProvider>
          <SideBar/>
          <Main/> 
        </PlayerOpenProvider>
      </API_KEY.Provider>
    </Fragment>
)
}

export default App;


    //   API KEY: AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I - 
    //   API KEY: AIzaSyB202u3kgEqYzVr2WEBBMefmRDXXGOGcuw -
    //   API KEY: AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8 -
    //   API KEY: AIzaSyCvFlxRBJ_OQgnwq5VJsamHP6sQiAbke2k 
    //   API KEY: AIzaSyBNOVRGK5yft4Ch2RWyKOITKHzkT1Y9SgA 
    //   API KEY: AIzaSyAbOuHpUIPm08qQN3Yxlg4tjRAyluOQklc 
    //   API KEY: AIzaSyDwOhD_EqgdyzGC3E_20GYXVI1Zq0rhIMA 
    
    //   API KEY: AIzaSyDGNmsrYlb33hVN_6hEZrjLQaQFo1aZ2Xw 