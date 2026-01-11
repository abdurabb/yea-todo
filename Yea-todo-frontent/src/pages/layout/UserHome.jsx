import React from 'react'
import { Outlet } from 'react-router-dom'
import UserContent from "../../components/UserNavbars/UserContent.jsx";
import UserNavbar from '../../components/UserNavbars/Navbar.jsx'
import UserFooter from '../../components/UserNavbars/Footer.jsx'


function UserHome() {
    return (
        <div>
            <UserContent>
                <Outlet />
            </UserContent>
        </div>
    )
}

export default UserHome