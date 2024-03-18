import React from "react"
import './NavBarDashboard.css'
 function NavBarDashboard() {
    return (
        <>
            <div className="Navabr_wapper">
                <h2>Projects</h2>
                <input type="text"></input>
                <div className="options">
                <ul>
                    <li>All</li>
                    <li>My projects</li>
                    <li>Shared With me</li>
                </ul>
                <select>
                    <option>Creation Date</option>
                </select>
                <button>
                    <img></img>
                    <p>New Projects</p>
                </button>
                </div>
            </div>
        </>
    )
}

export default NavBarDashboard;