import imgDefault from "../components/imgs/AT.jpeg";
import useTheme from "../hooks/useTheme";
export default function Card({ song }) {
    const { theme } = useTheme();

    return (
        <div className="column">
            <div className="card">
            <div className="card-image">
            <figure className="image is-4b3">
                <img
                src={imgDefault}
                alt="image cancion"
                />
            </figure>
            </div>
            <div >
            <div className="media">
                <div className="media-content">
                <p className="title is-4">{song.title}</p>
                
                </div>
            </div>
    
            <div className="content">
            <audio controls>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                
            </div>
            </div>
                </div>
        </div>
    );
}