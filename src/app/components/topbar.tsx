"use client"
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from '@/apis/app-axios';
import { sprintf } from 'sprintf-js';
import * as apiEndPoints from '@/constants/api-endpoints';

const TopBar = () => {
     const Router = useRouter();
     const doLogout = () => {
          Cookie.remove('token')
          Router.push('/')
     }

     return (
          <div className='flex justify-end px-5 py-6 items-center space-x-3'>
               <button onClick={doLogout}>
                    Logout <FontAwesomeIcon icon={faChevronDown} />
               </button>
          </div>
     );
}

export default TopBar;