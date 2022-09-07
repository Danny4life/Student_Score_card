import { Input } from '../styling/css';
import { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';

type PageProps = {
    // name: string;
    // label: string;
    // match?: string;
    // firstValue?: string;
    // disabled?: boolean;
    // type: string;
    // errorMsg: string;
    // presetValue?: string;
    // setSharedState?: React.Dispatch<React.SetStateAction<string>> | ( (param: string) => void );

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

const FormSelect = (props: PageProps) => {
    // const { label, name, type, errorMsg, setSharedState, firstValue, disabled, presetValue } = props;
    // const [err, errOccured] = useState(false);
    // const [value, setValue] = useState(firstValue ? `${firstValue}` : "");
    // const [color, setColor] = useState('#CFD0D145');
    const [modal, showModal] = useState(false);

    // function handleChange(e: ChangeEvent<HTMLInputElement> ) {
    //     e.preventDefault();
    //     setValue(e.target.value.trim());
    //     if(typeof setSharedState !== 'undefined') {
    //         setSharedState(e.target.value.trim());
    //     }
    //     if(value && type === 'text') {
    //         if(value.length < 2) {
    //             setColor('red');
    //             errOccured(true);
    //         } else {
    //             if(color !== '#CFD0D145'){
    //                 setColor('green');
    //                 errOccured(false);
    //                 setTimeout(()=>{ setColor('#CFD0D145') }, 700)
    //             }
    //         }
    //     }
    // }

    // function handleBlur() {
    //     showModal(false);
    //     if(value && type === 'text') {
    //         if(value.length < 2) {
    //             setColor('red');
    //             errOccured(true);
    //         } else {
    //             if(color !== '#CFD0D145'){
    //                 setColor('green');
    //                 errOccured(false);
    //                 setTimeout(()=>{ setColor('#CFD0D145') }, 700)
    //             }
    //         }
    //     }
    // }

    // function handleFocus() {
    //     showModal(true);
    // }

    useEffect(()=>{
        
    //     if(value && type === 'text') {
    //         if(value.length < 2) {
    //             setColor('red');
    //             errOccured(true);
    //         } else {
    //             if(color !== '#CFD0D145'){
    //                 setColor('green');
    //                 errOccured(false);
    //                 setTimeout(()=>{ setColor('#CFD0D145') }, 700)
    //             }
    //         }
    //     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ ])
 
    return (
        <div style={{ width: '100%', marginBottom: '0.8rem', position: 'relative' }}>
            <span onClick={() => {showModal(!modal)}} style={{cursor: 'pointer'}}>...</span>
            {/* <label style={{ 
                fontWeight: '400',
                 marginBottom: '0.7rem',
                 color: '#21334F',
                 display: 'block' }}>{label}</label>
            <Input
                type={type}
                value={presetValue || value}
                style={{ borderColor: `${color}`, borderStyle: 'solid', borderWidth: '0.5px'}}
                placeholder='Select'
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                name={name}
                disabled={disabled}
            />
            {
                !err ?  null : <small style={{ color: `${color}`}}>{errorMsg}</small>
            } */}
            <div style={{ 
                position: 'absolute', 
                display: (modal ? 'inline-flex' : 'none'),
                boxShadow: '0px 0px 5px grey',
                flexDirection: 'column',
                top: '2rem',
                left: '0',
                background: 'white',
                zIndex: '1000',
                minWidth: '15rem',
                minHeight: '13rem',
                justifyContent: 'space-around',
                padding: '0.8rem 0'
            }}>
                <ModalButton>Edit</ModalButton>
                <ModalButton>Activate</ModalButton>
                <ModalButton>Deactivate</ModalButton>
                <ModalButton>Delete</ModalButton>
            </div>
        </div>
    )
}

export default FormSelect;