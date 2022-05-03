import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) =>{
    const token = localStorage.getItem('token');
    return token?children:<Navigate to='/'/>
}

export const RedirectRoute =({children})=>{
    const token = localStorage.getItem('token');
    return token?<Navigate to='/profile'/>:children
}