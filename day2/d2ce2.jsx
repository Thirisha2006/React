import React from 'react';
const Day2class2 =()=>
{
        const pstyle = {
          backgroundColor: 'lightblue',
          padding: '10px',
          color:'darkblue',
          border:'1px solid blue',
          borderradius:'5px'
        };
    
    return(
        <div style={pstyle}>
            <h1 style={{color:"green"}}>Inline Style in JSX Example</h1>
            <p style={{color:"darkblue",fontSize:"16px"}}>This is the paragraph with the inline Styles applied</p>
        </div>
    
    );

};
export default Day2class2;