import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar color="light" expand="md" light>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="#">Graphql</NavLink>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/books">
                Books
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/authors">
                Authors
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;
