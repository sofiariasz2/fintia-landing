'use client'

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import styles from './page.module.css';

const statsCards = [
  {
    title: 'Balance Total',
    value: '$12,450.00',
    change: '+8.2%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Ingresos del Mes',
    value: '$4,200.00',
    change: '+12.5%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'blue',
  },
  {
    title: 'Gastos del Mes',
    value: '$2,340.00',
    change: '-5.3%',
    changeType: 'negative',
    icon: CreditCard,
    color: 'red',
  },
  {
    title: 'Ahorro',
    value: '$1,860.00',
    change: '+24.1%',
    changeType: 'positive',
    icon: PiggyBank,
    color: 'purple',
  },
];

const recentTransactions = [
  {
    id: 1,
    name: 'Supermercado',
    category: 'Comida',
    amount: -85.50,
    date: 'Hoy, 14:30',
    icon: '🛒',
  },
  {
    id: 2,
    name: 'Salario',
    category: 'Ingresos',
    amount: 3500.00,
    date: 'Ayer',
    icon: '💰',
  },
  {
    id: 3,
    name: 'Netflix',
    category: 'Entretenimiento',
    amount: -15.99,
    date: '20 Feb',
    icon: '🎬',
  },
  {
    id: 4,
    name: 'Uber',
    category: 'Transporte',
    amount: -24.00,
    date: '19 Feb',
    icon: '🚗',
  },
  {
    id: 5,
    name: 'Freelance',
    category: 'Ingresos',
    amount: 750.00,
    date: '18 Feb',
    icon: '💼',
  },
];

const budgets = [
  { name: 'Comida', spent: 450, total: 600, color: '#22c55e' },
  { name: 'Transporte', spent: 180, total: 300, color: '#3b82f6' },
  { name: 'Entretenimiento', spent: 95, total: 150, color: '#a855f7' },
  { name: 'Servicios', spent: 210, total: 250, color: '#f59e0b' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1>Dashboard</h1>
            <p>Bienvenido de nuevo. Aquí está el resumen de tus finanzas.</p>
          </div>
          <div className={styles.dateFilter}>
            <select defaultValue="month">
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="year">Este año</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          {statsCards.map((stat, index) => (
            <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon}>
                  <stat.icon size={20} />
                </div>
                <button className={styles.statMenu}>
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className={styles.statContent}>
                <p className={styles.statTitle}>{stat.title}</p>
                <p className={styles.statValue}>{stat.value}</p>
                <div className={`${styles.statChange} ${styles[stat.changeType]}`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  <span>{stat.change} vs mes pasado</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Transactions */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Transacciones Recientes</h2>
              <a href="/dashboard/transactions" className={styles.viewAll}>
                Ver todas
              </a>
            </div>
            <div className={styles.transactionsList}>
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className={styles.transactionItem}>
                  <div className={styles.transactionIcon}>
                    {transaction.icon}
                  </div>
                  <div className={styles.transactionInfo}>
                    <p className={styles.transactionName}>{transaction.name}</p>
                    <p className={styles.transactionCategory}>
                      {transaction.category} · {transaction.date}
                    </p>
                  </div>
                  <p
                    className={`${styles.transactionAmount} ${
                      transaction.amount > 0 ? styles.positive : styles.negative
                    }`}
                  >
                    {transaction.amount > 0 ? '+' : ''}
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Budgets */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Presupuestos</h2>
              <a href="/dashboard/budgets" className={styles.viewAll}>
                Gestionar
              </a>
            </div>
            <div className={styles.budgetsList}>
              {budgets.map((budget, index) => {
                const percentage = Math.round((budget.spent / budget.total) * 100);
                return (
                  <div key={index} className={styles.budgetItem}>
                    <div className={styles.budgetHeader}>
                      <span className={styles.budgetName}>{budget.name}</span>
                      <span className={styles.budgetAmount}>
                        ${budget.spent} / ${budget.total}
                      </span>
                    </div>
                    <div className={styles.budgetBar}>
                      <div
                        className={styles.budgetProgress}
                        style={{
                          width: `${percentage}%`,
                          background: budget.color,
                        }}
                      />
                    </div>
                    <span
                      className={`${styles.budgetPercentage} ${
                        percentage >= 80 ? styles.warning : ''
                      }`}
                    >
                      {percentage}% usado
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <h3>Acciones Rápidas</h3>
          <div className={styles.actionsGrid}>
            <button className={styles.actionCard}>
              <span className={styles.actionIcon}>➕</span>
              <span>Agregar Gasto</span>
            </button>
            <button className={styles.actionCard}>
              <span className={styles.actionIcon}>💰</span>
              <span>Agregar Ingreso</span>
            </button>
            <button className={styles.actionCard}>
              <span className={styles.actionIcon}>🎯</span>
              <span>Nueva Meta</span>
            </button>
            <button className={styles.actionCard}>
              <span className={styles.actionIcon}>📊</span>
              <span>Ver Reportes</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
