import { Mail, Twitter, Instagram, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <a href="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#logoGradientFooter)" />
                  <path
                    d="M9 12h14M9 16h10M9 20h6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="22" cy="18" r="4" stroke="white" strokeWidth="2" />
                  <defs>
                    <linearGradient id="logoGradientFooter" x1="0" y1="0" x2="32" y2="32">
                      <stop stopColor="#22c55e" />
                      <stop offset="1" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className={styles.logoText}>Fintia</span>
            </a>
            <p className={styles.brandDescription}>
              Simplifica tus finanzas personales. Registra, visualiza y automatiza
              tu dinero en un solo lugar.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Twitter" className={styles.socialLink}>
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="Email" className={styles.socialLink}>
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h4>Producto</h4>
              <a href="#features">Funciones</a>
              <a href="#pricing">Precios</a>
              <a href="#how-it-works">Cómo funciona</a>
              <a href="#">Integraciones</a>
            </div>

            <div className={styles.linkColumn}>
              <h4>Compañía</h4>
              <a href="#">Sobre nosotros</a>
              <a href="#">Blog</a>
              <a href="#">Carreras</a>
              <a href="#">Contacto</a>
            </div>

            <div className={styles.linkColumn}>
              <h4>Soporte</h4>
              <a href="#">Centro de ayuda</a>
              <a href="#">FAQ</a>
              <a href="#">Comunidad</a>
              <a href="#">Estado del sistema</a>
            </div>

            <div className={styles.linkColumn}>
              <h4>Legal</h4>
              <a href="#">Privacidad</a>
              <a href="#">Términos de uso</a>
              <a href="#">Cookies</a>
              <a href="#">Seguridad</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Fintia. Todos los derechos reservados.</p>
          <div className={styles.footerBottomLinks}>
            <a href="#">Privacidad</a>
            <span>·</span>
            <a href="#">Términos</a>
            <span>·</span>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
