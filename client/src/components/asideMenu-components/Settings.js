import React from 'react'
import './style/main.css'

function Settings() {

    window.localStorage.setItem("asideMenuSection", "settings")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    return (
        <div style={{marginTop: '80px'}}>
            <h1>Settings</h1>
        </div>
    )
}

export default Settings
