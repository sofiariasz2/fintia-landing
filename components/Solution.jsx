import { Sparkles, BarChart3, Zap, Heart } from 'lucide-react';
import styles from './Solution.module.css';

const features = [
  {
    icon: Sparkles,
    title: 'Simple',
    description: 'Interfaz limpia sin opciones abrumadoras. Solo lo que necesitas.',
  },
  {
    icon: BarChart3,
    title: 'Visual',
    description: 'Gráficos claros que te muestran tu situación financiera de un vistazo.',
  },
  {
    icon: Zap,
    title: 'Automatizado',
    description: 'Sincroniza tus cuentas y olvídate del registro manual tedioso.',
  },
  {
    icon: Heart,
    title: 'Para ti',
    description: 'Diseñado para personas reales, no para contadores expertos.',
  },
];

const Solution = () => {
  return (
    <section className={styles.solution}>
      <div className="container">
        <div className={styles.solutionContent}>
          <div className={styles.solutionText}>
            <span className={styles.sectionLabel}>La solución</span>
            <h2>
              Conoce <span className="text-gradient">Fintia</span>
            </h2>
            <p className={styles.solutionDescription}>
              Una herramienta de finanzas personales que realmente querrás usar.
              Sin jerga financiera complicada, sin funciones innecesarias.
              Solo claridad sobre tu dinero.
            </p>

            <div className={styles.featureList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <feature.icon size={22} />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.solutionVisual}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneNotch}></div>
              <div className={styles.phoneScreen}>
                <div className={styles.appHeader}>
                  <span className={styles.greeting}>Hola, María 👋</span>
                  <span className={styles.date}>Febrero 2025</span>
                </div>
                <div className={styles.balanceCard}>
                  <span className={styles.balanceLabel}>Tu balance</span>
                  <span className={styles.balanceAmount}>$8,542.00</span>
                  <div className={styles.balanceTrend}>
                    <span className={styles.trendUp}>↑ 12%</span>
                    <span>vs mes pasado</span>
                  </div>
                </div>
                <div className={styles.quickStats}>
                  <div className={styles.quickStat}>
                    <span className={styles.quickStatIcon}>💰</span>
                    <span className={styles.quickStatValue}>$4,200</span>
                    <span className={styles.quickStatLabel}>Ingresos</span>
                  </div>
                  <div className={styles.quickStat}>
                    <span className={styles.quickStatIcon}>🛍️</span>
                    <span className={styles.quickStatValue}>$1,658</span>
                    <span className={styles.quickStatLabel}>Gastos</span>
                  </div>
                  <div className={styles.quickStat}>
                    <span className={styles.quickStatIcon}>🎯</span>
                    <span className={styles.quickStatValue}>85%</span>
                    <span className={styles.quickStatLabel}>Meta</span>
                  </div>
                </div>
                <div className={styles.miniChart}>
                  <div className={styles.chartLine}></div>
                </div>
              </div>
            </div>
            <div className={styles.decoration1}></div>
            <div className={styles.decoration2}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
