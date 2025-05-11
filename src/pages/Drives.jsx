import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { MdModeEdit } from 'react-icons/md'
import { addDrive, editDrive, getDrives } from '../services/drive'
import Modal from 'react-modal';
import { IoCloseSharp } from 'react-icons/io5'
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";

const Drives = () => {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [bookModalOpen, setBookModalOpen] = useState(false);
    const [applicableClassesInput, setApplicableClassesInput] = useState('');
    const [bookApplicableClassesInput, setBookApplicableClassesInput] = useState('');

    const [driveList, setDriveList] = useState()

    const [editFormData, setEditFormData] = useState({
        driveId: '',
        vaccineName: '',
        startDate: '',
        availableDoses: '',
        applicableClasses: [],
    });

    const [bookFormData, setBookFormData] = useState({
        driveId: '',
        vaccineName: '',
        startDate: '',
        availableDoses: '',
        applicableClasses: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        setBookFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await editDrive(editFormData);

            if (response?.status === 200) {
                toast.success(response?.data?.message);

                setEditFormData({
                    driveId: '',
                    vaccineName: '',
                    startDate: '',
                    availableDoses: '',
                    applicableClasses: '',
                });
                setApplicableClassesInput('');
                getDetails()
                setEditModalOpen(false)

            } else {
                toast.error(response);

            }
        } catch (error) {
            console.error('Error updating drive:', error);
            setEditModalOpen(false)

        }
    }


    const handleBook = async () => {
        try {
            const response = await addDrive(bookFormData);

            if (response?.status === 201) {
                toast.success(response?.data?.message);

                setBookFormData({
                    driveId: '',
                    vaccineName: '',
                    startDate: '',
                    availableDoses: '',
                    applicableClasses: '',
                });
                setBookApplicableClassesInput('');
                setBookModalOpen(false)
                getDetails()

            } else {
                toast.error(response);

            }
        } catch (error) {
            console.error('Error booking drive:', error);
            setBookModalOpen(false)

        }
    }

    const getDetails = async () => {
        try {
            const response = await getDrives();
            setDriveList(response?.data?.drives)
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
            <div className='p-6 space-y-4'>
                {/* NAVBAR */}
                <div className='flex gap-x-4 justify-center items-center'>
                    {driveList?.length > 0 &&
                        <button
                            onClick={() => setEditModalOpen(true)}
                            className="flex items-center gap-x-2 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600  active:bg-yellow-700">
                            <MdModeEdit className='text-lg' /> Edit Drive
                        </button>
                    }
                    <button
                        onClick={() => setBookModalOpen(true)}
                        className="flex items-center gap-x-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600  active:bg-green-700">
                        <IoMdAdd className='text-2xl' /> Book a Drive
                    </button>

                </div>
                <hr className='border-b-4 border-dotted ' />

                {/* DRIVES */}

                {driveList?.length > 0 ?
                    <>
                        <p className='text-3xl'>All vaccination drives</p>
                        {driveList?.map((drive, index) => (
                            <div key={index} className='mb-4 flex items-center rounded-xl shadow-md shadow-gray-400 bg-[#baff8c] p-5'>
                                <p className='text-xl w-[12.5%]' >Id: {drive?.driveId}</p>
                                <p className='text-xl w-[17.5%]' >Name: {drive?.vaccineName}</p>
                                <p className='text-xl w-[25%]'   >Start date: {new Date(drive?.startDate).toLocaleDateString('en-GB')}</p>
                                <p className='text-xl w-[22.5%]' >Available doses: {drive?.availableDoses}</p>
                                <p className='text-xl w-[25%]'   >Applicable classes: {drive?.applicableClasses.join(', ')}</p>
                            </div>
                        ))}
                    </>
                    :
                    <div className=' h-[400px]  flex items-center justify-center'>
                        <p className='text-3xl mt-10 text-red-400'>No Drives Found !</p>
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
                        <h1>Edit the details</h1>
                        <div className='flex mt-5 flex-col gap-y-4'>
                            <TextField
                                name="driveId"
                                value={editFormData.driveId}
                                onChange={handleInputChange}
                                id="standard-basic"
                                placeholder="1075"
                                label="Drive Id"
                                variant="standard"
                            />
                            <TextField
                                name="vaccineName"
                                value={editFormData.vaccineName}
                                onChange={handleInputChange}
                                id="standard-basic"
                                placeholder="Polio"
                                label="Vaccination Name"
                                variant="standard"
                            />
                            <TextField
                                name="startDate"
                                value={editFormData.startDate}
                                onChange={handleInputChange}
                                id="standard-basic"
                                placeholder="YYYY-MM-DD"
                                label="Start Date"
                                variant="standard"
                            />
                            <TextField
                                name="availableDoses"
                                value={editFormData.availableDoses}
                                onChange={handleInputChange}
                                id="standard-basic"
                                placeholder="300"
                                label="Available doses"
                                variant="standard"
                            />
                            <TextField
                                name="applicableClasses"
                                value={applicableClassesInput} // Use the raw input state
                                onChange={(e) => {
                                    setApplicableClassesInput(e.target.value); // Update the raw input state
                                }}
                                onBlur={() => {
                                    // Process the input into an array when the user leaves the field
                                    setEditFormData((prevData) => ({
                                        ...prevData,
                                        applicableClasses: applicableClassesInput
                                            .split(',') // Split the input string by commas
                                            .map((item) => parseInt(item.trim(), 10)) // Convert each value to an integer
                                            .filter((item) => !isNaN(item)), // Filter out invalid numbers
                                    }));
                                }}
                                id="standard-basic"
                                placeholder="1,2,3"
                                label="Applicable classes"
                                variant="standard"
                            />
                        </div>
                        <Button onClick={handleUpdate} sx={{ float: 'right', marginTop: 5 }} variant="contained">Update</Button>
                    </div>

                </Modal>

                {/* BOOK-MODAL */}
                <Modal
                    isOpen={bookModalOpen}
                    overlayClassName="border-none focus:border-none fixed z-[90000] inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                    className="border-none focus:border-none max-w-[600px] max-h-[75vh] overflow-y-auto z-[90000] 
                    w-full bg-white rounded-lg shadow-lg px-6 pt-6 pb-6 mx-auto mt-20 relative animate-flagfadeIn"
                    ariaHideApp={false}
                    onRequestClose={() => {
                        setBookModalOpen(false)
                    }}
                >
                    <IoCloseSharp
                        onClick={() => {
                            setBookModalOpen(false)
                        }}
                        className="absolute right-5 top-5 text-[#4F4F4F] hover:text-red-500 bg-transparent"
                    />

                    {/* CONTENT */}
                    <div className='min-h-20'>
                        <h1>Book a Vaccination Drive</h1>
                        <div className='flex flex-col gap-y-4'>
                            <TextField
                                name="driveId"
                                value={bookFormData.driveId}
                                onChange={handleInputChange2}
                                id="standard-basic"
                                placeholder="1075"
                                label="Drive Id"
                                variant="standard"
                            />
                            <TextField
                                name="vaccineName"
                                value={bookFormData.vaccineName}
                                onChange={handleInputChange2}
                                id="standard-basic"
                                placeholder="Polio"
                                label="Vaccination Name"
                                variant="standard"
                            />
                            <TextField
                                name="startDate"
                                value={bookFormData.startDate}
                                onChange={handleInputChange2}
                                id="standard-basic"
                                placeholder="YYYY-MM-DD"
                                label="Start Date"
                                variant="standard"
                            />
                            <TextField
                                name="availableDoses"
                                value={bookFormData.availableDoses}
                                onChange={handleInputChange2}
                                id="standard-basic"
                                placeholder="300"
                                label="Available doses"
                                variant="standard"
                            />
                            <TextField
                                name="applicableClasses"
                                value={bookApplicableClassesInput} // Use the raw input state
                                onChange={(e) => {
                                    setBookApplicableClassesInput(e.target.value); // Update the raw input state
                                }}
                                onBlur={() => {
                                    // Process the input into an array when the user leaves the field
                                    setBookFormData((prevData) => ({
                                        ...prevData,
                                        applicableClasses: bookApplicableClassesInput
                                            .split(',') // Split the input string by commas
                                            .map((item) => parseInt(item.trim(), 10)) // Convert each value to an integer
                                            .filter((item) => !isNaN(item)), // Filter out invalid numbers
                                    }));
                                }}
                                id="standard-basic"
                                placeholder="1,2,3"
                                label="Applicable classes"
                                variant="standard"
                            />
                        </div>
                        <Button onClick={handleBook} sx={{ float: 'right', marginTop: 5 }} variant="contained">Book</Button>
                    </div>

                </Modal>
            </div>
        </>
    )
}

export default Drives
