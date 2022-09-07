import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

type PageProps = {
    children: JSX.Element | JSX.Element[];
		backToLogin: boolean;
}

const Main = styled.div`
    width: 100vw;
		height: 100vh;
		margin: 0;
    display: flex;
	justify-content: stretch;
	background-color: white;
	@media screen and (max-width: 1023px) {
		jusitfy-content: center;
	}
`

const WrapperPage = (props: PageProps) => {

	const [hover, isHover] = useState(false);

	return (
			<Main>
				<div style={ { margin: '0', flex: '1' } } className='wrapper-left'>
					<div className='brand'> 
						<img src="/assets/images/scorecardLogo.png" alt="logo"/>			
						<span style={{ 
						fontSize: '1.7rem', 
						fontWeight: '600', 
						color: '#21334F',
						lineHeight: '3rem',
						marginLeft: '0.4rem'}}>Scorecard</span>
					</div>
					<div>
						{
							props.backToLogin ? <Link to='/login' style={{ 
								fontSize: '1rem',
								fontWeight: '600',
								letterSpacing: ( hover ? '0.4px' : '0' ), 
								color: '#14A800', 
								textDecoration: 'none' }} 
								onMouseEnter={()=>{ isHover(true); }}
								onMouseLeave={()=>{ isHover(false); }}
								>Go back to Login</Link> : null
						}
					</div>
						{
							props.children
						}
				</div>
					<img src="/assets/images/loginPageImage.png" style={{ 
					height: '100vh',
					width: '46.5%', margin: '0'}} className='no-mobile'  alt="Decadev"/>			
			</Main>
	)
}
export default WrapperPage; 