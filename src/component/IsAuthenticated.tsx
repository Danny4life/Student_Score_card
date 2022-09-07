import React, { useEffect } from 'react';
import {Navigate} from 'react-router-dom';

interface IAuthenticated{
    userRole: string[],
    children: React.ReactNode

}

const IsAuthenticated=(props: IAuthenticated)=>{
    const ROLE = localStorage.getItem('role')

    if(props.userRole.includes(ROLE as string)){
        return <>{props.children}</>
    }

    return <Navigate to="/login" />
}

export default IsAuthenticated;