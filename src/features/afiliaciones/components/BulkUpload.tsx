import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import type { BulkUploadResult } from '../types.js';

interface BulkUploadProps {
  onUpload?: (file: File) => Promise<BulkUploadResult> | BulkUploadResult;
}

export default function BulkUpload({ onUpload }: BulkUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<BulkUploadResult | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setResult(null);
    }
  }

  async function handleUpload() {
    if (!file || !onUpload) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await onUpload(file);
      setResult(res);
    } catch {
      setResult({ total: 0, success: 0, errors: 1, rows: [{ row: 0, status: 'error', message: 'Error al procesar el archivo.' }] });
    } finally {
      setLoading(false);
    }
  }

  function handleSimulateUpload() {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        total: 10,
        success: 8,
        errors: 2,
        rows: [
          { row: 1, status: 'ok' },
          { row: 2, status: 'ok' },
          { row: 3, status: 'error', message: 'Documento duplicado' },
          { row: 4, status: 'ok' },
          { row: 5, status: 'ok' },
          { row: 6, status: 'ok' },
          { row: 7, status: 'error', message: 'EPS no válida' },
          { row: 8, status: 'ok' },
          { row: 9, status: 'ok' },
          { row: 10, status: 'ok' },
        ],
      });
      setLoading(false);
    }, 1500);
  }

  const handleProcess = onUpload ? handleUpload : handleSimulateUpload;

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Carga masiva (Excel)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Suba un archivo Excel (.xlsx, .xls) con las columnas: tipo_documento, documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, genero, eps_codigo, tipo_afiliacion, fecha_vigencia.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} style={{ display: 'none' }} />
          <Button variant="outlined" onClick={() => inputRef.current?.click()}>
            Seleccionar archivo
          </Button>
          {file && (
            <>
              <Typography variant="body2">{file.name}</Typography>
              <Button variant="contained" onClick={handleProcess} disabled={loading}>
                {loading ? 'Procesando…' : 'Procesar carga'}
              </Button>
            </>
          )}
        </Box>
      </Paper>

      {result && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Resultado de la carga
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={`Total: ${result.total}`} size="small" variant="outlined" />
            <Chip label={`Éxitos: ${result.success}`} size="small" color="success" variant="outlined" />
            <Chip label={`Errores: ${result.errors}`} size="small" color="error" variant="outlined" />
          </Box>
          {result.rows.length > 0 && (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Fila</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Mensaje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.rows.slice(0, 15).map((r, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{r.row}</TableCell>
                    <TableCell><Chip label={r.status === 'ok' ? 'OK' : 'Error'} size="small" color={r.status === 'ok' ? 'success' : 'error'} variant="outlined" /></TableCell>
                    <TableCell>{r.message ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {result.rows.length > 15 && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Mostrando las primeras 15 filas. Total: {result.rows.length} filas procesadas.
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
}
