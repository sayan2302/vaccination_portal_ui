import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Protected = ({ component }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('login')) {
            toast.error('Please login to access that page');
            navigate('/');
        }
    }, [navigate]);
    return (
        component
    )
}

export default Protected
