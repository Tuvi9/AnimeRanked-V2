import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

function NavBar () {

    interface User {
        username: string;
    }

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData) as User)
        }
    }, [])

    return(
        <div className='fixed top-0 left-0 right-0 z-50 px-4 pt-4'>
            <div className='bg-midnight h-[80px] max-w-[1200px] mx-auto flex flex-row justify-between rounded-2xl px-4 gap-x-2'>
                <div className="flex items-center text-2xl text-cyan font-extrabold text-stroke">AnimeRanked</div>
                <div className='flex'>
                    {user && (
                        <Dropdown username={user.username}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavBar;