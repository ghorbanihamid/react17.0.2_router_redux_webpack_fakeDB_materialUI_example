
import React, { useState }     from 'react';
import { Link, useLocation }   from 'react-router-dom';


function ForgotPassword () {

  const [emailAddress, setEmailAddress] = useState();

  function handleChange(e) {
    setEmailAddress(e.target.value);

  }

  function handleForgotPassword(e) {
    e.preventDefault();

    if(emailAddress){
      //sendChangePasswordRequest(emailAddress);
      console.log('ForgotPassword.handleForgotPassword().sendChangePasswordRequest() done.');
    }
  }

  return(
    <div name="div1" align="center" style={{border:'solid',width:'600px',height:"300px",align:'center'}}>
      {console.log('*** forgot password called.')}
      <div name="div_emailAddress" align="left">
        <label>emailAddress:</label>
        <input type="text" name="emailAddress"  value={emailAddress} onChange={handleChange} />
      </div>
      <br/>
      <div name="div3" align="center">
        <button type="submit">submit</button>
      </div>
    </div>
  )
}
export { ForgotPassword };
