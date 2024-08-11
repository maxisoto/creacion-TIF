import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import '../styles/tabs.css'; // Importa el archivo CSS

export default function Tabs() {
    const { theme } = useTheme();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div 
      
        >
            <p className="panel-tabs">
                <label className="label">
                Mostrar por:
                </label>
                <Link 
                    to="/" 
                    className={`tab-link ${currentPath === "/" ? "is-active" : ""}`}
                >
                    Canciones
                </Link>
                <Link 
                    to="/albums" 
                    className={`tab-link ${currentPath === "/albums" ? "is-active" : ""}`}
                >
                    Albums
                </Link>
                <Link 
                    to="/artists" 
                    className={`tab-link ${currentPath === "/artists" ? "is-active" : ""}`}
                >
                    Artistas
                </Link>
            </p>
        </div>
    );
}
