function Create () {
    return(
    <div className='flex flex-col'>
        <div>
            <h1 className='text-2xl'>AnimeRanked</h1>
        </div>
        <div className='flex flex-col h-screen justify-center items-center'>
            <div className='border rounded-2xl w-[80%]'>
                <div>
                    <h1 className='text-xl text-center'>Profile pic</h1>
                </div>
                <form>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className=''>
                            <label htmlFor='username'></label>
                            <input className='border rounded-2xl' type='text' id='username' placeholder='Username'></input>
                            <br/>
                        </div>
                        <div>
                            <label htmlFor='email'></label>
                            <input className='border rounded-2xl' type='text' id='email' placeholder='Email'></input>
                            <br/>
                        </div>
                        <div>
                            <label htmlFor='password'></label>
                            <input className='border rounded-2xl' type='text' id='password' placeholder='Password'></input>
                        </div>
                        <div>
                            <input className='border rounded-2xl' type='submit' value='Create'></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Create;