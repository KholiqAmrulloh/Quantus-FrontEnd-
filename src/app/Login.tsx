"use client";
import styles from './page.module.css';
import bg from '../../public/assets/images/blurry.png';
import * as apiEndPoints from '../constants/api-endpoints';
import axios from '../apis/app-axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Login = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const Router = useRouter();
     const styling = {
          backgroundImage: `url(${bg.src})`,
     }

     const doLogin = () => {
          axios.post(apiEndPoints.LOGIN, {
               email: email,
               password: password
          }).then(res => {
               console.log('Login berhasil')
               Cookies.set('token', res.data.token)
               Router.push('/dashboard')
          }).catch(e => {
               alert('Username atau password salah !')
          })
     }

     useEffect(() => {
          if (Cookies.get('token')) {
               Router.push('/dashboard')
          }
     }, [])

     return (
          <div className={styles.background} style={styling}>
               <div className="flex h-screen w-screen justify-center items-center">
                    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                         <form className="space-y-6" action="#">
                              <div>
                                   <h5 className="text-xl font-medium mb-2 text-black dark:text-white text-center">Login</h5>
                                   <p className='text-sm text-center'>Welcome back, enter your credentials to continue</p>
                              </div>
                              <div>
                                   <label className="block mb-2 text-sm font-medium text-black dark:text-white">Email</label>
                                   <input autoComplete='none' type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
                              </div>
                              <div>
                                   <label className="block mb-2 text-sm font-medium text-black dark:text-white">Password</label>
                                   <input type="password" name="password" id="password" placeholder="Enter password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={e => setPassword(e.target.value)} required />
                              </div>
                              <div className="flex items-start">
                                   <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                             <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                        </div>
                                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                   </div>
                              </div>
                              <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={doLogin}>
                                   Login
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     )
}

export default Login;

