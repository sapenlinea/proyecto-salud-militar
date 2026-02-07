import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Appointment } from '../types.js';

interface CalendarViewProps {
  appointments: Appointment[];
  onSelectAppointment?: (apt: Appointment) => void;
}

type ViewMode = 'day' | 'week' | 'month';

const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function formatDateISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getWeekDates(date: Date): Date[] {
  const day = date.getDay();
  const start = new Date(date);
  start.setDate(start.getDate() - day);
  const result: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    result.push(d);
  }
  return result;
}

function getMonthDays(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const days = last.getDate();
  const result: Date[] = [];
  for (let i = 0; i < startPad; i++) {
    const d = new Date(year, month, -startPad + i + 1);
    result.push(d);
  }
  for (let i = 1; i <= days; i++) {
    result.push(new Date(year, month, i));
  }
  const rest = 42 - result.length;
  for (let i = 1; i <= rest; i++) {
    result.push(new Date(year, month + 1, i));
  }
  return result.slice(0, 42);
}

function getAppointmentsForDate(appointments: Appointment[], dateStr: string): Appointment[] {
  return appointments.filter((apt) => apt.date === dateStr && apt.status !== 'cancelada');
}

export default function CalendarView({ appointments, onSelectAppointment }: CalendarViewProps) {
  const [viewDate, setViewDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');

  const title = useMemo(() => {
    if (viewMode === 'day') return viewDate.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    if (viewMode === 'week') {
      const week = getWeekDates(viewDate);
      return `${week[0].toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })} - ${week[6].toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
    return viewDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
  }, [viewDate, viewMode]);

  const navigate = (delta: number) => {
    const d = new Date(viewDate);
    if (viewMode === 'day') d.setDate(d.getDate() + delta);
    else if (viewMode === 'week') d.setDate(d.getDate() + delta * 7);
    else d.setMonth(d.getMonth() + delta);
    setViewDate(d);
  };

  const dayDates = useMemo(() => {
    if (viewMode === 'day') return [viewDate];
    if (viewMode === 'week') return getWeekDates(viewDate);
    return getMonthDays(viewDate);
  }, [viewDate, viewMode]);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ButtonGroup size="small">
            <Button variant={viewMode === 'day' ? 'contained' : 'outlined'} onClick={() => setViewMode('day')}>Día</Button>
            <Button variant={viewMode === 'week' ? 'contained' : 'outlined'} onClick={() => setViewMode('week')}>Semana</Button>
            <Button variant={viewMode === 'month' ? 'contained' : 'outlined'} onClick={() => setViewMode('month')}>Mes</Button>
          </ButtonGroup>
          <Button size="small" onClick={() => navigate(-1)}>←</Button>
          <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
          <Button size="small" onClick={() => navigate(1)}>→</Button>
        </Box>
        <Button size="small" onClick={() => setViewDate(new Date())}>Hoy</Button>
      </Box>
      <Grid container spacing={1} columns={viewMode === 'day' ? 12 : 7}>
        {(viewMode === 'week' || viewMode === 'month') &&
          DAY_NAMES.map((name) => (
            <Grid key={name} size={1} sx={{ textAlign: 'center', py: 0.5 }}>
              <Typography variant="caption" fontWeight={600} color="text.secondary">{name}</Typography>
            </Grid>
          ))}
        {dayDates.map((d) => {
          const dateStr = formatDateISO(d);
          const apts = getAppointmentsForDate(appointments, dateStr);
          const isCurrentMonth = viewMode !== 'month' || d.getMonth() === viewDate.getMonth();
          const isToday = dateStr === formatDateISO(new Date());
          const colSize = viewMode === 'day' ? 12 : 1;
          return (
            <Grid key={dateStr} size={colSize} sx={{ minHeight: viewMode === 'month' ? 80 : 120 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  height: '100%',
                  opacity: isCurrentMonth ? 1 : 0.5,
                  bgcolor: isToday ? 'action.selected' : undefined,
                }}
              >
                <Typography variant="caption" fontWeight={600}>{d.getDate()}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                  {apts.slice(0, viewMode === 'month' ? 3 : 10).map((apt) => (
                    <Chip
                      key={apt.id}
                      label={`${apt.time} ${apt.patientName}`}
                      size="small"
                      sx={{ justifyContent: 'flex-start', fontSize: '0.7rem', maxWidth: '100%' }}
                      color={apt.status === 'confirmada' ? 'primary' : 'default'}
                      variant="outlined"
                      onClick={() => onSelectAppointment?.(apt)}
                    />
                  ))}
                  {apts.length > (viewMode === 'month' ? 3 : 10) && (
                    <Typography variant="caption" color="text.secondary">+{apts.length - (viewMode === 'month' ? 3 : 10)} más</Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
