import axios from 'axios';
import React, { FC, MouseEvent, useState, ChangeEvent, FormEvent } from 'react';
import swal from 'sweetalert';
import { FormInput2, Card, FormButton, Form } from ".";
import { Heading, Paragraph } from "../styling/css";
import { BsXLg } from "react-icons/bs";

type AddPerformanceScoreProps = {
  id: string;
  firstName?: string;
  lastName?: string;
  offModal: () => void;
};

const BASEURL = process.env.REACT_APP_BASEURL;

const AddPerformanceScoreModal = (props: AddPerformanceScoreProps) => {

  const { id, firstName, lastName, offModal} = props;

    const [performanceData, setPerformanceData] = useState({
        algorithm: "",
        weeklyTask: "",
        assessment: "",
        agileTest: "",
    });



      // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      //   setPerformanceData({
      //     ...performanceData,
      //     [e.target.name]: e.target.value,
      //   });
      // };
      let token = localStorage.getItem('token');
      
      if(token !== null){
        token = token;
      }

      const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const result = await axios.put(`${BASEURL}/admin/add_score/${id}`, performanceData, 
          {headers: {"Authorization": `Bearer ${token}`}}
          );
          console.log("From result: ",result.data)
          swal("Success", "You have successfully added weekly score");
          offModal();
          window.location.reload();
        } catch(err){
          console.error(err);
          swal("Error", "Something went wrong", "error");
        }
      }
    
  return (
    <div style={{ position: 'absolute', zIndex: '5', width: '60rem', left: '15%' }}>
        <Card>
        <div style={{position: 'relative'}}>
          <Paragraph>Add Scores for <b>{firstName}</b> <b>{lastName}</b></Paragraph>
          <button style={{ position: 'absolute', right: '2rem', top: '2rem', border: 'unset', backgroundColor: "transparent", color: "gray"}} onClick={offModal} ><BsXLg/></button>
        </div>

        <div style={{ padding: "2rem 2.5rem" }}>
          
          <Form
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormInput2
              label="First Name"
              placeholder="First Name"
              type="text"
              presetValue={firstName}
              name="firstName"
              disabled
            />

            <FormInput2
              label="Last Name"
              type="text"
              presetValue={lastName}
              name="lastName"
              disabled
            />

            <FormInput2
              label="Algorithms"
              type="Number"
              placeholder='Score'
              // presetValue={performanceData.algorithm}
              name="algorithm"
              setSharedState={(i: string) => {
                setPerformanceData({
                  ...performanceData,
                  algorithm: i
                })
              }}
            />

            <FormInput2
              label="Weekly Tasks"
              type="Number"
              placeholder='Score'
              // presetValue={performanceData.weeklyTask}
              name="weeklyTask"
              setSharedState={(i: string) => {
                setPerformanceData({
                  ...performanceData,
                  weeklyTask: i
                })
              }}
            />

            <FormInput2
              label="Assessment Test"
              type="Number"
              placeholder='Score'
              // presetValue={performanceData.assessment}
              name="assessment"
              setSharedState={(i: string) => {
                setPerformanceData({
                  ...performanceData,
                  assessment: i
                })
              }}
              
            />

            <FormInput2
              label="Agile Test"
              type="Number"
              placeholder='Score'
              // presetValue={performanceData.agileTest}
              name="agileTest"
              setSharedState={(i: string) => {
                setPerformanceData({
                  ...performanceData,
                  agileTest: i
                })
              }}
            />

            <FormButton text="Done" />

          </Form>
        </div>
        </Card>
    
    </div>
  )
}

export default AddPerformanceScoreModal;