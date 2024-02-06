// Home.tsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../store/useAuth"

interface UserData {
    name: string
}

const apiBaseURL = import.meta.env.VITE_API_BASE_URL

function Home() {
    const auth = useAuth()
    const navigate = useNavigate()

    const [data, setData] = useState<UserData | null>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getUser (){
            setLoading(true)
            setError("")
            try {
                const response = await fetch(apiBaseURL + `user`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                        "Content-Type": "application/json"
                    },
                })
        
                if (!response.ok) {
                    throw new Error(`Failed to fetch user. [Status:${response.status}]:${response.statusText}`)
                } else {
                    const data = await response.json()
                    setData(data)
                    return data
                }
            } catch (error) {
                console.log(error)
                setError(error+"")
            } finally {
                setLoading(false)
            }
        }
        if (auth.accessToken === null) {
            navigate("/login")
        }
        getUser()
    }, [auth.accessToken, navigate])

    return(
        <section>
            <div className="p-4">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-400">{error}</p>}
                <h1 className="text-4xl">Welcome, {data?.name}</h1>
            </div>
        </section>
    )
}

export default Home