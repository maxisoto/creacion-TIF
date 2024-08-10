import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function ConfirmDelete() {
    const location = useLocation();
    const { id, name } = location.state;
    console.log(id);
    const { token } = useAuth("state");
    const navigate = useNavigate();

    const [{ isError: delError, isLoading: delLoading }, doFetch] = useFetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}/`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );

    const handleConfirm = (() => {
        doFetch();
        alert("Playlist eliminada con éxito.");
        navigate("/")
    })

    const handleBack = (() => {
        navigate("/")
    })

    return (
        <div className="container confirm-delete-container">
            <div className="box">
                <h2 className="title is-4">¿Estás seguro que quieres eliminar la Playlist {name}?</h2>
                <div className="buttons is-centered">
                    <button className="button is-light" onClick={handleBack}>Cancelar</button>
                    <button className="button is-danger" onClick={handleConfirm}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDelete;