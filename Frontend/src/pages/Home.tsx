import { useEffect, useState } from "react"

function Home() {
    interface User {
        email: string;
        username?: string;
    }

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData) as User)
        }
    }, [])

    return(
        <div>
            <h1>Welcome</h1>
            {user && (
                <div>
                    <p>Hello, {user.username || user.email}</p>
                </div>
            )}
        </div>
    )
}

export default Home