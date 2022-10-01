import {useState, useEffect} from 'react';

const SubscriberCounter =(props)=>{
   const [amount, setAmount] = useState('')
  
  const subscriberCountFunc=()=>{
    let subscriberCount = parseInt(props.subscriberAmount);
    
    if(subscriberCount < 2){
      setAmount(`${subscriberCount} subskrybent`);
    } else if(subscriberCount> 1 && subscriberCount< 10000){
      setAmount(`${subscriberCount} subskrybentów`);
    } else if(subscriberCount> 9999 && subscriberCount< 1000000){
      setAmount(`${subscriberCount.toString().slice(0, 2)} tys subskrybentów`);
    } else if(subscriberCount > 1000000 && subscriberCount < 10000000){
      setAmount(`${subscriberCount.toString().slice(0, 1)} mln subskrybentów`);
    } else if(subscriberCount > 9999999 ){
      setAmount(`${subscriberCount.toString().slice(0, 2)} mln subskrybentów`);
    } 
  };

  useEffect(()=>{
    subscriberCountFunc();
  },[props.subscriberAmount])

  // useEffect(()=>{
    // console.log('props.subscriberAmount', props.subscriberAmount);
    // console.log('amount', amount);
  // },[amount])

    return(
    <>
    {amount}
    </>
    )
}

export default SubscriberCounter;