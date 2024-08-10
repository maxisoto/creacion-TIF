import UserImage from "./UserImage";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

export default function Profile() {
    const { firstName } = useAuth("state");
    
    return (
        <>
           <UserImage />
           <p className="subtitle is-4 pb-2">{firstName}
            
             </p>
           <NavLink
                        to="profile"
                        style={({ isActive }) =>
                            isActive ? { color: "red" } : {}
                        }
                       
                    
                        className=
                        {({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "has-text-primary" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join("subtitle is-6")
                        }
                        >Mi Perfil <i className="fa fa-address-card" aria-hidden="true"></i>
                    </NavLink>
           
        </>
        
    );
}