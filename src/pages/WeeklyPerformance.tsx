import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Card } from "../component";
import styles from '../component/CreateStackModal.module.css';
import {AiOutlineCalendar} from 'react-icons/ai';
import AddPerformanceScore from '../component/AddPerformanceScoreModal'
import {
  Heading,
  Table,
  Td,
  Tr,
  Thead,
  Th,
  Tbody,
  CardDashboard,
} from "../styling/css";
import FormSelect2 from "../component/FormSelect2"
import axios from "axios";
import WeekDropDown from "./WeekPerformanceDropdown"

type AddWeeklyPerformanceProps = {
  //id: string;
  // firstName: string
};

type WeeklyTableProps ={
  count: number
  el: any
  // user: string

}


const BASEURL = process.env.REACT_APP_BASEURL;

const WeeklyTable = (props: WeeklyTableProps) => {
  return (
    <Tr key={props.count}>
      <Td>{props.count + 1}</Td>
      <Td>{props.el.user.firstName}</Td>
      <Td>{props.el.user.lastName}</Td>

      {
        Object.hasOwn(props.el, 'currentWeekScore') ?
        <>
          <Td>{props.el?.currentWeekScore.algorithm}</Td>
          <Td>{props.el?.currentWeekScore.weeklyTask }</Td>
          <Td>{props.el?.currentWeekScore.assessment }</Td>
          <Td>{props.el?.currentWeekScore.agileTest }</Td>
          <Td>{props.el?.currentWeekScore.cummulative }</Td>
        </>
        : 
        <>
          <Td>-</Td>
          <Td>-</Td>
          <Td>-</Td>
          <Td>-</Td>
          <Td>-</Td>
        </>
      }
      {/* <Td style={{cursor: 'pointer'}} className='action'>...</Td> */}
      <Td><FormSelect2 id={props.el.user._id} firstName={props.el.user.firstName} lastName={props.el.user.lastName}/></Td>
    </Tr>
  )  
}



const WeeklyPerformance: any = (props: AddWeeklyPerformanceProps) => {
  const [week, setWeek] = useState<any>(1);
  const [displayList, setDisplayList] = useState<any>([]);
  
  const weekChangeHandler = (id:string)=>{
    setWeek(id);
  }
  
  // let admin = localStorage.getItem('admin');
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('id');
  
  if(token !== null){
    token = token;
  }
  
  useEffect(() => {
    (async () => {
      // const scoresEndpoint = await axios.get(),
      const result = await axios.get(`${BASEURL}/admin/filter_score/${userId}?week=${week || 4}`,
      {headers: {"Authorization": `Bearer ${token}`}}
      )

      setDisplayList([...result.data]);
    })();
  }, [week]);

const weeklyTableList = () => {
  return displayList.map((el: any, index: number) => {
    return <WeeklyTable key={index} count={index} el={el} />
  })
}


  return (
    <>
      <div style={{ margin: '0 3rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Heading> Dashboard </Heading>
          <WeekDropDown onClick={weekChangeHandler}/>
        </div>
        <CardDashboard>
          <div style={{border: '1px solid #fff'}}>
            <h2 style={{ color: "#03435F", textAlign: "center" }}>Week {week}</h2>{" "}
          </div>
          <Table>
            <Thead>
                <Tr>
                  <Th>SN</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Algorithms</Th>
                  <Th>Weekly Tasks</Th>
                  <Th>Assessment Test</Th>
                  <Th>Agile Test</Th>
                  <Th>Cummulative Score</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {weeklyTableList()}
              </Tbody>

          </Table>
        </CardDashboard>
      </div>
    </>
  );
};

export default WeeklyPerformance;
