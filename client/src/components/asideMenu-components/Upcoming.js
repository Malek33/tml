import React from 'react'
import './style/main.css'

function Upcoming() {

    window.localStorage.setItem("asideMenuSection", "upcoming")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    return (
        <div>
            <h1>upcoming</h1>
        </div>
    )
}

export default Upcoming
