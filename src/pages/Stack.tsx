import React, { FC, useState, useEffect } from 'react';
import {EmptyStack, CreatedStack, CreateStackModal} from '../component';
import axios from 'axios';


const BASEURL = process.env.REACT_APP_BASEURL;
type StackProps = {};

const Stack: FC = function ( props: StackProps) {
    let arr: any = [];
    const [stackData, setStackData] = useState(arr)
    const [page, setPage] = useState({
        showModal: false,
        showEmptyStack: true,
        showCreatedStack: false
    })

    const toggleStack = function(){
        setPage ((prevState: any) => {
            return {...prevState, showModal: true}
        })
    }

    const toggleStackOff = function(){
        setPage((prevState) => {
            return { ...prevState, showModal: false}
        })
    }
    
    let stackDataArray: any = [];
    const getStackPage =function(){
        setPage((prevState) => {
            return { showModal: false, showEmptyStack: false, showCreatedStack: true}
        })
        setStackData([...stackDataArray])
    }
    const token = localStorage.getItem('token')
    //Get and save stack records.
    useEffect(() => {
        axios.get(`${BASEURL}/admin/view_all_stack`, {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                stackDataArray = [...res.data.data];
                if(stackDataArray.length > 0){
                    getStackPage();
                    
                }
                
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])




    return (
        <>         
            { page.showModal && < CreateStackModal onOffModalHandler = { toggleStackOff }  />}
            { page.showEmptyStack && < EmptyStack onChangeHandler = { toggleStack } />}
            { page.showCreatedStack && < CreatedStack stackDataArray={stackData} onChangeHandler = { toggleStack } />}
            {/* onModalChange={ modalChangeHandler }  */}
        </>
    )
}




export default Stack;

