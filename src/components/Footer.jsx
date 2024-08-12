import React from 'react';
import '../styles/footer.css';

function Footer({ appName }) {
  return (
      <footer className="footer">
          <div className="content has-text-centered">
              <div className="social-icons">
                  <a className="icon" href="https://instagram.com" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                  </a>
                  <a className="icon" href="https://twitter.com" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                  </a>
                  <a className="icon" href="https://facebook.com" aria-label="Facebook">
                      <i className="fab fa-facebook"></i>
                  </a>
                  <a className="icon" href="https://wa.me/3875016929" aria-label="WhatsApp">
                        <i className="fab fa-whatsapp"></i>
                    </a>
                  <a className="icon" href="https://www.youtube.com/playlist?list=PLexg68_-qlOc8mXKWNq_EclmyNtkgP4Nf" aria-label="YouTube">
                        <i className="fab fa-youtube"></i>
                    </a>
              </div>
              
              <p className="footer-text">
                  &copy; 2024 {appName}. Todos los derechos reservados.
              </p>
          </div>
      </footer>
  );
}

export default Footer;