import React from 'react'
import { Navigate, Outlet } from 'react-router-dom' //useNavigate hook can be used to navigate to a different route

const ProtectRoute = ({children,user,redirect='/login'}) => {
    if(!user)return <Navigate to={redirect}/>
    return children?children: <Outlet/>
}

export default ProtectRoute
