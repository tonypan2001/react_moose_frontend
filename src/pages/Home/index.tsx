// Home.tsx
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            navigate("/login")
        }
    }, [navigate])

    return(
        <section>
            <div className="">
                <h1 className="text-6xl">Welcome, </h1>
            </div>
        </section>
    )
}

export default Home