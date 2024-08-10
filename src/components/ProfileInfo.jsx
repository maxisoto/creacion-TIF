import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import useFetchProfile from "../hooks/useFetchProfile";
import ProfileImageModal from "./ProfileImageModal";
import defaultImage from "./imgs/userIMGDefault.png";

export default function ProfileInfo() {
    const { token} = useAuth("state");
    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingState, setIsEditingState] = useState(false);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const dobRef = useRef(null);
    const bioRef = useRef(null);
    const userStateRef = useRef(null);
    

    const {
        data: userData,
        isLoading: isLoadingProfile,
        isError: isErrorProfile,
        doFetch: fetchProfile,
    } = useFetchProfile(
        "https://sandbox.academiadevelopers.com/users/profiles/profile_data/",
        {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
    const {
        data: updatedUserData,
        isLoading: loadingUpdate,
        isError: errorUpdating,
        doFetch: updateProfile,
    } = useFetchProfile();

    const {
        data: profileImageData,
        isLoading: isLoadingUpdate,
        isError: errorProfileImage,
        doFetch: updateProfileImage,
    } = useFetchProfile();
    
    useEffect(() => {
        fetchProfile();
    }, [token]);

    useEffect(() => {
        if (profileImageData) {
            userData.image = profileImageData.image;
        }
    }, [profileImageData]);

    function handleEditMode() {
        setEditMode(!editMode);
    }

    function handleSubmit(event) {
        event.preventDefault();
        updateProfile(
            `https://sandbox.academiadevelopers.com/users/profiles/${userData.user__id}/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    first_name: firstNameRef.current.value,
                    last_name: lastNameRef.current.value,
                    email: emailRef.current.value,
                    dob: dobRef.current.value,
                    bio: bioRef.current.value,
                }),
            }
        );
    }
    


    if (isLoadingProfile) return <p>Cargando perfil...</p>;
    if (isErrorProfile) return <p>Error: {isErrorProfile}</p>;

    return (
        <div className="box box3 has-background-danger-70" >
        <div className="card"
        style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            marginBottom: "0.5rem",
            flexDirection: "column",
        }}>
        {userData ? (
            <>
                <form className="card-content" onSubmit={handleSubmit}>
                    <div className="media">
                        <div className="profileImg" style={{ height: "160px", width: "160px", padding: "1%" }}>
                            <figure >
                                <img
                                    src={
                                        userData.image
                                            ? `https://sandbox.academiadevelopers.com/${userData.image}`
                                            : defaultImage
                                    }
                                    alt="Profile image"
                                    style={{ borderRadius: "50%" }}
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </figure>
                        </div>
                        <div className="card-content">
                            {editMode ? (
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "0.5rem",
                                        alignItems: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="input is-small"
                                        ref={firstNameRef}
                                        defaultValue={userData.first_name}
                                        style={{ width: "40%" }}
                                    />
                                    <input
                                        type="text"
                                        className="input is-small"
                                        ref={lastNameRef}
                                        defaultValue={userData.last_name}
                                        style={{ width: "40%" }}
                                    />
                                </div>
                            ) : (
                                <p className="title is-4 pb-2">
                                    {firstNameRef.current?.value ||
                                        userData.first_name}{" "}
                                    {lastNameRef.current?.value ||
                                        userData.last_name}
                                </p>
                            )}
                            
                        </div>
                        <button
                            className="button is-primary"
                            onClick={handleEditMode}
                        >
                            {!editMode ? "Editar" : "Salir"}
                        </button>
                    </div>

                    <div className="content">
                        <div className="field">
                            <label className="label">Email:</label>
                            <div className="control">
                                <input
                                    type="email"
                                    className="input"
                                    id="email"
                                    name="email"
                                    ref={emailRef}
                                    defaultValue={userData.email}
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">
                                Fecha de Nacimiento:
                            </label>
                            <div className="control">
                                <input
                                    type="date"
                                    className="input"
                                    id="dob"
                                    name="dob"
                                    ref={dobRef}
                                    defaultValue={userData.dob}
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Biografía:</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    id="bio"
                                    name="bio"
                                    ref={bioRef}
                                    defaultValue={
                                        userData.bio || "No disponible"
                                    }
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        {editMode ? (
                            <div className="field">
                                <button
                                    className="button is-primary is-fullwidth"
                                    type="submit"
                                >
                                    {loadingUpdate
                                        ? "Enviando..."
                                        : "Enviar"}
                                    {errorUpdating
                                        ? "Ocurrió un error al enviar el formulario"
                                        : null}
                                </button>
                            </div>
                        ) : null}
                    </div>
                </form>
                <ProfileImageModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    userId={userData.user__id}
                    onUpload={{
                        isLoadingUpdate,
                        profileImageData,
                        updateProfileImage,
                    }}
                />
            </>
        ) : (
            <p className="subtitle">No se encontraron datos del usuario.</p>
        )}
    </div>
    </div>
        
    );
}