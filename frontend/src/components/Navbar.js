import React,{useState} from 'react';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import {CaretDownOutlined,UserOutlined,TeamOutlined,ExportOutlined} from '@ant-design/icons';
import { gql,useQuery } from '@apollo/client';

export const PROFILE_QUERY = gql`
    query GetUserById{
       getUserById @client{
        id
        name
        bio
        phone
        email
        password
      }
    }
`;



const NavBar = () =>{
    const {client,data} = useQuery(PROFILE_QUERY);
    const [show,setShow] = useState(false)
    const navigate =useNavigate();

    const logOut=()=>{
        localStorage.removeItem('token');
        setShow(false);
        client.clearStore();
        client.resetStore();
        navigate('/');
    }

    const dropdownMenu=()=>{
        show?setShow(false):setShow(true);
    }

    return(
        <nav className='navBar'>
            <span className='logo'>devchallenges</span>
            <div>
            <div style={{display:'inline-block'}} onClick={dropdownMenu}>
            {data&&<><Avatar src={'https://joeschmoe.io/api/v1/random'}/> <span>{data.getUserById.name} <CaretDownOutlined /></span></>}
            </div>
           
            {show&&<div className='dropdown-box'>
            <ul className='dropdown-menu'>
                <li><UserOutlined /> My Profile</li>
                <li><TeamOutlined /> Group</li>
                <div className='line'/>
                <li style={{color:'#EB5757'}} onClick={logOut}><ExportOutlined />Logout</li>
            </ul>
            </div>}
           </div>
        </nav>
    )
}

export default NavBar;