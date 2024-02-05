//Navbar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../store/useAuth";
import { useEffect, useState } from "react";

interface UserData {
    name: string
}

export default function Navbar() {
    const auth = useAuth()
    const navigate = useNavigate()
    const locate = useLocation()

    const isAuthPage = locate.pathname === "/login" || locate.pathname === "/register"

    const [data, setData] = useState<UserData | null>(null)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        if (!isAuthPage && auth.accessToken !== null && !isFetching) 
        {
            // eslint-disable-next-line no-inner-declarations
            async function getUser (): Promise<void> {
                try {
                    // setIsFetching(true)
                    const response = await fetch(`http://localhost/api/auth/user`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                            "Content-Type": "application/json"
                        },
                    })
            
                    if (!response.ok) {
                        throw new Error("Failed to fetch user information")
                    } else {
                        const data = await response.json()
                        setData(data)
                        return data
                    }
    
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsFetching(true)
                }
            }
            getUser()
        }
    }, [auth.accessToken, isAuthPage, isFetching])

    if (isAuthPage) {
        return null
    }

    const handleLogout = () => {
        auth.clearAccessToken()
        navigate("/login")
    }

    return(
        <nav>
            <div className="flex justify-around items-center h-[60px] border">
                <ul className="min-w-[200px] flex justify-between items-center">
                    <li>
                        <Link className="hover:text-blue-400" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="hover:text-blue-400" to="/shop">Shop</Link>
                    </li>
                    <li>
                        <Link className="hover:text-blue-400" to="/contact">Contact</Link>
                    </li>
                </ul>
                <ul className="flex justify-between items-center">
                    <Link 
                    to="/profile"
                    className="mr-4"
                    >
                        {data?.name}
                    </Link>
                    <li>
                        <button className="border px-2 hover:bg-slate-200" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}