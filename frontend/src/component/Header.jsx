/**import { useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
       try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        dispatch(resetCart());
        navigate('/login');
       } catch (err) {
        console.log(err);
       }
    };
    
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand>
                    {/**<img src={logo} alt='ProShop'/> 
                    Canvendor
                    </Navbar.Brand>
                    </LinkContainer>
                    
                
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (

                        <LinkContainer to='/login'>
                        <Nav.Link href='/login'>
                        <FaUser /> Sign In
                        </Nav.Link>
                       </LinkContainer>
                        ) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
export default Header; */

import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice.js';
import { logout } from '../slices/authSlice.js';
import { FaUser } from 'react-icons/fa'; // Importing icons

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            Canvendor
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <FaUser /> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/signup'>
                                        <Nav.Link>
                                            Sign Up
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
