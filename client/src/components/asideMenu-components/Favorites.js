import React from 'react'
import './style/main.css'



function  Favorites() {

    window.localStorage.setItem("asideMenuSection", "favorites")
    window.dispatchEvent(new Event("storageChangesAsideMenuSection"));


    return (
        <div>
            <h1>Favorites</h1>
        </div>
    )
}

export default Favorites
