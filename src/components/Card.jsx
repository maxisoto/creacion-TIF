import imgDefault from "../components/imgs/AT.jpeg";
import useTheme from "../hooks/useTheme";
import '../styles/card.css';
import icono from '../assets/fondo5.jpg'; // Importa la imagen del ícono de la canción
import playIcon from '../assets/play.png'; // Importa la imagen del ícono de play

export default function Card({ song, onClick }) {
    const { theme } = useTheme();

    return (
        <button className="song-list-item" onClick={() => onClick(song.song_file)}>
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img
                            src={imgDefault}
                            alt="image cancion"
                            className="fade-in"
                        />
                    </figure>
                </div>
                <div className="media-content-with-icon">
                    <img src={icono} alt="Icono" className="song-icon" /> {/* Imagen del ícono */}
                    <div className="media-content">
                        <p className="title is-4">{song.title}</p>
                    </div>
                    <img src={playIcon} alt="Play" className="play-icon" /> {/* Imagen del ícono de play */}
                </div>
                <span className="tooltip">Reproducir ahora</span> {/* Tooltip flotante */}
            </div>
        </button>
    );
}
