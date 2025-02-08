import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DropdownProps {
    username: string;
}

const Dropdown = ({ username }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        void navigate('/');
    };

    return (
        <div className='flex items-center mr-2'>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex border-3 border-white p-1 gap-x-4 w-[160px]
                    ${isOpen ? 'rounded-t-[30px] border-b-0' : 'rounded-full'} cursor-pointer relative z-10`}
            >
                <div className='flex items-center text-white text-2xl font-extrabold text-stroke ml-2 w-[75px]'>
                    <span className='truncate'>{username}</span>
                </div>
                <img className='w-12 h-12 rounded-full border-1 border-black object-cover' src='/Scareface_smoking.jpg'/>
            </div>
            {isOpen && (
                <div className='absolute top-[65px] w-[160px] h-[140px] bg-midnight border-3 border-t-0 border-white rounded-b-xl'>
                    <div className='flex flex-col justify-center mt-2 gap-y-3'>
                        <div className='flex justify-center items-center gap-x-3 bg-black w-[140px] h-[50px] rounded-xl mt-1.5 ml-2'>
                            <div className='w-3 h-3'>
                                <svg className="w-full h-full" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            </div>
                            <button
                                onClick={() => navigate('/profile')}
                                className='text-white text-sm font-extrabold text-stroke'
                            >
                                User profile
                            </button>
                        </div>
                        <div className='flex justify-end mr-2'>
                        <button
                            onClick={handleLogout}
                            className='bg-red-500 text-white text-lg font-extrabold text-stroke rounded-xl w-[140px] h-[50px] ml-2'
                        >
                        Log out
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;