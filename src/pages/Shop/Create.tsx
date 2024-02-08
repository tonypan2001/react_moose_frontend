import React, { useEffect, useState } from "react"
import useAuth from "../../store/useAuth"
import { useNavigate } from "react-router-dom"

const apiBaseURL = import.meta.env.VITE_API_PRODUCT_URL

function Create() {
    const auth = useAuth()
    const navigateTo = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [productName, setProductName] = useState("")
    const [imgPath, setImgPath] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
       if (auth.accessToken === null) {
            navigateTo("/login")
       } 
    }, [auth.accessToken, navigateTo])

    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            const response = await fetch(apiBaseURL + `create`, {
                method: "POST",
                headers: {
                    // Authorization: `Bearer ${auth.accessToken}`,
                    "Content-Type": "application/json",
                },body: JSON.stringify({
                    productName,
                    imgPath,
                    price,
                    quantity,
                    description,
                })
            })
            if (!response.ok) {
                throw new Error(`Failed to create product. Status: ${response.status}:${response.statusText}`)
            }
        } catch (error) {
            setError(error + "")
        } finally {
            alert("Product create successfully")
            setLoading(false)
            location.reload()
        }
    }

    return(
        <section>
            <div className="min-h-[100vh] flex justify-center items-center">
                <form onSubmit={handleCreateProduct} className="flex flex-col border p-4">
                    <h1 className="text-4xl text-blue-400 mb-12">Create Product</h1>
                    <label>Product Name</label>
                    <input 
                    className="border"
                    type="text" 
                    name="productName"
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    />
                    <label>Image</label>
                    <input 
                    className="border"
                    type="file"
                    name="imgPath"
                    onChange={(e) => setImgPath(e.target.value)}
                    />
                    <label>Price</label>
                    <input 
                    className="border"
                    type="number" 
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    />
                    <label>Quantity</label>
                    <input 
                    className="border"
                    type="number" 
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    />
                    <label>Description</label>
                    <textarea 
                    className="border"
                    rows={2}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />
                    {error && <p className="text-red-400">{error}</p>}
                    <button
                    className="hover:bg-slate-200 border px-2 mt-4"
                    type="submit"
                    >
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Create