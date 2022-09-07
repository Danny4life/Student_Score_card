// http://localhost:4000/users/scores/weekly/630a5eacfbcf2824c57f9578

import React, { FC, useEffect, useState } from "react";
import { Card } from "../component";
import {AiOutlineCalendar} from 'react-icons/ai'
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
import axios from "axios";

type WeeksPerformanceProps = {

};

type PerformanceProps ={
  index: number
  el: any
  // user: string

}

// let index = 0;
const BASEURL = process.env.REACT_APP_BASEURL;


const PerformanceTracker: any = (props: WeeksPerformanceProps) => {
  const [displayPerformance, setDisplayPerformance] = useState<any>([]);
  
  
  // let admin = localStorage.getItem('admin');
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('id');
  
  if(token !== null){
    token = token;
  }

  useEffect(() => {
    (async () => {
      // const scoresEndpoint = await axios.get(),
      const result = await axios.get(`${BASEURL}/users/scores/weekly/${userId}`,
      {headers: {"Authorization": `Bearer ${token}`}}
      )

      setDisplayPerformance([...result.data.data]);
      console.log(result.data.data);
    })();
  }, []);

  return (
    <>
      <div style={{ margin: '0 3rem', width: '63rem'}} className="user-dashboard ">
        <div className="dash-header" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "1.5rem 0rem 2rem"}}>
          <div className="overview"> Scorecard </div>
        </div>
        <CardDashboard>
          <Table>
            <Thead>
                <Tr>
                  <Th>Weeks</Th>
                  <Th>Algorithms</Th>
                  <Th>Weekly Tasks</Th>
                  <Th>Assessment Test</Th>
                  <Th>Agile Test</Th>
                  <Th>Cummulative Score</Th>
                </Tr>
              </Thead>
              <Tbody>
              {displayPerformance.map((el: any, index:number) => {
                return (
                <Tr>
                  <Td>Week {index +=1}</Td>
                  <Td>{el.algorithm}</Td>
                  <Td>{el.weeklyTask }</Td>
                  <Td>{el.assessment }</Td>
                  <Td>{el.agileTest }</Td>
                  <Td>{el.cummulative }</Td>
                </Tr>
              )})}
              </Tbody>
          </Table>
        </CardDashboard>
      </div>
    </>
  );
};

export default PerformanceTracker;
