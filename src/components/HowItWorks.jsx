import { UserPlus, Wallet, LineChart, ArrowRight } from 'lucide-react';
import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Regístrate gratis',
    description:
      'Crea tu cuenta en segundos. Sin tarjeta de crédito, sin compromisos. Solo tu email y una contraseña.',
  },
  {
    number: '02',
    icon: Wallet,
    title: 'Registra o sincroniza',
    description:
      'Añade tus gastos manualmente o conecta tus cuentas bancarias para importar transacciones automáticamente.',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Obtén control',
    description:
      'Visualiza tus finanzas, recibe alertas de presupuesto y toma decisiones informadas sobre tu dinero.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className={styles.howItWorks}>
      <div className="container">
        <div className="section-header">
          <span className={styles.sectionLabel}>Cómo funciona</span>
          <h2>Empieza en 3 simples pasos</h2>
          <p>
            No necesitas ser experto en finanzas. Fintia hace el trabajo pesado
            por ti.
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepWrapper}>
              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.number}</span>
                <div className={styles.stepIcon}>
                  <step.icon size={32} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.stepConnector}>
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <h3>¿Listo para empezar?</h3>
            <p>Únete a miles de usuarios que ya controlan sus finanzas con Fintia.</p>
          </div>
          <a href="#" className="btn btn-primary">
            Crear cuenta gratis
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
