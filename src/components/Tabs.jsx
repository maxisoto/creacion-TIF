import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Tabs() {
    const { theme } = useTheme();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div 
        // className={`${
        //     theme === 'pink'
        //     ? 'pinkBackground'
        //     : 'blueBackground'
        // }`}
        >
            <p className="panel-tabs">
                <Link 
                    to="/" 
                    className={currentPath === "/" ? "is-active" : ""}
                >
                    Songs
                </Link>
                <Link 
                    to="/albums" 
                    className={currentPath === "/albums" ? "is-active" : ""}
                >
                    Albums
                </Link>
                <Link 
                    to="/artists" 
                    className={currentPath === "/artists" ? "is-active" : ""}
                >
                    Artists
                </Link>
            </p>
        </div>
        
    );
}
