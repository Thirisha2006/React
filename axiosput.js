import React,{useState} from 'react';
import Axios from 'axios';
const DemopostAxios=()=>
{
    const[Name,setName]=useState('');
    const[userId,setUserId]=useState('');
    const addNew=()=>
    {
      Axios.put('https://jsonplaceholder.typicode.com/users/'+userId,{name:Name})
          .then(res=>console.log(res.data))
    }
    return(
       <>
       <h1>Post Demo</h1>
       <input type="text"value={userId} onChange={(e)=>setUserId(e.target.value)} ></input>
       <input type="text"value={Name} onChange={(e)=>setName(e.target.value)} ></input>
       <button onClick={addNew}>Add New</button>
       </>
    )
  
}
export default DemopostAxios;