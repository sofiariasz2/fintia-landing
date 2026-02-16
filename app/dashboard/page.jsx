'use client'

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  RefreshCw,
  Mail,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import styles from './page.module.css';

const getCategoryIcon = (category) => {
  const icons = {
    purchase: '🛒',
    card_payment: '💳',
    transfer: '💸',
    default: '💰',
  };
  return icons[category] || icons.default;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Hoy, ${date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays === 1) {
    return 'Ayer';
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`;
  } else {
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
  }
};

const budgets = [
  { name: 'Comida', spent: 450, total: 600, color: '#22c55e' },
  { name: 'Transporte', spent: 180, total: 300, color: '#3b82f6' },
  { name: 'Entretenimiento', spent: 95, total: 150, color: '#a855f7' },
  { name: 'Servicios', spent: 210, total: 250, color: '#f59e0b' },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 });
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    if (!session?.accessToken) return;

    setLoading(true);
    try {
      const res = await fetch('/api/gmail/transactions');
      const data = await res.json();

      if (data.transactions) {
        setTransactions(data.transactions);

        // Calculate summary
        const income = data.transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        const expenses = data.transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        setSummary({
          totalIncome: income,
          totalExpenses: expenses,
          balance: income - expenses,
        });
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const syncEmails = async () => {
    setSyncing(true);
    try {
      await fetchTransactions();
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchTransactions();
    }
  }, [session]);

  const statsCards = [
    {
      title: 'Balance Total',
      value: formatCurrency(summary.balance),
      change: summary.balance >= 0 ? '+' : '',
      changeType: summary.balance >= 0 ? 'positive' : 'negative',
      icon: DollarSign,
      color: 'green',
    },
    {
      title: 'Ingresos',
      value: formatCurrency(summary.totalIncome),
      change: '',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'blue',
    },
    {
      title: 'Gastos',
      value: formatCurrency(summary.totalExpenses),
      change: '',
      changeType: 'negative',
      icon: CreditCard,
      color: 'red',
    },
    {
      title: 'Transacciones',
      value: transactions.length.toString(),
      change: '',
      changeType: 'positive',
      icon: PiggyBank,
      color: 'purple',
    },
  ];

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1>Dashboard</h1>
            <p>Bienvenido de nuevo. Aquí está el resumen de tus finanzas.</p>
          </div>
          <div className={styles.headerActions}>
            {!session?.accessToken ? (
              <button
                onClick={() => signIn('google')}
                className={styles.connectButton}
              >
                <Mail size={18} />
                Conectar Gmail
              </button>
            ) : (
              <button
                onClick={syncEmails}
                className={styles.syncButton}
                disabled={syncing}
              >
                <RefreshCw size={18} className={syncing ? styles.spinning : ''} />
                {syncing ? 'Sincronizando...' : 'Sincronizar'}
              </button>
            )}
          </div>
        </div>

        {/* Google Auth Status */}
        {status === 'loading' && (
          <div className={styles.authStatus}>
            <p>Cargando...</p>
          </div>
        )}

        {!session?.accessToken && status !== 'loading' && (
          <div className={styles.authBanner}>
            <Mail size={24} />
            <div>
              <h3>Conecta tu correo de Gmail</h3>
              <p>Para importar automáticamente tus transacciones de Bancolombia, conecta tu cuenta de Gmail.</p>
            </div>
            <button onClick={() => signIn('google')} className={styles.connectButtonLarge}>
              Conectar Gmail
            </button>
          </div>
        )}

        {error && (
          <div className={styles.errorBanner}>
            <p>Error: {error}</p>
          </div>
        )}

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
                {stat.change && (
                  <div className={`${styles.statChange} ${styles[stat.changeType]}`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                    <span>{stat.change} vs mes pasado</span>
                  </div>
                )}
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
              {loading ? (
                <div className={styles.loadingState}>
                  <RefreshCw size={24} className={styles.spinning} />
                  <p>Cargando transacciones...</p>
                </div>
              ) : transactions.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No hay transacciones todavía.</p>
                  {!session?.accessToken && (
                    <p>Conecta tu Gmail para importar transacciones de Bancolombia.</p>
                  )}
                </div>
              ) : (
                transactions.slice(0, 5).map((transaction, index) => (
                  <div key={transaction.emailId || index} className={styles.transactionItem}>
                    <div className={styles.transactionIcon}>
                      {getCategoryIcon(transaction.category)}
                    </div>
                    <div className={styles.transactionInfo}>
                      <p className={styles.transactionName}>{transaction.description}</p>
                      <p className={styles.transactionCategory}>
                        {transaction.category === 'purchase' ? 'Compra' :
                         transaction.category === 'card_payment' ? 'Abono tarjeta' :
                         transaction.category === 'transfer' ? 'Transferencia' : transaction.category} · {formatDate(transaction.date)}
                      </p>
                    </div>
                    <p
                      className={`${styles.transactionAmount} ${
                        transaction.type === 'income' ? styles.positive : styles.negative
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                ))
              )}
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
