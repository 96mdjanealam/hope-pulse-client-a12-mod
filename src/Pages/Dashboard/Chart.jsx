import React from 'react'
import useAllFunding from '../../hooks/useAllfunding'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { format } from 'date-fns';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Rectangle,
    ResponsiveContainer,
  } from "recharts";

const Chart = () => {

   const axiosSecure = useAxiosSecure();

    const { data: allFunding10 = [] } = useQuery({
        queryKey: ["allFunding10"],
        queryFn: async () => {
          const res = await axiosSecure.get("/allFunding10");
          return res.data;
        },
      });

      const amountDateArray = allFunding10.map(funding => ({
        amount: funding.amount,
        date: format(new Date(funding.date), 'dd-MM-yyyy') // Format the date
      }));
    
      console.log(amountDateArray);

  return (
    <div >
        <h2 className='text-center mb-4 mt-10 text-xl'>Last 10 donations by date</h2>
        <div className='lg:w-4/5 mx-auto'>
        <ResponsiveContainer className='border-2 rounded-xl pt-4' width={"100%"} height={300}>
      <BarChart
        data={amountDateArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="amount"
          fill="#FF5F5E"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
        </div>
        
    </div>
  )
}

export default Chart