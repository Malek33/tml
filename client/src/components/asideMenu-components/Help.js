import React from 'react'
import './style/main.css'

function Help() {

    window.localStorage.setItem("asideMenuSection", "help")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    return (
        <div>
            <h1>Help</h1>
        </div>
    )
}

export default Help
