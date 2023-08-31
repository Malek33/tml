import React from 'react'
import './style/main.css'

function Recent() {

    window.localStorage.setItem("asideMenuSection", "recent")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    return (
        <div>
            <h1>Recent</h1>
        </div>
    )
}

export default Recent
