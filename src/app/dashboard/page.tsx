"use client"
import TopBar from "../components/topbar";
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js'
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);
import { Doughnut, Bar } from "react-chartjs-2";
import { Card } from "antd";
const Dashboard = () => {
     const data1 = {
          labels: ['22 Mei', '23 Mei', '24 Mei', '25 Mei', '26 Mei', '27 Mei', '28 Mei'],
          datasets: [
               {
                    label: "Reps",
                    backgroundColor: "green",
                    data: [80, 110, 150, 185, 105, 50, 40]
               },
               {
                    label: "Reps",
                    backgroundColor: "#FFCE56",
                    data: [50, 100, 60, 195, 90, 30, 70]
               },
          ]
     };

     const data2 = {
          labels: [
               'Red',
               'Green',
               'Yellow'
          ],
          datasets: [{
               data: [300, 50, 100],
               backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
               ],
               hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
               ]
          }]
     };
     return (
          <>
               <TopBar />
               <div className="flex flex-row space-x-3 px-4">
                    <div className="flex-1">
                         <Card title='Card Title' className="w-full">
                              <Bar
                                   data={data1}
                                   height={50}
                                   options={{
                                        indexAxis: 'y'
                                   }}
                              />
                         </Card>
                    </div>
                    <div className="flex-1 justify-center items-center">
                         <Card title='Card Title' className="w-full">
                              <Doughnut
                                   data={data2}
                                   width={50}
                                   height={50}
                              />
                         </Card>
                    </div>
               </div>
          </>
     )
}

export default Dashboard;