import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";

function ModifyForm() {
    const location = useLocation();
    const { playlist } = location.state;
    const { token } = useAuth("state");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const [{ data, isError, isLoading }, doFetch] = useFetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${playlist.id}/`, {});
    const [{ data: patchData, isError: patchError, isLoading: patchLoading }, patchFetch] = useFetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${playlist.id}/`, {
        method: "PATCH",
        body: JSON.stringify({
            name,
            description
        }),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        }
    });

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (data) {
            setName(data.name);
            setDescription(data.description);
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        patchFetch();
        navigate("/");
    };

    const handleBack = () => {
        navigate("/");
    } 

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error al cargar la playlist: {isError.message}</p>;

    return (
        <div className="container modify-playlist-container">
            <h1 className="title modify-playlist-title">Modificar Playlist</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Nombre</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Descripción</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-link" type="submit">Guardar</button>
                    </div>
                    <div className="control">
                        <button className="button is-link m-4" type="button" onClick={handleBack}>Volver</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ModifyForm;
