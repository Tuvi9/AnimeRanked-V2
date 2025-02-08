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
        <div className='bg-midnight h-[80px] flex flex-row justify-between'>
            <div className="flex items-center text-2xl text-white font-extrabold text-stroke ml-4">AnimeRanked</div>
            <div className='flex'>
                {user && (
                    <Dropdown username={user.username}/>
                )}
            </div>
        </div>
    )
}

export default NavBar;