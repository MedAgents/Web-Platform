"use client"
import { setCurrentPage } from '@/RTK/features/sidebar';
import Sidebar from '@/my_components/Individual/sidebar/sidebar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './page.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import MyCartMain from '@/my_components/myCartMain/myCartMain';
import ReportMain from '@/my_components/reportMain/ReportMain';
import VitalsMain from '@/my_components/vitalsMain/VitalsMain';
import SupportMain from '@/my_components/SupportMain/SupportMain';
import DocViewMain from '@/my_components/DocViewMain/DocViewMain';
// import { BACKEND_URI } from '@/CONSTANTS';
// import axios from 'axios';

function Page({ params }: any) {
    const dispatcher = useDispatch();
    const currentPage = params.pageName;
    useEffect(() => {
        // try {
        //     // Verify access token
        //     const accessTokenResponse = axios.post(`${BACKEND_URI}/auth/verifyAccessToken`);
        //   } catch (error) {
        //   }
        dispatcher(setCurrentPage({currentPage: currentPage}));
        console.log(currentPage);
    });

    return (
        <div className='w-full h-screen bg-bgColor flex'>
        <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
            <Sidebar/>
            {currentPage == "myCart" &&  <MyCartMain/>}
            {currentPage === "history" && <ReportMain/>}
            {currentPage == "expenses" &&  <VitalsMain/>}
            {currentPage == "wishlist" &&  <SupportMain/>}
            {currentPage == "priceTracker" &&  <DocViewMain/>}
        </div>
    )
}

export default Page
