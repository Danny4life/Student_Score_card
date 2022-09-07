import * as React from 'react';
import photo from "./images/photo.png";

interface IAuthenticationRightProps {
}

const AuthenticationRight: React.FunctionComponent<IAuthenticationRightProps> = (props) => {
  return (
    <div style={{height: '100vh'}} className='authentication-right'>
        <img src={photo} alt="" style={{ height: '100vh', width: '100%', objectFit: "cover" }} />
    </div>
  );
};

export default AuthenticationRight;
