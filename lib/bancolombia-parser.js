/**
 * Parser for Bancolombia SMS/Email notifications
 * Extracts transaction data from notification text
 */

export function parseBancolombiaMessage(text) {
  if (!text || !text.includes('Bancolombia')) {
    return null;
  }

  // Pattern for purchases: "Compraste COP13.800,00 en LUGAR con tu T.Cred *6170, el 16/02/2026 a las 09:01"
  const purchasePattern = /Bancolombia:\s*Compraste\s+COP?([\d.,]+)\s+en\s+(.+?)\s+con\s+tu\s+T\.Cred\s+\*(\d+),?\s+el\s+(\d{2}\/\d{2}\/\d{4})\s+a\s+las\s+(\d{2}:\d{2})/i;

  // Pattern for credit card payments: "NOMBRE hizo un abono por $567,899 a tu tarjeta de credito terminada en **6170, el 05/02/2026 12:18"
  const paymentPattern = /Bancolombia:\s*(.+?)\s+hizo\s+un\s+abono\s+por\s+\$?([\d.,]+)\s+a\s+tu\s+tarjeta\s+de\s+credito\s+terminada\s+en\s+\*+(\d+),?\s+el\s+(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2})/i;

  // Pattern for transfers received: "Recibiste una transferencia por $1,100,000 de NOMBRE en tu cuenta **5800, el 02/02/2026 a las 17:33"
  const transferPattern = /Bancolombia:\s*Recibiste\s+una\s+transferencia\s+por\s+\$?([\d.,]+)\s+de\s+(.+?)\s+en\s+tu\s+cuenta\s+\*+(\d+),?\s+el\s+(\d{2}\/\d{2}\/\d{4})\s+a\s+las\s+(\d{2}:\d{2})/i;

  let match;
  let transaction = null;

  // Try purchase pattern
  match = text.match(purchasePattern);
  if (match) {
    transaction = {
      type: 'expense',
      category: 'purchase',
      amount: parseAmount(match[1]),
      description: match[2].trim(),
      account: `*${match[3]}`,
      date: parseDate(match[4], match[5]),
      raw: text,
    };
    return transaction;
  }

  // Try payment pattern (credit card payment - this is income to the card)
  match = text.match(paymentPattern);
  if (match) {
    transaction = {
      type: 'income',
      category: 'card_payment',
      amount: parseAmount(match[2]),
      description: `Abono de ${match[1].trim()}`,
      account: `*${match[3]}`,
      date: parseDate(match[4], match[5]),
      raw: text,
    };
    return transaction;
  }

  // Try transfer pattern
  match = text.match(transferPattern);
  if (match) {
    transaction = {
      type: 'income',
      category: 'transfer',
      amount: parseAmount(match[1]),
      description: `Transferencia de ${match[2].trim()}`,
      account: `*${match[3]}`,
      date: parseDate(match[4], match[5]),
      raw: text,
    };
    return transaction;
  }

  return null;
}

function parseAmount(amountStr) {
  // Remove dots (thousands separator) and replace comma with dot for decimals
  // Handle both "13.800,00" and "1,100,000" formats
  const cleaned = amountStr.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned);
}

function parseDate(dateStr, timeStr) {
  // Parse "16/02/2026" and "09:01"
  const [day, month, year] = dateStr.split('/');
  const [hours, minutes] = timeStr.split(':');
  return new Date(year, month - 1, day, hours, minutes).toISOString();
}

export function parseMultipleMessages(messages) {
  return messages
    .map(msg => parseBancolombiaMessage(msg.snippet || msg.body || msg))
    .filter(Boolean);
}
