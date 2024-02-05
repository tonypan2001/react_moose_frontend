// Home.tsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../store/useAuth"

interface UserData {
    name: string
}

function Home() {
    const auth = useAuth()
    const navigate = useNavigate()

    const [data, setData] = useState<UserData | null>(null)

    useEffect(() => {
        if (auth.accessToken === null) {
            navigate("/login")
        }
        async function getUser (): Promise<void> {
            try {
                const response = await fetch(`http://localhost/api/auth/user`, {
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
            }
        }
        getUser()
    }, [auth.accessToken, navigate])

    return(
        <section>
            <div className="">
                <h1 className="text-4xl">Welcome, {data?.name}</h1>
            </div>
        </section>
    )
}

export default Home