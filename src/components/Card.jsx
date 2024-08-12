import imgDefault from "../components/imgs/AT.jpeg";
import useTheme from "../hooks/useTheme";
import '../styles/card.css';
import icono from '../assets/fondo5.jpg'; 
import playIcon from '../assets/play.png'; 

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
                    <img src={icono} alt="Icono" className="song-icon" /> 
                    <div className="media-content">
                        <p className="title is-4">{song.title}</p>
                    </div>
                    <img src={playIcon} alt="Play" className="play-icon" /> 
                </div>
                <span className="tooltip">Reproducir ahora</span> 
            </div>
        </button>
    );
}
