import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';

function Create () {

    interface SignUpFormState{
        username:string;
        email:string;
        password: string;
    }

    const[formData, setFormData] = useState<SignUpFormState> ({
        username: '',
        email: '',
        password:''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/auth/create', formData);
            console.log(response.data)
        }catch (error) {
            console.log(error);
        }
    }

    return(
    <div className='flex flex-col bg-black h-screen'>
        <div className='fixed top-0 w-full'>
            <h1 className='text-3xl bg-black text-cyan font-medium p-4'>AnimeRanked</h1>
        </div>
        <div className='flex flex-col h-full items-center justify-center'>
            <div className='border rounded-2xl w-[80%] bg-midnight custom-shadow pt-8 pb-8'>
                <div className='pb-4'>
                    <h1 className='text-2xl text-center text-white font-extrabold text-stroke'>Profile picture</h1>
                </div>
                <form action='/profile' method='post' encType='multipart/form-data'>
                    <div className='flex justify-center pb-4'>
                        <label className='w-24 h-24 rounded-full bg-gray border-3 border-black flex items-center justify-center text-2xl text-white font-extrabold text-stroke'>
                            PNG
                            <input className='hidden' type='file' name='avatar'/>
                        </label>
                    </div>
                </form>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='flex justify-center'>
                            <label htmlFor='username'></label>
                            <input
                            className='border-3 border-black rounded-full p-2 text-2xl placeholder:font-extrabold bg-gray placeholder-white placeholder-stroke w-[70%] text-white focus:outline-none' 
                            type='text'
                            id='username'
                            placeholder='Username'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            ></input>
                            <br/>
                        </div>
                        <div className='flex justify-center'>
                            <label htmlFor='email'></label>
                            <input
                            className='border-3 border-black rounded-full p-2 text-2xl placeholder:font-extrabold bg-gray placeholder-white placeholder-stroke w-[70%] text-white focus:outline-none' 
                            type='text'
                            id='email'
                            placeholder='Email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            ></input>
                            <br/>
                        </div>
                        <div className='flex justify-center'>
                            <label htmlFor='password'
                            ></label>
                            <input
                            className='border-3 border-black rounded-full p-2 text-2xl placeholder:font-extrabold bg-gray placeholder-white placeholder-stroke w-[70%] text-white focus:outline-none' 
                            type='text'
                            id='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                            ></input>
                        </div>
                        <div className='flex flex-row w-[70%] justify-center gap-x-4'>
                            <div className='border-3 rounded-full p-2 bg-gray font-extrabold text-stroke text-2xl text-center w-[100px]'>
                                <button
                                className='text-white'
                                type='submit'
                                value='Create'
                                >Create</button>
                            </div>
                            <div className='flex items-center'>
                                <Link to={`/`}>
                                    <button className='text-2xl text-white font-extrabold text-stroke'>Log in</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Create;