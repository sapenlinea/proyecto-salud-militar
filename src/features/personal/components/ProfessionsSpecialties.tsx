import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Profession, Specialty } from '../types';

interface ProfessionsSpecialtiesProps {
  professions: Profession[];
  specialties: Specialty[];
}

export default function ProfessionsSpecialties({ professions, specialties }: ProfessionsSpecialtiesProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleExpand(id: string) {
    setExpanded((p) => (p === id ? null : id));
  }

  function getSpecialtiesForProfession(professionId: string) {
    return specialties.filter((s) => s.professionId === professionId);
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Profesiones del personal de salud y especialidades asociadas.
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width={48} />
            <TableCell>Código</TableCell>
            <TableCell>Profesión</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Especialidades</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professions.map((p) => {
            const isExpanded = expanded === p.id;
            const profSpecialties = getSpecialtiesForProfession(p.id);
            return (
              <Fragment key={p.id}>
                <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => toggleExpand(p.id)}>
                  <TableCell>{isExpanded ? '▲' : '▼'}</TableCell>
                  <TableCell>{p.code}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={p.active ? 'Activa' : 'Inactiva'}
                      size="small"
                      color={p.active ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{profSpecialties.length} especialidades</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 0, borderBottom: 0 }}>
                    <Collapse in={isExpanded} unmountOnExit>
                      <Box sx={{ py: 2, pl: 4 }}>
                        {profSpecialties.length > 0 ? (
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Especialidad</TableCell>
                                <TableCell>Estado</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {profSpecialties.map((sp) => (
                                <TableRow key={sp.id}>
                                  <TableCell>{sp.code}</TableCell>
                                  <TableCell>{sp.name}</TableCell>
                                  <TableCell>
                                    <Chip
                                      label={sp.active ? 'Activa' : 'Inactiva'}
                                      size="small"
                                      variant="outlined"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Sin especialidades asociadas.
                          </Typography>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      {professions.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay profesiones registradas.
        </Typography>
      )}
    </Box>
  );
}
