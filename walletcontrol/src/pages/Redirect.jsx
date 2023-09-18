import React from 'react'
import { useNavigate } from 'react-router-dom'
const Redirect = () => {
    const navigate = useNavigate();

    const redirect = () => {
        setTimeout(() => {
            navigate("/login")
        }, 120)
    }

    return (
        <div>
            {redirect()}
        </div>
    )
}

export default Redirect