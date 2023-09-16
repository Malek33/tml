import React from 'react'
import './style/main.css'

function Community() {

    window.localStorage.setItem("asideMenuSection", "community")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));

    return (
        <div style={{marginTop: '80px'}}>
            <h1>Community</h1>
        </div>
    )
}

export default Community
