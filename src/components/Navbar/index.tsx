import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../store/useAuth";


export default function Navbar() {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const isAuthPage = location.pathname === "/login" || location.pathname === "/register"

    if (isAuthPage) {
        return null
    }

    const handleLogout = () => {
        if (auth.getAccessToken() !== null) {
            auth.clearAccessToken()
            navigate("/login")
        }
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
                    <li className="mr-4">
                        name
                    </li>
                    <li>
                        <button className="border px-2 hover:bg-slate-200" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}