import React, { useEffect } from 'react';
import { Fragment, useState, useRef} from 'react';
import SideBar from './components/SideBar';
import Main from './components/Main';
import PlayerOpenProvider from './context/PlayerOpenContext';
import './App.css';

export const API_KEY = React.createContext();

const apiKeys = [
'AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1Ixxx',
'AIzaSyB202u3kgEqYzVr2WEBBMefmRDXXGOGcuwxxx',
'AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8xxx',
'AIzaSyCvFlxRBJ_OQgnwq5VJsamHP6sQiAbke2k',
'AIzaSyBNOVRGK5yft4Ch2RWyKOITKHzkT1Y9SgA'
]

function App() {
  const apiKeyIndex = useRef(0)
  const [key, setKey] = useState(apiKeys[apiKeyIndex.current]);
  const [iskeyValid, setIsKeyValid] = useState(false)
  
  

  useEffect(function CheckIsKeyValid(){
    fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${key}&videoEmbeddable=true&order=viewCount&q=example&type=video`).then((response)=>{
    if(response.status !== 200){
      apiKeyIndex.current = apiKeyIndex.current+1;
      setKey(apiKeys[apiKeyIndex.current]);
      setIsKeyValid(false);
   }else{
    setIsKeyValid(true)
   }
  })
  },[key])

  return(
    <Fragment>
      <API_KEY.Provider value={key}>
        <PlayerOpenProvider>
          <SideBar/>
          <Main iskeyValid={iskeyValid}/> 
        </PlayerOpenProvider>
      </API_KEY.Provider>
    </Fragment>
)
}

export default App;


    //   API KEY: AIzaSyA4EWyFfvSUnaOIvJ5iEMYa2oHjZ_cou1I 
    //   API KEY: AIzaSyB202u3kgEqYzVr2WEBBMefmRDXXGOGcuw 
    //   API KEY: AIzaSyDAH74sPDWL8ySNg8jhmH75S8J7n-RbW_8 
    //   API KEY: AIzaSyCvFlxRBJ_OQgnwq5VJsamHP6sQiAbke2k 
    //   API KEY: AIzaSyBNOVRGK5yft4Ch2RWyKOITKHzkT1Y9SgA 
    //   API KEY: AIzaSyAbOuHpUIPm08qQN3Yxlg4tjRAyluOQklc 
    //   API KEY: AIzaSyDwOhD_EqgdyzGC3E_20GYXVI1Zq0rhIMA 
    //   API KEY: AIzaSyDGNmsrYlb33hVN_6hEZrjLQaQFo1aZ2Xw 