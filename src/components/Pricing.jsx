import { Check, Crown, ArrowRight } from 'lucide-react';
import styles from './Pricing.module.css';

const plans = [
  {
    name: 'Gratis',
    price: '$0',
    period: 'para siempre',
    description: 'Todo lo básico para comenzar a organizar tus finanzas.',
    features: [
      'Registro manual ilimitado',
      'Vista de transacciones',
      'Dashboards básicos',
      'Categorización de gastos',
      'Exportar a CSV',
    ],
    cta: 'Comenzar gratis',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/mes',
    description: 'Automatización y control total para optimizar tu dinero.',
    features: [
      'Todo lo del plan Gratis',
      'Sincronización bancaria',
      'Presupuestos por categoría',
      'Alertas inteligentes',
      'Insights financieros',
      'Soporte prioritario',
      'Sin anuncios',
    ],
    cta: 'Probar 14 días gratis',
    popular: true,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className="container">
        <div className="section-header">
          <span className={styles.sectionLabel}>Precios</span>
          <h2>Simple y transparente</h2>
          <p>
            Comienza gratis y actualiza cuando lo necesites. Sin sorpresas, sin
            costos ocultos.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>
                  <Crown size={14} />
                  Más popular
                </div>
              )}
              <div className={styles.planHeader}>
                <h3>{plan.name}</h3>
                <div className={styles.priceWrapper}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>

              <ul className={styles.featureList}>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={18} className={styles.checkIcon} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} ${styles.planBtn}`}
              >
                {plan.cta}
                <ArrowRight size={18} />
              </a>
            </div>
          ))}
        </div>

        <div className={styles.guarantee}>
          <div className={styles.guaranteeIcon}>🛡️</div>
          <div className={styles.guaranteeContent}>
            <h4>Garantía de satisfacción</h4>
            <p>
              Si no estás satisfecho con Premium, te devolvemos tu dinero en los
              primeros 30 días. Sin preguntas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
