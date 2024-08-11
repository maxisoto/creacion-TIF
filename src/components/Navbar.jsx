import { Link, NavLink } from "react-router-dom";
import Logo from '../assets/Logo.jpg';
import { useAuth } from "../contexts/AuthContext";
import "../App.css";
import ToggleTheme from "./ToggleTheme";




export default function Navbar({appName}) {
    const { isAuthenticated } = useAuth("state");
    const { logout } = useAuth("actions");
    return (
        <header >
            <nav
                className="navbar has-background-black-ter"
                role="navigation"
                aria-label="main navigation" >
                    
                     
                <div className="navbar-start">
                <figure className="image is-128x128-center">
                <a href="/" id="logo-link">
                        <img
                            className="is-rounded" 
                            src={Logo}
                            alt="inicioLogo"
                            style={{ height: "100px", width: "100px" }}      
                        />
                </a>
            </figure>
                <p className="navbar-item">{appName}</p>
                    <NavLink
                        to="/"
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "has-text-primary" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" navbar-item")
                        }
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        to="/about"
                        // style={({ isActive }) =>
                        //     isActive ? { color: "red" } : {}
                        // }
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "has-text-primary" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" navbar-item")
                        }
                    >
                        Nosotros
                    </NavLink>
                  
                </div>
                <div className="navbar-end">
                <div className="navbar-item">
                    <ToggleTheme/>
                <div className="button">
                    
                {isAuthenticated ? (
                    
                     <button
                     onClick={logout}
                     className="button"
                 >
                   <span class="icon-text">
                        <span>Salir</span>
                    </span>
                 </button>
                ):(
                    <NavLink
                        to="/login"
                        style={({ isActive }) =>
                            isActive ? { color: "red" } : {}
                        }
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "has-text-primary" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" navbar-item")
                        }
                    >
                        Login
                    </NavLink>
                )}
                
                </div>
                </div>
            </div>
            </nav>
        </header>
    );
}
