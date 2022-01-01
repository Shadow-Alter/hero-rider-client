import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import x from '../../assets/x.svg';
import './Navbar.css';


const Navbar = () => {
    const [show, setShow] = useState(false);
    
    return (
        <div className='navbar' >

            <div className="left_side">
              <Link to ='/'>
                  <img id='logo' src="https://pbs.twimg.com/profile_images/1063925348205821958/DlGcxdOl.jpg" alt="" srcset="" />
              </Link>
              
            </div>

            <div className="right_side">
                <div className="nav_items" id={show? "hidden" :""}>
                    <Link to='/' className='link'>Home</Link>
                    <Link to='/' className='link'>Feedback</Link>
                   
                </div>

                <img src={show? x:menu} onClick={()=>setShow(!show)} id='toggle_btn' alt="" srcset="" />
            </div>
        </div>
    );
};

export default Navbar;