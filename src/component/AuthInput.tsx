import React, { ChangeEvent, useState, useEffect } from "react";
import styled from "styled-components";

type PageProps = {
    name: string;
    placeholder: string;
    label: string;
    match?: string;
    type: string;
    errorMsg: string;
    setSharedState?: React.Dispatch<React.SetStateAction<string>>
}


const Input = styled.input`
 border-width: 0.13rem;
 border-style: solid;
 outline: unset;
 width: calc(100% - 3.5rem);
 padding: 0.8rem 1.5rem;
 font-size: 1rem;
 line-height: 1.5rem;
 color: #21334f;
 @media screen and (max-width: 396px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    width: calc(100% - 2.2rem);
    line-height: 1rem;
}
 ::placeholder,
 ::-webkit-input-placeholder {
   color: #21334F59;
   font-weight: 200;
 }
 :-ms-input-placeholder {
    color: #21334F59;
    font-weight: 200;
 }
`

const AuthInput = (props: PageProps) => {
    const { label, name, placeholder, type, errorMsg, setSharedState } = props;
    const [err, errOccured] = useState(false);
    const [value, setValue] = useState("");
    const [color, setColor] = useState('#CFD0D145')

    function handleInput(e: ChangeEvent<HTMLInputElement> ) {
        e.preventDefault();
        setValue(e.target.value.trim());
        if(typeof setSharedState !== 'undefined') {
            setSharedState(e.target.value.trim());
        }
        if(type === 'email') {
            const atposition = value.indexOf("@");  
            const dotposition = value.lastIndexOf(".");  
            if ((atposition < 1) || (dotposition < atposition + 2) || (dotposition === (value.length - 1))){  
                setColor('red');
                errOccured(true);
            }  else {
                if(color !== '#CFD0D145'){
                    setColor('green');
                    errOccured(false);
                    setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                }
            }
        }
        if(type === 'password') {
            if ( value.length > 3 && new RegExp('^[a-zA-Z0-9@_:;]{3,30}$', 'g').test(value)) {
                if(props.match){
                    if(value !== props.match) {
                        setColor('red');
                        errOccured(true);
                    } else {
                        if(color !== '#CFD0D145'){
                            setColor('green');
                            errOccured(false);
                            setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                        }
                    }
                } else if(color !== '#CFD0D145'){
                    setColor('green');
                    errOccured(false);
                    setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                }
            } else {
                setColor('red')
                errOccured(true)
            }
        }
    }

    useEffect(()=>{
        if(value && type === 'email') {
            const atposition = value.indexOf("@");  
            const dotposition = value.lastIndexOf(".");  
            if ((atposition < 1) || (dotposition < atposition+2) || (dotposition === (value.length - 1))){  
                setColor('red');
                errOccured(true);
            }  else {
                if(color !== '#CFD0D145'){
                    setColor('green');
                    errOccured(false);
                    setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                }
            }
        }

    
        if(value && type === 'password') {
            if ( value.length > 3 && new RegExp('^[a-zA-Z0-9@_:;]{3,30}$', 'g').test(value)) {
                if(props.match){
                    if(value !== props.match) {
                        setColor('red');
                        errOccured(true);
                    } else {
                        if(color !== '#CFD0D145'){
                            setColor('green');
                            errOccured(false);
                            setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                        }
                    }
                } else if(color !== '#CFD0D145'){
                    setColor('green');
                    errOccured(false);
                    setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                }
            } else {
                setColor('red')
                errOccured(true)
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, color])

    return (
        <div style={{ marginBottom: '1.5rem', width: '100%' }}>
            <label style={{ 
                fontWeight: '600',
                 marginBottom: '1rem',
                 color: '#21334F',
                 display: 'block' }}>{label}</label>
            <Input
                type={type}
                value={value}
                style={{ borderColor: `${color}`}}
                placeholder={`Enter ${placeholder}`}
                onChange={handleInput}
                onBlur={handleInput}
                onFocus={handleInput}
                name={name}
            />
            {
                !err ?  null : <small style={{ color: `${color}`}}>{errorMsg}</small>
            }
        </div>
    )
}

export default AuthInput;