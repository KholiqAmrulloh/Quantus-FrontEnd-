"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Input, Modal, Form, FormItemProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faAdd } from "@fortawesome/free-solid-svg-icons";
import TopBar from '../components/topbar';
import * as apiEndPoints from '../../constants/api-endpoints';
import axios from '@/apis/app-axios';
import Cookie from 'js-cookie';
import { User } from '@/type/user.type';
import { Paginated } from '@/type/api-response/paginated.type';
import { sprintf } from 'sprintf-js';
import { useRouter } from 'next/navigation';

const Search = Input.Search;

const UserManagement = () => {
     const Router = useRouter();
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
     const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
     const [dataUser, setDataUser] = useState<User[]>([])
     const [employee, setEmployee] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const [department, setDepartment] = useState('');
     const [is_active, setIs_Active] = useState('');
     const [statusUser, setStatusUser] = useState('');
     const [detailUser, setDetailUser] = useState([]);
     const [recordModal, setRecordModal] = useState<User>();

     const showModal = () => {
          setIsModalOpen(true);
     };

     const handleCancel = () => {
          setIsModalOpen(false);
     };
     const handleDeleteCancel = () => {
          setIsModalDeleteOpen(false);
     };
     const handleUpdateCancel = () => {
          setIsModalUpdateOpen(false);
     };

     //create user
     const CreateUser = () => {
          axios.post(apiEndPoints.CREATE, {
               employee: employee,
               email: email,
               password: password,
               confirm_password: confirmPassword,
               departement: department,
               is_active: true
          }).then(res => {
               setIsModalOpen(false);
               axios.get<Paginated>(apiEndPoints.GET_ALL_USER)
                    .then(res => {
                         setDataUser(res.data.results)
                    })
          }).catch(e => {
               console.log(JSON.stringify(e))
          })
     }

     const doUpdate = () => {
          axios.put(sprintf(apiEndPoints.UPDATE_USER, recordModal?.id), {
               employee: employee,
               email: email,
               password: password,
               confirm_password: confirmPassword,
               departement: department,
               is_active: statusUser
          })
               .then(res => {
                    console.log('update success')
                    setIsModalUpdateOpen(false)
                    axios.get<Paginated>(apiEndPoints.GET_ALL_USER)
                         .then(res => {
                              setDataUser(res.data.results)
                         })
               })
     }

     const doDelete = () => {
          axios.delete(sprintf(apiEndPoints.DELETE_USER, recordModal?.id))
               .then(res => {
                    setIsModalDeleteOpen(false)
                    axios.get<Paginated>(apiEndPoints.GET_ALL_USER)
                         .then(res => {
                              setDataUser(res.data.results)
                         })
               })
     }

     //get cookie

     useEffect(() => {
          if (Cookie.get('token') == '') {
               Router.push('/')
          }
     }, [])

     //get all user
     useEffect(() => {
          axios.get<Paginated<User[]>>(apiEndPoints.GET_ALL_USER)
               .then(res => {
                    setDataUser(res.data.results)
               })
     }, [])

     const columns: ColumnsType<User> = [
          {
               title: 'Employee',
               dataIndex: 'employee',
               key: 'employee',
               render: (text) => <a>{text}</a>,
          },
          {
               title: 'Email',
               dataIndex: 'email',
               key: 'email',
          },
          {
               title: 'Department',
               dataIndex: 'department',
               key: 'department',
          },
          {
               title: 'Status',
               key: 'is_active',
               dataIndex: 'is_active',
               // render: (_, tags) => (
               //      <>
               //           {tags.map((tag) => {
               //                let color = 'green';
               //                if (tag === 'not active') {
               //                     color = 'volcano';
               //                }
               //                return (
               //                     <Tag color={color} key={tag}>
               //                          {tag.toUpperCase()}
               //                     </Tag>
               //                );
               //           })}
               //      </>
               // ),
               render: (_, tags) => (
                    <>
                    </>
               )
          },
          {
               title: 'Action',
               key: 'action',
               render: (text, record) => (
                    <Space size="middle">
                         <Button
                              style={{ backgroundColor: 'black' }}
                              onClick={() => {
                                   setIsModalUpdateOpen(true)
                                   setRecordModal(record);
                              }}>
                              <FontAwesomeIcon icon={faPencil} color="white" />
                         </Button>
                         <Button
                              style={{ backgroundColor: 'red' }}
                              onClick={() => {
                                   setIsModalDeleteOpen(true)
                                   setRecordModal(record)
                              }}>
                              <FontAwesomeIcon icon={faTrash} color='white' />
                         </Button>
                    </Space>
               ),
          },
     ];

     return (
          <>
               <TopBar />
               <div className='py-4 w-full'>
                    <div className='bg-gray-100 px-5'>
                         <div className='flex'>
                              <div className='flex-1 font-bold text-lg'>
                                   User Management
                                   <div className='text-sm text-gray-500 font-thin'>
                                        User
                                   </div>
                              </div>
                              <div className='flex justify-end space-x-2'>
                                   <Search
                                        size="middle"
                                        placeholder="Search Name"
                                   />
                                   <Button style={{ backgroundColor: 'green', color: 'white' }} className="space-x-3" onClick={showModal}>
                                        <FontAwesomeIcon icon={faAdd} color="white" />
                                        Create User
                                   </Button>
                              </div>
                         </div>
                         <div className='py-5'>
                              <Table columns={columns} dataSource={dataUser} />
                         </div>
                    </div>
               </div>
               <Modal title="Create User"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={[
                         <>
                              <Button style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleCancel}>Cancel</Button>
                              <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={CreateUser}>Create</Button>
                         </>
                    ]}
               >
                    <Form>
                         <div>
                              <label>Employee</label>
                              <div>
                                   <input type="employee" name='employee' id='employee' className='border w-full py-1 px-2' onChange={e => setEmployee(e.target.value)} required />
                              </div>
                         </div>
                         <div>
                              <label>Email</label>
                              <div>
                                   <input autoComplete='none' type="email" name='email' id='email' className='border w-full py-1 px-2' onChange={e => setEmail(e.target.value)} required />
                              </div>
                         </div>
                         <div>
                              <label>Password</label>
                              <div>
                                   <input type="password" name='password' id='password' className='border w-full py-1 px-2' onChange={e => setPassword(e.target.value)} required />
                              </div>
                         </div>
                         <div>
                              <label>Confirm Password</label>
                              <div>
                                   <input type="password" name='confirmpassword' id='confirmpassword' className='border w-full py-1 px-2' onChange={e => setConfirmPassword(e.target.value)} required />
                              </div>
                         </div>
                         <div>
                              <label>Department</label>
                              <div>
                                   <input type="department" name='department' id='department' className='border w-full py-1 px-2' onChange={e => setDepartment(e.target.value)} required />
                              </div>
                         </div>
                    </Form>
               </Modal>
               <Modal title="Delete User"
                    open={isModalDeleteOpen}
                    onCancel={handleDeleteCancel}
                    footer={[
                         <>
                              <Button onClick={handleDeleteCancel} style={{ backgroundColor: 'gray', color: 'white' }}>Cancel</Button>
                              <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={doDelete}>Delete</Button>
                         </>
                    ]}
               >
                    Are you sure want to delete this user ?
               </Modal>
               <Modal title="Update User"
                    open={isModalUpdateOpen}
                    onCancel={handleUpdateCancel}
                    footer={[
                         <>
                              <Button style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleUpdateCancel}>Cancel</Button>
                              <Button title='Submit' style={{ backgroundColor: 'blue', color: 'white' }} onClick={doUpdate}>Update</Button>
                         </>
                    ]}
               >
                    <Form>
                         <div>
                              <label>Employee</label>
                              <div>
                                   <input type="employee" name='employee' id='employee' className='border w-full py-1 px-2' onChange={e => setEmployee(e.target.value)} value={recordModal?.employee} required />
                              </div>
                         </div>
                         <div>
                              <label>Email</label>
                              <div>
                                   <input type="email" name='email' id='email' className='border w-full py-1 px-2' value={recordModal?.email} onChange={e => setEmail(e.target.value)} required />
                              </div>
                         </div>
                         <div>
                              <label>Password</label>
                              <div>
                                   <input type="password" name='password' id='password' className='border w-full py-1 px-2' onChange={e => setPassword(e.target.value)} value={recordModal?.password} required />
                              </div>
                         </div>
                         <div>
                              <label>Confirm Password</label>
                              <div>
                                   <input type="password" name='confirmpassword' id='confirmpassword' className='border w-full py-1 px-2' onChange={e => setConfirmPassword(e.target.value)} value={recordModal?.confirm_password} required />
                              </div>
                         </div>
                         <div>
                              <label>Department</label>
                              <div>
                                   <input type="department" name='department' id='department' className='border w-full py-1 px-2' onChange={e => setDepartment(e.target.value)} value={recordModal?.department} required />
                              </div>
                         </div>
                         <div>
                              <label>Status</label>
                              <div>
                                   <input type="status" name='status' id='status' className='border w-full py-1 px-2' onChange={e => setStatusUser(e.target.value)} value={recordModal?.department} required />
                              </div>
                         </div>
                    </Form>

               </Modal>
          </>
     );
}

export default UserManagement;