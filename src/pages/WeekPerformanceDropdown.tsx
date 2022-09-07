import { Input } from '../styling/css';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import styled from 'styled-components';
type PageProps = {
    onClick: any
}
const ModalButton = styled.button`
    border: unset;
    background-color: white;
    font-size: 1rem;
    color: #21334F;
    padding: 1rem 2rem;
    text-align: start;
    &:hover {
        cursor: pointer;
        text-shadow: 0px 0px 5px #aaa;
        letter-spacing: 0.4px;
    }
`
const WeekDropDown = (props: PageProps) => {
    const [modal, showModal] = useState(false);
    useEffect(()=>{
    }, [ ])
    return (
        <div style={{ display: 'inline-block', position: 'relative'}}>
            <button onClick={() => {showModal(!modal)}} style={{
            display: 'flex',
            alignItems: 'center',
            padding: "0.5rem 0.7rem",
            fontSize: '0.91rem', 
            color: 'rgba(0, 0, 0, 0.5)',
            fontWeight: '200',
            border: '0.015rem solid rgba(0, 0, 0, 0.5)', 
            borderRadius: '5px', 
            backgroundColor: '#ffffffb0',cursor: 'pointer'}}><AiOutlineCalendar style={{fontSize: '1.25rem',marginRight: '0.4rem'}}/>Weeks
            </button>
            <div onMouseLeave={() => {showModal(!modal)}} style={{ 
                position: 'absolute', 
                display: (modal ? 'inline-flex' : 'none'),
                boxShadow: '0px 0px 10px grey',
                flexDirection: 'column',
                top: '2rem',
                left: '-9rem',
                background: 'white',
                zIndex: '1000',
                minWidth: '15rem',
                minHeight: '13rem',
                justifyContent: 'space-around',
                padding: '0.8rem 0'
            }}>
                <ModalButton id="1" onClick={(e:any)=>props.onClick(e.target.id)}>Week 1</ModalButton>
                <ModalButton id="2" onClick={(e:any)=>props.onClick(e.target.id)}>Week 2</ModalButton>
                <ModalButton id="3" onClick={(e:any)=>props.onClick(e.target.id)}>Week 3</ModalButton>
                <ModalButton id="4" onClick={(e:any)=>props.onClick(e.target.id)}>Week 4</ModalButton>
                <ModalButton id="5" onClick={(e:any)=>props.onClick(e.target.id)}>Week 5</ModalButton>
                <ModalButton id="6" onClick={(e:any)=>props.onClick(e.target.id)}>Week 6</ModalButton>
                <ModalButton id="7" onClick={(e:any)=>props.onClick(e.target.id)}>Week 7</ModalButton>
                <ModalButton id="8" onClick={(e:any)=>props.onClick(e.target.id)}>Week 8</ModalButton>
                <ModalButton id="9" onClick={(e:any)=>props.onClick(e.target.id)}>Week 9</ModalButton>
                <ModalButton id="10" onClick={(e:any)=>props.onClick(e.target.id)}>Week 10</ModalButton>
            </div>
        </div>
    )
}
export default WeekDropDown;