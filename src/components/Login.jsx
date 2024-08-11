import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/login.css";

function Login() {
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { login } = useAuth("actions");
    
    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch("https://sandbox.academiadevelopers.com/api-auth/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    const { token } = responseData;
                    fetch("https://sandbox.academiadevelopers.com/users/profiles/profile_data/", {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Error al obtener el perfil del usuario");
                            }
                            return response.json();
                        })
                        .then((profileData) => {
                            console.log(`User ${profileData.first_name}`);
                            login(token, profileData.user__id, profileData.first_name);
                        });
                })
                .catch((error) => {
                    console.error("Error al iniciar sesión", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    function togglePasswordVisibility() {
        setIsPasswordVisible(prevState => !prevState);
    }

    return (
        <div className="page-background">
            <div className="form-container">
                <form
                    id="loginForm"
                    onSubmit={handleSubmit}
                    className="box has-background-dark has-text-white animated fadeInDown"
                >
                    <h2 className="title is-4 has-text-centered has-text-white">Inicio de Sesión</h2>
                    
                    <div className="field">
                        <label className="label has-text-white">Nombre de Usuario</label>
                        <div className="control has-icons-left">
                            <input
                                className="input has-background-grey-dark has-text-white"
                                type="text"
                                name="username"
                                id="username"
                                required
                                ref={usernameRef}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                    
                    <div className="field">
                        <label className="label has-text-white">Contraseña</label>
                        <div className="control has-icons-left">
                            <input
                                className="input has-background-grey-dark has-text-white"
                                type={isPasswordVisible ? "text" : "password"} // Cambio entre texto y contraseña
                                name="password"
                                id="password"
                                required
                                ref={passwordRef}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                            <span className="show-password-toggle" onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? "Ocultar" : "Mostrar"} {/* Cambia entre Mostrar y Ocultar */}
                            </span>
                        </div>
                    </div>
                    
                    <div className="field">
                        <div className="control">
                            <button
                                type="submit"
                                className="button is-primary is-fullwidth animated pulse infinite"
                            >
                                Iniciar Sesión
                            </button>
                            {isLoading && (
                                <p className="animated flash">Estamos verificando sus credenciales...</p>
                            )}
                            {isError && (
                                <p className="error-message shake">
                                    Error al iniciar sesión. Por favor, inténtalo nuevamente.
                                </p>
                            )}

                            {isError && (
                                <p className="error-message pulse">
                                    Asegúrate de que tu nombre de usuario y contraseña sean correctos.
                                </p>
                            )}


                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
