"use client"
import React from 'react'
import { Space, Tag, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import TopBar from '../components/topbar'

export default function Sales() {

     interface DataType {
          key: string;
          productsname: string;
          categories: string[];
          amount: string;
          itemssold: string,
          price: string,
          sales: string,
     }

     const columns: ColumnsType<DataType> = [
          {
               title: 'Products Name',
               dataIndex: 'productsname',
               key: 'productsname',
               render: (text) => <a>{text}</a>,
          },
          {
               title: 'Categories',
               key: 'categories',
               dataIndex: 'categories',
               render: (_, { categories }) => (
                    <>
                         {categories.map((tag) => {
                              let color = 'geekblue';
                              return (
                                   <Tag color={color} key={tag}>
                                        {tag.toUpperCase()}
                                   </Tag>
                              );
                         })}
                    </>
               ),
          },
          {
               title: 'Amount',
               dataIndex: 'amount',
               key: 'amount',
          },
          {
               title: 'Items Sold',
               dataIndex: 'itemssold',
               key: 'itemssold',
          },
          {
               title: 'Price',
               dataIndex: 'price',
               key: 'price',
          },
          {
               title: 'Sales',
               dataIndex: 'sales',
               key: 'sales',
          }
     ];

     const data: DataType[] = [
          {
               key: '1',
               productsname: 'Nighthawk R7800',
               categories: ['Technology'],
               amount: '27 in stock',
               itemssold: '3',
               price: 'Rp. 4,850,000',
               sales: 'Rp. 14,550,000'
          },
          {
               key: '2',
               productsname: 'WN821N',
               categories: ['Technology'],
               amount: '45 in stock',
               itemssold: '22',
               price: 'Rp. 565,000',
               sales: 'Rp. 12,430,000'
          },
          {
               key: '3',
               productsname: 'R6330 Netgear',
               categories: ['Technology'],
               amount: '20 in stock',
               itemssold: '6',
               price: 'Rp. 3,215,000',
               sales: 'Rp. 19,290,000'
          },
          {
               key: '4',
               productsname: 'Webcam C310',
               categories: ['Technology'],
               amount: '52 in stock',
               itemssold: '10',
               price: 'Rp. 399,000',
               sales: 'Rp. 3,990,000'
          },
          {
               key: '5',
               productsname: 'Arlo Pro 4',
               categories: ['Technology'],
               amount: '2 in stock',
               itemssold: '4',
               price: 'Rp. 6,550,000',
               sales: 'Rp. 26,200,000'
          },
     ];
     return (
          <>
               <TopBar />
               <div className='py-4 w-full'>
                    <div className='bg-gray-100 px-5'>
                         <div className='flex'>
                              <div className='flex-1 font-bold text-lg'>
                                   Sales
                                   <div className='text-sm text-gray-500 font-thin'>
                                        June, 2022
                                   </div>
                              </div>
                         </div>
                         <div className='py-5'>
                              <Table columns={columns} dataSource={data} />
                         </div>
                    </div>
               </div>
          </>
     )
}
