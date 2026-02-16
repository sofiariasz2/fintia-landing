import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.ctaBackground}>
            <div className={styles.orb1}></div>
            <div className={styles.orb2}></div>
          </div>

          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>
              <Sparkles size={32} />
            </div>
            <h2>Empieza a tomar control de tu dinero hoy</h2>
            <p>
              Únete a miles de personas que ya están simplificando sus finanzas
              personales. Sin complicaciones, sin compromisos.
            </p>
            <div className={styles.ctaActions}>
              <a href="#" className="btn btn-primary">
                Crear cuenta gratis
                <ArrowRight size={18} />
              </a>
              <span className={styles.ctaNote}>
                Configuración en menos de 2 minutos
              </span>
            </div>

            <div className={styles.benefits}>
              <span className={styles.benefit}>✓ Sin tarjeta de crédito</span>
              <span className={styles.benefit}>✓ Cancela cuando quieras</span>
              <span className={styles.benefit}>✓ Soporte incluido</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
