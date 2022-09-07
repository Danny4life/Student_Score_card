import React, { FC, MouseEvent, ChangeEvent } from 'react';
import microscope from '../component/images/microscope.svg'
import styles from '../component/EmptyStack.module.css'
// e: MouseEvent<HTMLButtonElement>
type EmptyStackProps = {
    onChangeHandler?: (e?: ChangeEvent<HTMLButtonElement>) => void;
    className?: string 
}

const EmptyStack: (props: EmptyStackProps) => JSX.Element = function(props: EmptyStackProps){
    const {onChangeHandler} = props;
    // const handleFocus = function(event: React.FocusEvent<HTMLElement>){
        
    // }

    const changeStack = function(event: MouseEvent<HTMLButtonElement> ){
        if(onChangeHandler){
            onChangeHandler();
        }
    }
    

    // onChangeHandler
    return(
        
        <div className={`${styles["wrapper"]}`} >
            <h3 className={`${styles["dashboard"]}`}> Dashboard </h3>
            <div className={`${styles["dashboard-container"]}`}>
                <div className={`${styles["microscope"]}`} >
                    <img src= { microscope } alt="" />
                </div> 
                <div className={`${styles["oops"]}`}>
                    <h2>Ooopss...</h2>
                </div>
                <div className={ `${styles["empty-stack"]}` } > 
                    <p> You have not created any Stack yet click on <strong>create Stack</strong><br/> to get started</p> 
                </div>
                <div className={`${styles["create"]}`}>
                    {/* <h1 className="dashboard">Dashboard</h1> */}
                    <button className={`${styles["create-stack"]}`} onClick={ changeStack } ><span style={{fontSize: '1.5rem', textAlign: 'end', lineHeight: '1rem' }}>+   </span> Create Stack</button>
                </div>
            </div>
        </div>
            
    )
}

export default EmptyStack;