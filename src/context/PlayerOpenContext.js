import React, {useState,  useEffect} from 'react';

export const PlayerOpenContext = React.createContext();
export const PlayerOpenUpdateContext = React.createContext();

const PlayerOpenProvider =({children})=>{
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);

const playerIsOpen=(value)=>{
    setIsPlayerOpen(value)
  }

  
useEffect(()=>{
    console.log('isPlayerOpen', isPlayerOpen);
    },[isPlayerOpen])

    return(
        <PlayerOpenContext.Provider value ={isPlayerOpen}>
            <PlayerOpenUpdateContext.Provider value={playerIsOpen}>
                {children}
            </PlayerOpenUpdateContext.Provider>
        </PlayerOpenContext.Provider>
    )
};

export default PlayerOpenProvider;