import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import "../styles/navbar.css"

export default function Tabs() {
    const { theme } = useTheme();
    const location = useLocation();
    const currentPath = location.pathname;

    return (

//barra de navegacion

<div className="navbar">
<Link to="/" className={currentPath === "/" ? "is-active" : ""}>Canciones</Link>
<Link to="/albums" className={currentPath === "/albums" ? "is-active" : ""}>Albumes</Link>
<Link to="/artists" className={currentPath === "/artists" ? "is-active" : ""}>Artistas</Link> 
</div>
  );
}
