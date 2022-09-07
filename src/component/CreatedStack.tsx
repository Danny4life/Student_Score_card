import React, { FC, useState, MouseEvent } from 'react';
import axios from 'axios';
import styles from './CreatedStack.module.css';
import nodePix from './images/node.svg'

interface IStackDataArray{
    imageUrl: string;
    name: string;
    _id: string
}

type CreatedStackProps = {
    stackDataArray: [IStackDataArray]
    onChangeHandler: (event?: MouseEvent<HTMLInputElement>) => void
}

const CreatedStack: (props: CreatedStackProps) => JSX.Element = function  (props: CreatedStackProps){
    const {onChangeHandler, stackDataArray} = props;
    const [modal, setModal] = useState(false)
    const createStackHandler = function(){
        onChangeHandler();
    }

    return(
        <div style={{ width: '73rem', marginBottom: '3rem'}}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', padding: '0 4rem 0 2rem' }}>
                <h1 className={`${styles["dashboard"]}`}> Dashboard </h1>
                <div>
                    <button className={`${styles["create-stack"]}`} onClick={createStackHandler} >+ Create Stack </button>
                </div>
            </div>

            <div className={styles["image-container"]}> 
            {
                stackDataArray.map( function(data: IStackDataArray, i){ return(
                    <div key={`${i}`} className={`${styles["admin-dashboard"]}`}>
                        <div className={`${styles["each-stack"]}`}>
                            <img
                                src={`${data.imageUrl}`}
                                alt=""
                                className={`${styles["stack_img"]}`}
                            />
                            <p>{data.name}</p>
                        </div>
                    </div>)
                })
            }
            </div>
        </div>
    )
}

export default CreatedStack;