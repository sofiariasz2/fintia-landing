import { HelpCircle, Clock, Puzzle } from 'lucide-react';
import styles from './Problem.module.css';

const problems = [
  {
    icon: HelpCircle,
    title: '¿A dónde se va mi dinero?',
    description:
      'Muchas personas no saben exactamente en qué gastan. Al final del mes, el dinero simplemente desaparece sin explicación.',
    color: '#ef4444',
    bgColor: '#fef2f2',
  },
  {
    icon: Clock,
    title: 'El registro manual es agotador',
    description:
      'Anotar cada gasto, categorizar transacciones y mantener hojas de cálculo actualizadas consume tiempo y energía que no tienes.',
    color: '#f59e0b',
    bgColor: '#fffbeb',
  },
  {
    icon: Puzzle,
    title: 'Las apps financieras son complicadas',
    description:
      'La mayoría de herramientas financieras están diseñadas para expertos. Tienen demasiadas funciones que nunca usarás.',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
  },
];

const Problem = () => {
  return (
    <section className={styles.problem}>
      <div className="container">
        <div className="section-header">
          <span className={styles.sectionLabel}>El problema</span>
          <h2>
            Gestionar tus finanzas no debería ser{' '}
            <span className={styles.highlight}>tan difícil</span>
          </h2>
          <p>
            Si alguna vez te has sentido frustrado con tus finanzas personales,
            no estás solo. Estos son los problemas más comunes.
          </p>
        </div>

        <div className={styles.problemGrid}>
          {problems.map((problem, index) => (
            <div key={index} className={styles.problemCard}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: problem.bgColor }}
              >
                <problem.icon size={28} style={{ color: problem.color }} />
              </div>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
