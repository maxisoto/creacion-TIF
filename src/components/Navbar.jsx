import { Link, NavLink } from "react-router-dom";
import Logo from '../assets/Logointro.jpeg';
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
              <img
                className="is-rounded" 
                src={Logo}
                alt="inicioLogo"
                style={{ height: "100px", width: "100px" }}
              />
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
                        Home
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
                        About
                    </NavLink>
                  
                </div>
                <div className="navbar-end">
                <div className="navbar-item">
                    <ToggleTheme/>
                <div className="button is-danger">
                    
                {isAuthenticated ? (
                    
                     <button
                     onClick={logout}
                     className="navbar-item button is-danger"
                 >
                     Logout
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
