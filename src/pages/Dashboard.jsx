import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getDashboardData } from '../services/dashboard'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState()
    const navigate = useNavigate()

    useEffect(() => {

        const getDetails = async () => {
            try {
                const response = await getDashboardData();
                setDashboardData(response.data)
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        }
        getDetails()

    }, [])


    return (
        <>
            <Header />
            <div className='p-6 flex flex-col gap-4'>
                {/* NAVBAR */}
                <div className='flex justify-between items-center '>
                    <button
                        onClick={() => navigate('/students')}
                        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600  active:bg-gray-700">
                        Add / Manage student details
                    </button>
                    <button
                        onClick={() => navigate('/vaccination-update')}
                        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600  active:bg-gray-700">
                        Manage / Update vaccination status
                    </button>
                    <button
                        onClick={() => navigate('/report')}
                        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600  active:bg-gray-700">
                        Generate reports
                    </button>
                    <button
                        onClick={() => navigate('/drives')}
                        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600  active:bg-gray-700">
                        Book / View / Edit vaccination drives
                    </button>

                </div>
                <hr className='border-b-4 border-dotted ' />


                {/* COUNT */}
                <div className='mb-12 flex justify-around gap-4 rounded-2xl shadow-lg shadow-gray-400 bg-[#abf18b] p-5'>
                    <p className='text-3xl text-red-950'>Total Registered Students :   &nbsp;&nbsp;&nbsp; {dashboardData?.totalStudents}</p>
                    <p className='text-3xl text-red-950'> Vaccinated Students : &nbsp;&nbsp;&nbsp; {dashboardData?.vaxStudents} &nbsp;    {dashboardData?.totalStudents > 0 && dashboardData?.vaxStudents > 0 && `( ${Math.ceil((dashboardData?.vaxStudents / dashboardData?.totalStudents) * 100)}%)`}</p>
                </div>

                {/* DRIVES */}
                <p className='text-3xl'>Upcoming Drives <span className='text-[24px] text-gray-400 ml-4 '>(Next 30 days)</span></p>
                {dashboardData?.drives?.length > 0 ?
                    <>
                        {dashboardData?.drives?.map((drive, index) => (
                            <div key={index} className='flex flex-wrap justify-between gap-4 rounded-2xl shadow-md shadow-gray-400 bg-[#abf18b] py-3 px-6'>
                                <p className='text-xl min-w-1/4'>Vaccine Name : {drive.vaccineName}</p>
                                <p className='text-xl min-w-1/4'>Start Date : {new Date(drive.startDate).toLocaleDateString('en-GB')}</p>
                                <p className='text-xl min-w-1/4'>Available Doses : {drive.availableDoses}</p>
                                <p className='text-xl min-w-1/4'>Applicable Classes : {drive.applicableClasses.join(', ')}</p>
                            </div>
                        ))}
                    </>
                    :
                    <div className=' h-[300px]  flex items-center justify-center'>
                        <p className='text-3xl  text-red-400'>No Upcoming Drives Found !</p>
                    </div>
                }
            </div>
        </>
    )
}

export default Dashboard