import * as React from 'react';
import { LoginHeading } from '../styling/css';
import { AuthenticationLeft, AuthenticationRight, ScorecardLogo } from "../component";
import { Link } from "react-router-dom";


interface IAuthenticationBodyProps {
}

const Login: React.FunctionComponent<IAuthenticationBodyProps> = (props) => {
  return (
    <>
      <div style={{ display: 'flex', backgroundColor: '#fff' }}>

        <div style={{ flex: '1', margin: "3rem 5rem" }}>
          <ScorecardLogo />
          <LoginHeading>Login to your account</LoginHeading>

          <AuthenticationLeft />

          <p style={{
            textAlign: "center",
            fontWeight: '300',
            color: '#03435F'
          }}>Don't have an account? <Link to="/superadmin-signup" style={{
            textDecoration: "none",
            color: "#34A853",
            fontWeight: '800'
          }}>Sign Up</Link></p>
        </div >

        <div style={{ flex: "1" }}>
          <AuthenticationRight />
        </div>
      </div >
    </>
  );
};

export default Login;
