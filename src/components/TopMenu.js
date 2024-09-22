import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";

function TopMenu() {
  return (
    <>
      <Row className="topNav">
        <Link to="/Newsletter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            fill="currentColor"
            className="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
          </svg>
        </Link>
      </Row>
    </>
  );
}

export default TopMenu;
