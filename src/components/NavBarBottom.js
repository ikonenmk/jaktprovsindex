import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from "react";

function NavBarBottom() {
    return (
        <Container>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" fixed="bottom">
                <Navbar.Text>
                        Den här sidan använder sig av kakor för autentisering.
                </Navbar.Text>
            </Navbar>
        </Container>
    );
}

export default NavBarBottom;