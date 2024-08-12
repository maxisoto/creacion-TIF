import "../App.css"

export default function About() {
    return (
        <><div className="about-section">
            <h1>Sobre Nosotros</h1>
            <p>Programacion 3 TIF - Prof. Luis Parada</p>
            <p>Tecnicatura en desarrollo de software - UPATECO</p>
        </div><h2 style={{ textAlign: "center" }}>Equipo de Desarrollo</h2><div className="row">
                <div className="column">
                    <div className="card">
                        <img src="src\assets\emilio.png" alt="Jane" style={{ width: "10%" }} />
                        <div className="container">
                            <h2>Emilio Russo</h2>
                            <p className="title">Programador</p>
                            <p>erussoarg@gmail.com</p>
                            <p><button className="button">Contacto</button></p>
                        </div>
                    </div>
                </div>

                <div className="column">
                <div className="card">
                        <img src="src\assets\max.png" alt="Jane" style={{ width: "10%" }} />
                        <div className="container">
                            <h2>Maximiliano Soto</h2>
                            <p className="title">Programador</p>
                            <p>maxisoto@gmail.com</p>
                            <p><button className="button">Contacto</button></p>
                        </div>
                    </div>
                </div>

                <div className="column">
                <div className="card">
                        <img src="src\assets\rafa.png" alt="Jane" style={{ width: "10%" }} />
                        <div className="container">
                            <h2>Rafael Solano</h2>
                            <p className="title">Programador</p>
                            <p>rafasolano@gmail.com</p>
                            <p><button className="button">Contacto</button></p>
                        </div>
                    </div>
                </div>
            </div></>
    );
}