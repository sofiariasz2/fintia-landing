import { ArrowRight, Play } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Nuevo: Sincronización bancaria disponible
          </div>

          <h1 className={styles.headline}>
            Controla tu dinero{' '}
            <span className="text-gradient">sin complicaciones</span>
          </h1>

          <p className={styles.subheadline}>
            Fintia te ayuda a registrar, visualizar y automatizar tus finanzas
            personales en un solo lugar. Simple, visual y diseñado para ti.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#" className="btn btn-primary">
              Comenzar gratis
              <ArrowRight size={18} />
            </a>
            <a href="#pricing" className="btn btn-secondary">
              <Play size={18} />
              Ver versión Premium
            </a>
          </div>

          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>10k+</span>
              <span className={styles.trustLabel}>Usuarios activos</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>4.9</span>
              <span className={styles.trustLabel}>Calificación</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>$2M+</span>
              <span className={styles.trustLabel}>Gestionados</span>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.dashboardMockup}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className={styles.mockupTitle}>Dashboard - Fintia</span>
            </div>
            <div className={styles.mockupContent}>
              <div className={styles.mockupStats}>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Balance Total</span>
                  <span className={styles.statValue}>$12,450.00</span>
                  <span className={styles.statChange}>+8.2% este mes</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Gastos</span>
                  <span className={styles.statValueRed}>-$2,340.00</span>
                  <span className={styles.statChangeNeg}>-12% vs mes pasado</span>
                </div>
              </div>
              <div className={styles.mockupChart}>
                <div className={styles.chartTitle}>Gastos por categoría</div>
                <div className={styles.chartBars}>
                  <div className={styles.chartBar}>
                    <span className={styles.barLabel}>Comida</span>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: '75%' }}></div>
                    </div>
                    <span className={styles.barValue}>$450</span>
                  </div>
                  <div className={styles.chartBar}>
                    <span className={styles.barLabel}>Transporte</span>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: '55%' }}></div>
                    </div>
                    <span className={styles.barValue}>$320</span>
                  </div>
                  <div className={styles.chartBar}>
                    <span className={styles.barLabel}>Servicios</span>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: '40%' }}></div>
                    </div>
                    <span className={styles.barValue}>$180</span>
                  </div>
                  <div className={styles.chartBar}>
                    <span className={styles.barLabel}>Ocio</span>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: '30%' }}></div>
                    </div>
                    <span className={styles.barValue}>$120</span>
                  </div>
                </div>
              </div>
              <div className={styles.mockupTransactions}>
                <div className={styles.transactionTitle}>Últimas transacciones</div>
                <div className={styles.transactionList}>
                  <div className={styles.transaction}>
                    <div className={styles.transactionIcon} style={{ background: '#fef3c7' }}>🛒</div>
                    <div className={styles.transactionInfo}>
                      <span className={styles.transactionName}>Supermercado</span>
                      <span className={styles.transactionDate}>Hoy, 14:30</span>
                    </div>
                    <span className={styles.transactionAmount}>-$85.50</span>
                  </div>
                  <div className={styles.transaction}>
                    <div className={styles.transactionIcon} style={{ background: '#dcfce7' }}>💰</div>
                    <div className={styles.transactionInfo}>
                      <span className={styles.transactionName}>Salario</span>
                      <span className={styles.transactionDate}>Ayer</span>
                    </div>
                    <span className={styles.transactionAmountPositive}>+$3,500.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.floatingCard1}>
            <div className={styles.alertIcon}>🔔</div>
            <div className={styles.alertContent}>
              <span className={styles.alertTitle}>Alerta de presupuesto</span>
              <span className={styles.alertText}>80% gastado en Comida</span>
            </div>
          </div>
          <div className={styles.floatingCard2}>
            <div className={styles.syncIcon}>✓</div>
            <span>Sincronizado</span>
          </div>
        </div>
      </div>

      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>
    </section>
  );
};

export default Hero;
