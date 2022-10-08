import React, { useEffect } from 'react';
import { Fragment, useState} from 'react';
// import { useNavigate } from "react-router-dom";
import SideBar from './components/SideBar';
import Main from './components/Main';
import PlayerOpenProvider from './context/PlayerOpenContext';
import './App.css';

export const API_KEY = React.createContext();

function App() {
  // const navigate = useNavigate();
  const key = 'AIzaSyB202u3kgEqYzVr2WEBBMefmRDXXGOGcuw'
  // const [key, setKey] = useState({apiKey:'AIzaSyDGNmsrYlb33hVN_6hEZrjLQaQFo1aZ2Xw', valid: false});
  
  // fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${key}&videoEmbeddable=true&order=viewCount&q=xxx&type=video&part=snippet`).then((data)=>{
  //   if(data.status !== 200){ setKey({apiKey:'AIzaSyAbOuHpUIPm08qQN3Yxlg4tjRAyluOQklc',
  // valid:true})
  //  }
  // })

  // useEffect(()=>{
  //   console.log("key",key);
  //   console.log('navigate');
  //    navigate('/')
  // },[key])

  // const onChangeKey =(key)=>{
  //   setKey(key);
  // }
  
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
    //   API KEY: AIzaSyB202u3kgEqYzVr2WEBBMefmRDXXGOGcuw 
    //   API KEY: AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8 
    //   API KEY: AIzaSyCvFlxRBJ_OQgnwq5VJsamHP6sQiAbke2k 
    //   API KEY: AIzaSyBNOVRGK5yft4Ch2RWyKOITKHzkT1Y9SgA 
    //   API KEY: AIzaSyAbOuHpUIPm08qQN3Yxlg4tjRAyluOQklc 
    //   API KEY: AIzaSyDwOhD_EqgdyzGC3E_20GYXVI1Zq0rhIMA ==
    
    //   API KEY: AIzaSyDGNmsrYlb33hVN_6hEZrjLQaQFo1aZ2Xw - 