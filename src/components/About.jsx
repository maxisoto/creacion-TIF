import "../styles/about.css"
import foto1 from '../assets/emilio.png';
import foto2 from '../assets/rafa.png';
import foto3 from '../assets/max.png';

export default function About() {
    return (
        <><div className="about-section">
            <h1>Sobre nosotros....</h1>
            <p>Somos el Grupo 16 - Materia Programacion 3</p>
            <p>Tecnicatura en Desarrollo de Software - Profesor Luis Parada</p>
        </div>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <img src={foto1} alt="Emilio Russo" style={{ width: "45%" }} />
                        <div className="container">
                            <h2>Emilio Russo</h2>
                            <p>erussoarg@gmail.com</p>
                            <p><button className="button">Contacto</button></p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img src={foto2} alt="Emilio Russo" style={{ width: "40%" }} />
                        <div className="container">
                            <h2>Rafael Solano</h2>
                            <p>rafasolano@gmail.com</p>
                            <p><button className="button">Contacto</button></p>
                        </div>
                    </div>
                </div>

                <div className="column">
                 <div className="card">
                        <img src={foto3} alt="Emilio Russo" style={{ width: "35%" }} />
                        <div className="container">
                            <h2>Maximiliano Soto</h2>
                            <p>maxisoto@gmail.com</p>
                            <p><button className="button">Contacto</button></p>
                        </div>
                    </div>
                </div>
            </div></>

    );
}