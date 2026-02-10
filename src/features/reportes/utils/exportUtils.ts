/**
 * Utilidades para exportación de reportes a PDF y Excel (CSV).
 */

import type { KPI, ChartDataPoint } from '../types';

export function exportToCSV(
  kpis: KPI[],
  chartData: ChartDataPoint[],
  chartKey: string,
  filename = 'reporte-salud-militar.csv'
) {
  const rows: string[][] = [];
  rows.push(['Reporte - Salud Militar']);
  rows.push([]);
  rows.push(['KPIs']);
  rows.push(['Indicador', 'Valor', 'Unidad']);
  kpis.forEach((k) => {
    rows.push([k.label, String(k.value), k.unit ?? '']);
  });
  rows.push([]);
  rows.push(['Datos del gráfico']);
  rows.push(['Periodo', 'Valor']);
  chartData.forEach((d) => {
    const val = typeof d[chartKey] === 'number' ? d[chartKey] : d.value ?? 0;
    rows.push([d.name, String(val)]);
  });

  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function exportToPDF(
  kpis: KPI[],
  chartData: ChartDataPoint[],
  chartKey: string,
  chartTitle: string
) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reporte - Salud Militar</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; margin: 0; }
    h1 { margin-bottom: 24px; }
    h2 { font-size: 16px; margin-top: 24px; margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th, td { padding: 8px; border: 1px solid #ddd; }
    th { background: #f5f5f5; text-align: left; }
    td.num { text-align: right; }
    .footer { margin-top: 32px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <h1>Reporte - Salud Militar</h1>
  <h2>KPIs</h2>
  <table>
    <thead><tr><th>Indicador</th><th>Valor</th><th>Unidad</th></tr></thead>
    <tbody>
      ${kpis.map((k) => `<tr><td>${k.label}</td><td class="num">${typeof k.value === 'number' ? k.value.toLocaleString('es-CO') : k.value}</td><td>${k.unit ?? ''}</td></tr>`).join('')}
    </tbody>
  </table>
  <h2>${chartTitle}</h2>
  <table>
    <thead><tr><th>Periodo</th><th>Valor</th></tr></thead>
    <tbody>
      ${chartData.map((d) => {
        const val = typeof d[chartKey] === 'number' ? d[chartKey] : d.value ?? 0;
        return `<tr><td>${d.name}</td><td class="num">${typeof val === 'number' ? val.toLocaleString('es-CO') : val}</td></tr>`;
      }).join('')}
    </tbody>
  </table>
  <p class="footer">Generado el ${new Date().toLocaleString('es-CO')}</p>
</body>
</html>
  `;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 250);
  }
}
