import React from 'react'
import './style/main.css'

function Bookmarked() {

    window.localStorage.setItem("asideMenuSection", "bookmarked")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    return (
        <div>
            <h1>Bookmarked</h1>
        </div>
    )
}

export default Bookmarked
