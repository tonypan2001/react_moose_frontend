import { useNavigate } from "react-router-dom"
import useAuth from "../../store/useAuth"
import React, { useEffect, useState } from "react"

interface UserData {
    id:number
    name: string
    email: string
}

const apiBaseURL = import.meta.env.VITE_API_BASE_URL

function Profile() {

    const auth = useAuth()
    const navigate = useNavigate()

    const [data, setData] = useState<UserData|null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [name, setName] = useState<string>(data?.name || "")
    const [password, setPassword] = useState("")
    const [c_password, setC_Password] = useState("")

    useEffect(() => {
        async function getUser () {
            try {
                const response = await fetch(apiBaseURL + `user`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                        "Content-Type": "application/json"
                    },
                })
        
                if (!response.ok) {
                    throw new Error("Failed to fetch user information")
                }
                const data = await response.json()
                setData(data)
                return data

            } catch (error) {
                console.log(error)
            } finally {
                setIsFetching(true)
            }
        }
        if (auth.accessToken === null) {
            navigate("/login")
        } else if (auth.accessToken !== null && !isFetching) {
            getUser()
        }
    })

    const handleUpdate = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (password !== c_password) {
            setError("Password do not match")
            setLoading(false)
            return
        }

        try {
            console.log(data && data.id)
            const response = await fetch(`http://localhost/api/auth/update/${data && data.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                    "Content-Type": "application/json"
                },body: JSON.stringify({name, password, c_password})
            })

            if (!response.ok) {
                throw new Error(`Failed to update. Status: ${response.status}: ${response.statusText}`)
            }
            
        } catch (error) {
            console.log(error)
            setError(error+"")
        } finally {
            setLoading(false)
            alert("Update user info successful")
            location.reload()
        }
    }

    return(
        <section>
            <div className="min-h-[100vh] flex justify-center items-center">
                <div className="border p-8">
                    <h1 className="text-4xl text-blue-400 mb-12">Edit Profile</h1>
                    <form onSubmit={handleUpdate} className="flex flex-col">
                        <label>Name</label>
                        <input 
                        className="border"
                        type="text" 
                        name="name"
                        placeholder={data?.name || ""}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                        <label className="mt-2">Email</label>
                        <p>{data?.email}</p>
                        <label className="mt-2">Password</label>
                        <input 
                        className="border"
                        name="password"
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <label className="mt-2">Confirm Password</label>
                        <input 
                        className="border"
                        name="c_password"
                        type="password" 
                        onChange={(e) => setC_Password(e.target.value)}
                        required
                        />
                        {error && <p className="text-red-400">{error}</p>}
                        <button 
                        className="border px-2 mt-4 hover:bg-slate-200" 
                        type="submit"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Profile