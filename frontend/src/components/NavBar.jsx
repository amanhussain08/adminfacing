import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
	return (
		<>
			<Navbar bg="primary" variant="dark">
				<Container>
					<Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
					<Nav className="me-auto"></Nav>
				</Container>
			</Navbar>
		</>
	);
}
