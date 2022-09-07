import { Input } from '../styling/css';
import { useState, useEffect, ChangeEvent } from 'react';

type PageProps = {
    name: string;
    placeholder?: string;
    label: string;
    match?: string;
    firstValue?: string;
    disabled?: boolean;
    type: string;
    errorMsg?: string;
    presetValue?: string;
    setSharedState?: React.Dispatch<React.SetStateAction<string>> | ( (param: string) => void )
}


const FormInput2 = (props: PageProps): JSX.Element => {
    const { label, name, placeholder, type, errorMsg, setSharedState, firstValue, disabled, presetValue } = props;
    const [err, errOccured] = useState(false);
    const [value, setValue] = useState(firstValue ? `${firstValue}` : "");
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
        if(value && type === 'text') {
            if(value.length < 2) {
                setColor('red');
                errOccured(true);
            } else {
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
        <div style={{ width: '100%', marginBottom: '0.8rem' }}>
            <label style={{ 
                fontWeight: '400',
                 marginBottom: '0.7rem',
                 color: '#21334F',
                 display: 'block' }}>{label}</label>
            <Input
                type={type}
                value={presetValue || value}
                style={{ borderColor: `${color}`, borderStyle: 'solid', borderWidth: '0.5px'}}
                placeholder={`${placeholder}`}
                onChange={handleInput}
                onBlur={handleInput}
                onFocus={handleInput}
                name={name}
                disabled={disabled}
            />
            {
                !err ?  null : <small style={{ color: `${color}`}}>{errorMsg}</small>
            }
        </div>
    )
}

export default FormInput2;