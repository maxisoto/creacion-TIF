import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { motion } from "framer-motion";

function ProfileImageModal({ isOpen, onClose, userId, onUpload }) {
    const { token } = useAuth("state");

    const handleImageUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", event.target.image.files[0]);

        try {
            await onUpload.updateProfileImage(
                `${import.meta.env.VITE_API_BASE_URL}users/profiles/${userId}/`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    body: formData,
                }
            );
        } catch (error) {
            console.error("Image upload failed:", error);
            // Mostrar mensaje de error al usuario
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.querySelector("input[name='image']").focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (onUpload.profileImageData) {
            onClose();
        }
    }, [onUpload.profileImageData]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`modal ${isOpen ? "is-active" : ""}`}
        >
            <div className="modal-background" onClick={onClose}></div>
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="modal-card"
            >
                <header className="modal-card-head">
                    <p className="modal-card-title">Subir Imagen de Perfil</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleImageUpload}>
                        <div className="field">
                            <label className="label">Seleccionar Imagen</label>
                            <div className="control">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            className="button is-primary"
                            type="submit"
                            disabled={onUpload.isLoadingUpdate}
                        >
                            {onUpload.isLoadingUpdate ? (
                                <span className="loader"></span>
                            ) : (
                                "Subir"
                            )}
                        </button>
                    </form>
                </section>
            </motion.div>
        </motion.div>
    );
}

export default ProfileImageModal;
