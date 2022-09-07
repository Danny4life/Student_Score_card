import { useState, useEffect } from "react";
import './DecadevOverview.css';
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "User Performance Chart",
      position: "top" as const,
    },
    toolTip: { display: true },
  },
};


interface ResultType {
    agileTest?: number;
    algorithm?: number;
    assessment?: number;
    cummulative?: number;
    weeklyTask?: number;
    diffAgile?: number;
    diffAlgorithm?: number;
    diffAssessment?: number;
    diffCummulative?: number;
    diffWeeklyTask?: number;
}

const BASEURL = process.env.REACT_APP_BASEURL;
const axiosHeader = { 
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    } 
}

const Overview = () => {
  const [result, setResult] = useState({} as ResultType);
  const [tracker, setTracker] = useState([]);

  const getUserGrades = async () => {
    try {
        const result = await axios.get(`${BASEURL}/users/scores/weekly/${localStorage.getItem('id')}`, axiosHeader)
        if(result.data.message === 'Success') {
            setTracker(result.data.data);
        }
    } catch (err) {
        console.error(err);
    }
  };
  const getUserCurrentPerformance = async () => {
    try {
        const result = await axios.get(`${BASEURL}/users/get_current_performance/${localStorage.getItem('id')}`, axiosHeader)
        if(result.data.message === 'Success') {
            const {
                agileTest, algorithm, weeklyTask, assessment,percentageDifferenceAgile,
                percentageDifferenceAlgorithm,
                percentageDifferenceAssessment,
                percentageDifferenceWeeklyTask
            } = result.data.data
            setResult({
                agileTest, algorithm, weeklyTask, assessment,
                diffAgile: +percentageDifferenceAgile,
                diffAlgorithm: +percentageDifferenceAlgorithm,
                diffAssessment: +percentageDifferenceAssessment,
                diffWeeklyTask: +percentageDifferenceWeeklyTask            
            })
        }
    } catch(err) {
        console.error(err);
    }
};
  
  useEffect(() => {
    getUserGrades();
    getUserCurrentPerformance();
  }, []);

  const labels = tracker.map((_, i: number) => `week ${i + 1}`);
  const data1 = tracker.map((ele: ResultType) => ele.agileTest);
  const data2 = tracker.map((ele: ResultType) => ele.algorithm);
  const data3 = tracker.map((ele: ResultType) => ele.weeklyTask);
  const data4 = tracker.map((ele: ResultType) => ele.assessment);
  labels.unshift("0");
  data1.unshift(0);
  data2.unshift(0);
  data3.unshift(0);
  data4.unshift(0);
  const data = {
    labels,
    datasets: [
      {
        label: "Agile Test",
        data: data1,
        borderWidth: 0.4,
        borderColor: "rgb(214, 223, 13)",
        fill: true,
        backgroundColor: "rgba(214, 223, 13, 0.3)",
        lineTension: 0.55,
        pointRadius: 0,
      },
      {
        label: "Algorithm",
        data: data2,
        borderWidth: 0.4,
        borderColor: "rgb(0, 123, 3)",
        fill: true,
        backgroundColor: "rgba(0, 123, 3, 0.4)",
        lineTension: 0.55,
      },
      {
        label: "Weekly Task",
        data: data3,
        borderWidth: 0.4,
        borderColor: "rgb(249, 95, 52)",
        fill: true,
        backgroundColor: "rgba(249, 0, 52, 0.3)",
        lineTension: 0.55,
      },
      {
        label: "Assessement Test",
        data: data4,
        borderWidth: 0.4,
        borderColor: "rgb(77, 250, 157)",
        fill: true,
        backgroundColor: "rgba(119, 241, 55, 0.3)",
        lineTension: 0.55,
      },
    ],
  }
  return (
    <>
      {Object.keys(result).length > 0 && <div className="user-dashboard">
        <div className="dash-header">
          <div className="overview">
            <p>Overview</p>
          </div>
          <div className="logic-board">
            <div className="logic-item">
              <p>Algorithm</p>
              <div className="logic-item-text">
                <div className="item-score">{result.algorithm}</div>
                <div className="percent-change">
                  <span>
                    {(result?.diffAlgorithm || 0) > 0 ? <BsArrowUp /> : <BsArrowDown className="down-arrow" />}
                  </span>
                  {result?.diffAlgorithm || 0}%
                </div>
              </div>
            </div>
            <div className="logic-item">
              <p>Weekly Task</p>
              <div className="logic-item-text">
                <div className="item-score">{result.weeklyTask}</div>
                <div className="percent-change">
                  <span>
                  {(result?.diffWeeklyTask || 0) > 0 ? <BsArrowUp /> : <BsArrowDown className="down-arrow" />}
                  </span>
                  {result?.diffWeeklyTask || 0}%
                </div>
              </div>
            </div>
            <div className="logic-item">
              <p>Assessement Test</p>
              <div className="logic-item-text">
                <div className="item-score">{result.assessment}</div>
                <div className="percent-change">
                  <span>
                  {(result?.diffAssessment || 0) > 0 ? <BsArrowUp /> : <BsArrowDown className="down-arrow" />}
                  </span>
                  {result?.diffAssessment || 0}%
                </div>
              </div>
            </div>
            <div className="logic-item">
              <p>Agile</p>
              <div className="logic-item-text">
                <div className="item-score">{result.agileTest}</div>
                <div className="percent-change">
                  <span>
                  {(result?.diffAgile || 0) > 0 ? <BsArrowUp /> : <BsArrowDown className="down-arrow" />}
                  </span>
                  {result?.diffAgile || 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sheet-container">
          <div className="sheet-title">Weekly Performance Score</div>
          <div className="sheet-body">
            <div className="chart-colors">
              <div className="chart-yellow"></div>
              <div className="chart-blue"></div>
              <div className="chart-red"></div>
              <div className="chart-green"></div>
            </div>
            <div className="chart-board">
              {(tracker.length > 0) && <Line className="chart" options={options} data={data} />}
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};
export default Overview;