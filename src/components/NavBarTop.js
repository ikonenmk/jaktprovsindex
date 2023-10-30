import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from "./Login";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import picture from "../img/dog.png"

function NavBarTop() {


    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    //Login
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (data) => {
        setLoggedIn(data);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/checkLoginCookie.php", { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response.data === 1) {
                    setLoggedIn(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); 

    //Log-out
    const handleLogout = () => {
        setLoggedIn(false);
        axios
            .get("http://localhost:8000/deleteCookie.php", { withCredentials: true })
            .then((response) => {
                console.log(response);
                setLoggedIn(false);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //Hantering av dropDown
    const handleDropdownToggle = (isOpen) => {
        setDropdownOpen(isOpen);
    };

    const handleDropdownSelect = (eventKey) => {
    };

    const handleClickOutside = (event) => { //Stäng dropdown om klick utanför
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    const handleItemClick = (event) => {
        event.stopPropagation(); // undvik att dropdown stängs vid klick i fältet (för att möjliggöra input i login komponent)
    };

    //Event listeners för klick
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <Container>
            <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark" fixed="top">
                <Navbar.Brand href="/AllDogs"> <img src={picture} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
               
                    <Nav className="me-auto">
                        {!loggedIn && 
                        <div ref={dropdownRef}>
                            <NavDropdown
                                title="Logga in"
                                id="basic-nav-dropdown"
                                show={isDropdownOpen}
                                onToggle={handleDropdownToggle}
                                onSelect={handleDropdownSelect}
                            >
                                <NavDropdown.Item onClick={handleItemClick}>
                                    <Login handleLogin={handleLogin} />
                                </NavDropdown.Item>
                            </NavDropdown>
                            </div>
                        }
                        {loggedIn && <Nav.Link href="" onClick={ handleLogout }> Logga ut </Nav.Link> }
                        {loggedIn && <Nav.Link href="/addResult/">Registrera nytt prov</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default NavBarTop;
