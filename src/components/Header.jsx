import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-between bg-gray-800 p-4'>
            <h1 onClick={() => navigate('/dashboard')} className='cursor-pointer text-2xl text-white font-bold'>School Vaccination Portal</h1>
            <div className='flex items-center space-x-4'>
                <FaUserCircle className='text-white text-3xl' />
            </div>

        </div>
    )
}

export default Header
