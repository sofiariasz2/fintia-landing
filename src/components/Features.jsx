import {
  PenLine,
  List,
  BarChart2,
  RefreshCw,
  PieChart,
  Bell,
  TrendingUp,
  Check,
  Crown,
} from 'lucide-react';
import styles from './Features.module.css';

const freeFeatures = [
  {
    icon: PenLine,
    title: 'Registro manual de gastos',
    description: 'Añade tus gastos de forma rápida y sencilla con solo unos toques.',
  },
  {
    icon: List,
    title: 'Vista de transacciones',
    description: 'Revisa tu historial de gastos organizado por fecha y categoría.',
  },
  {
    icon: BarChart2,
    title: 'Dashboards simples',
    description: 'Visualiza tus finanzas con gráficos claros y fáciles de entender.',
  },
];

const premiumFeatures = [
  {
    icon: RefreshCw,
    title: 'Sincronización bancaria',
    description: 'Conecta tus cuentas y tarjetas para importar transacciones automáticamente.',
  },
  {
    icon: PieChart,
    title: 'Presupuestos por categoría',
    description: 'Define límites de gasto para cada categoría y monitorea tu progreso.',
  },
  {
    icon: Bell,
    title: 'Alertas inteligentes',
    description: 'Recibe notificaciones cuando te acerques a tus límites de presupuesto.',
  },
  {
    icon: TrendingUp,
    title: 'Insights financieros',
    description: 'Obtén análisis avanzados y recomendaciones personalizadas para ahorrar.',
  },
];

const Features = () => {
  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <div className="section-header">
          <span className={styles.sectionLabel}>Funciones</span>
          <h2>Todo lo que necesitas para controlar tu dinero</h2>
          <p>
            Desde registro básico hasta automatización completa. Elige el plan
            que mejor se adapte a ti.
          </p>
        </div>

        <div className={styles.featuresWrapper}>
          {/* Free Plan */}
          <div className={styles.planSection}>
            <div className={styles.planHeader}>
              <span className={styles.planBadge}>
                <Check size={14} />
                Gratis
              </span>
              <h3>Plan Gratuito</h3>
              <p>Perfecto para empezar a organizar tus finanzas</p>
            </div>
            <div className={styles.featureGrid}>
              {freeFeatures.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <feature.icon size={24} />
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Plan */}
          <div className={`${styles.planSection} ${styles.premium}`}>
            <div className={styles.planHeader}>
              <span className={`${styles.planBadge} ${styles.premiumBadge}`}>
                <Crown size={14} />
                Premium
              </span>
              <h3>Plan Premium</h3>
              <p>Automatización total y control avanzado de tus finanzas</p>
            </div>
            <div className={styles.featureGrid}>
              {premiumFeatures.map((feature, index) => (
                <div key={index} className={`${styles.featureCard} ${styles.premiumCard}`}>
                  <div className={`${styles.featureIcon} ${styles.premiumIcon}`}>
                    <feature.icon size={24} />
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
