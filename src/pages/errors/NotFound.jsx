
import React, { useState }     from 'react';
import { Link, useLocation }   from 'react-router-dom';


function NotFound () {

  return(
    <div name="div1" align="center" style={{border:'solid',width:'600px',height:"300px",align:'center'}}>
      {console.log('*** Not Found called.')}
        <h3>Not Found</h3>
    </div>
  )
}
export { NotFound };
