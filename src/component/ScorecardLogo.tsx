import * as React from 'react';
import { ScoreCardHeading } from "../styling/css"
import logo from "./images/logo.png";

interface IScorecardLogoProps {
}

const ScorecardLogo: React.FunctionComponent<IScorecardLogoProps> = (props) => {
  return (
    <>
    <div style={{display: "flex", marginBottom: '3rem'}}>
      
        <div style={{flex: "0.3"}}>
            <img src={logo} alt="" />
        </div>

        <div style={{flex: "0.1", margin: "0.5rem 0 0.4rem 0rem"}}>
            <ScoreCardHeading>Scorecard</ScoreCardHeading>

        </div>
    </div>
    </>
  );
};

export default ScorecardLogo;
