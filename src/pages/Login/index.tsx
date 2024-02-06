// Login.tsx
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../store/useAuth"

interface UserLogin {
    email: string
    password: string
}

const apiBaseURL = import.meta.env.VITE_API_BASE_URL

function Login() {

    // const locate = useLocation()
    const auth = useAuth()
    const navigateTo = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const isAuthPage = locate.pathname === "/login" || locate.pathname === "/register"

    // useEffect(() => {
    //     if (isAuthPage) {
    //         navigate("/")
    //     }
    // }, [isAuthPage, navigate])

    useEffect(() => {
        // if accessToeken does exist
        if (auth.accessToken !== null) {
            navigateTo("/")
        }
    }, [auth.accessToken, navigateTo])

    async function userLogin(credentials: UserLogin) {
        try {
            setLoading(true)
            setError("")
            const response = await fetch(apiBaseURL + `login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if (!response.ok) {
                throw new Error(`Failed to login. Status: ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()

            if (data) {
                localStorage.setItem("accessToken", data.accessToken)
                navigateTo("/")
            }

            return data

        } catch (error) {
            setError(error+"")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        await userLogin({
            email,
            password
        })
    }

    return(
        <section>
            <div className="min-h-[100vh] flex flex-col justify-center items-center">
                <h1 className="text-blue-400 text-5xl font-bold mb-12">Login</h1>
                <form action="" onSubmit={handleLogin} className="flex flex-col items-start">
                    <label>Email:</label>
                    <input 
                    className="border" 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <label className="mt-2">Password:</label>
                    <input 
                    className="border" 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    {error && <p className="text-red-400">{error}</p>}
                    <button className="border mt-4 px-2" type="submit"  disabled={loading}>
                        {loading ? 'Loging in...' : 'Login'}
                    </button>

                    <div className="text-center mt-4 w-full">
                        <a className="text-blue-400" href="/register">Register?</a>
                    </div>
                </form>
            </div>
        </section>
    )
}

// Login.prototypes = {
//     setToken: PropTypes.func.isRequired
// }

export default Login