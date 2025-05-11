import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Modal from 'react-modal';
import { IoCloseSharp } from 'react-icons/io5'
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { RiEdit2Fill } from "react-icons/ri";
import { getStudents, updateVax } from '../services/student';


const VaxUpdate = () => {

    const [studentsList, setStudentsList] = useState()
    const [selectedStudent, setSelectedStudent] = useState()
    const [editModalOpen, setEditModalOpen] = useState(false);


    const handleUpdate = async () => {
        try {
            const response = await updateVax({
                studentId: selectedStudent?.studentId,
                vaccinations: selectedStudent?.vaccinations?.split(',').map(item => item.trim())
            });
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                setEditModalOpen(false);
                getDetails()
            } else {
                toast.error(response);
            }
        } catch (error) {
            console.error('Error updating student details:', error);
            toast.error('Error updating student details');
            setEditModalOpen(false);
        }
    }


    const getDetails = async () => {
        try {
            const response = await getStudents();
            setStudentsList(response?.data?.studentsList)
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    }


    useEffect(() => {
        getDetails()
    }, [])





    return (
        <>
            <Header />
            <div className='p-6 space-y-5'>


                {/* DRIVES */}
                {studentsList?.length > 0 ?
                    <>
                        <p className='text-3xl'>All Students</p>
                        {studentsList?.map((item, index) => (
                            <div key={index} className=' mb-4 min-h-[60px] flex gap-x-5 items-center rounded-xl shadow-md shadow-gray-400 bg-[#abf18b] py-2 pl-6 pr-2'>
                                <p className='text-xl w-[12%]'>Id: {item?.studentId}</p>
                                <p className='text-xl w-[28%]'>Name: {item?.studentName}</p>
                                <p className='text-xl w-[10%]'>Grade: {item?.grade}</p>
                                <p className='text-xl w-[50%]'>Vaccinations: {item?.vaccinations?.length > 0 ? item?.vaccinations?.join(', ') : '- - -'}</p>
                                <button
                                    onClick={() => { setSelectedStudent(item); setEditModalOpen(true) }}
                                    className="flex items-center gap-x-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600  active:bg-gray-700">
                                    <RiEdit2Fill className='text-lg' />
                                </button>
                            </div>
                        ))}
                    </>
                    :
                    <div className=' h-[400px]  flex items-center justify-center'>
                        <p className='text-3xl mt-10 text-red-400'>No Students Found !</p>
                    </div>
                }

                {/* EDIT-MODAL */}
                <Modal
                    isOpen={editModalOpen}
                    overlayClassName="border-none focus:border-none fixed z-[90000] inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                    className="border-none focus:border-none max-w-[600px] max-h-[75vh] overflow-y-auto z-[90000] 
                                    w-full bg-white rounded-lg shadow-lg px-6 pt-6 pb-6 mx-auto mt-20 relative animate-flagfadeIn"
                    ariaHideApp={false}
                    onRequestClose={() => {
                        setEditModalOpen(false)
                    }}
                >
                    <IoCloseSharp
                        onClick={() => {
                            setEditModalOpen(false)
                        }}
                        className="absolute right-5 top-5 text-[#4F4F4F] hover:text-red-500 bg-transparent"
                    />

                    {/* CONTENT */}
                    <div className='min-h-20'>
                        <h1>Edit the updated details</h1>
                        <div className='flex flex-col gap-y-4 mt-4'>
                            <TextField
                                value={selectedStudent?.studentId}
                                id="standard-basic"
                                placeholder="123"
                                label="Student Id"
                                variant="standard"
                                disabled
                            />
                            <TextField
                                value={selectedStudent?.studentName}
                                onChange={(e) => setSelectedStudent(prev => ({ ...prev, studentName: e.target.value }))}
                                id="standard-basic"
                                placeholder="Sayan Pramanick"
                                label="Student Name"
                                variant="standard"
                                disabled

                            />
                            <TextField
                                value={selectedStudent?.grade}
                                onChange={(e) => setSelectedStudent(prev => ({ ...prev, grade: e.target.value }))}
                                id="standard-basic"
                                placeholder="3"
                                label="Grade"
                                variant="standard"
                                disabled

                            />

                            <TextField
                                autoComplete='off'
                                value={selectedStudent?.vaccinations}
                                onChange={(e) => setSelectedStudent(prev => ({ ...prev, vaccinations: e.target.value }))}
                                id="standard-basic"
                                placeholder="bcg, polio"
                                label="Vaccinations"
                                variant="standard"
                            />


                        </div>
                        <Button
                            onClick={handleUpdate}
                            sx={{ float: 'right', marginTop: 5 }} variant="contained">Update Status</Button>
                    </div>

                </Modal>

            </div >
        </>
    )
}

export default VaxUpdate
