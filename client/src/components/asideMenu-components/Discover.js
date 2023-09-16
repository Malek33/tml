import React from 'react'
import './style/main.css'

function Discover() {

    window.localStorage.setItem("asideMenuSection", "discover")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    return (
        <div>
            <h1>Discover</h1>
        </div>
    )
}

export default Discover
