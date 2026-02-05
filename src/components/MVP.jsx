import { Receipt, PieChart, Bell, Smartphone } from 'lucide-react';
import styles from './MVP.module.css';

const highlights = [
  {
    icon: Receipt,
    title: 'Registro de gastos',
    description: 'Añade y categoriza tus gastos en segundos.',
  },
  {
    icon: PieChart,
    title: 'Visualización clara',
    description: 'Gráficos que te muestran exactamente dónde va tu dinero.',
  },
  {
    icon: Bell,
    title: 'Alertas de presupuesto',
    description: 'Notificaciones cuando te acercas a tus límites.',
  },
  {
    icon: Smartphone,
    title: 'UX simple',
    description: 'Diseñado para ser intuitivo desde el primer momento.',
  },
];

const MVP = () => {
  return (
    <section className={styles.mvp}>
      <div className="container">
        <div className={styles.mvpContent}>
          <div className={styles.mvpText}>
            <span className={styles.sectionLabel}>Por qué Fintia</span>
            <h2>
              Construido para personas reales, no para contadores
            </h2>
            <p className={styles.mvpDescription}>
              Fintia nació de una frustración real: las apps de finanzas son
              demasiado complicadas. Creamos una herramienta que cualquiera puede
              usar, sin importar su experiencia financiera.
            </p>

            <div className={styles.highlightGrid}>
              {highlights.map((item, index) => (
                <div key={index} className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mvpVisual}>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <blockquote>
                "Por fin una app de finanzas que puedo entender. En 5 minutos ya
                tenía todo configurado y sabía exactamente en qué gastaba."
              </blockquote>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>MA</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>María Alejandra</span>
                  <span className={styles.authorRole}>Estudiante universitaria</span>
                </div>
              </div>
            </div>

            <div className={styles.statsCard}>
              <div className={styles.stat}>
                <span className={styles.statValue}>4.9/5</span>
                <span className={styles.statLabel}>Satisfacción</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statValue}>2 min</span>
                <span className={styles.statLabel}>Setup promedio</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statValue}>89%</span>
                <span className={styles.statLabel}>Retención</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MVP;
