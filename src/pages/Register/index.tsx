import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [c_password, setC_Password] = useState("")

    const handleRegister = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (password !== c_password) {
            setError("Passwords do not match")
            return
        }

        const response = await fetch(`http://localhost/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password, c_password})
        })

        console.log(response.json())

        if (response.ok) {
            setLoading(false)
            alert("Registration successfull")
            navigate("/login")

        } else {
            setLoading(false)
            alert("Registration failed")
        }

    }

    return(
        <section>
            <div className="min-h-[100vh] flex flex-col justify-center items-center">
                <h1 className="text-blue-400 text-5xl font-bold mb-12">Register</h1>
                <form action="" onSubmit={handleRegister} className="flex flex-col items-start">
                    <label>Name:</label>
                    <input 
                    className="border" 
                    type="text" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
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
                    <label className="mt-2">Confirm Password:</label>
                    <input 
                    className="border" 
                    type="password" 
                    name="c_password" 
                    value={c_password}
                    onChange={(e) => setC_Password(e.target.value)}
                    required
                    />
                    {error && <p className="text-red-400">{error}</p>}
                    <button className="border mt-4 px-2" type="submit"  disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <div className="text-center mt-4 w-full">
                        <a className="text-blue-400" href="/login">Login?</a>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register