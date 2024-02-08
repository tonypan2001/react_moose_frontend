import { useEffect } from "react"
import useAuth from "../../store/useAuth"
import { Link, useNavigate } from "react-router-dom"


function Shop() {
    const auth = useAuth()
    const navigateTo = useNavigate()
    useEffect(() => {
        if (auth.accessToken === null) {
           navigateTo("/login") 
        }
    }, [auth.accessToken, navigateTo])
    return(
        <section>
            <div className="flex justify-around items-center p-4">
                <h1>Welcome to Shop</h1>
                <Link 
                className="border hover:bg-slate-200 p-2"
                to="/shop/create"
                >
                    Create Product
                </Link>
            </div>
            
            <div className="grid">
                <div className="max-w-[300px] border p-2">
                    <h1>Product Name: </h1>
                    {/* <img src="" alt="" /> */}
                    <p>Quantity: </p>
                    <p>Price: </p>
                    <p>Description: </p>
                </div>
            </div>
        </section>
    )
}

export default Shop