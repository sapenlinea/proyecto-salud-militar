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
import type { Role, Permission } from '../types';

interface RolesPermissionsProps {
  roles: Role[];
  permissions: Permission[];
}

export default function RolesPermissions({ roles, permissions }: RolesPermissionsProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleExpand(id: string) {
    setExpanded((p) => (p === id ? null : id));
  }

  function getPermissionLabel(code: string) {
    return permissions.find((p) => p.code === code)?.name ?? code;
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Seleccione un rol para ver sus permisos asignados.
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width={48} />
            <TableCell>Rol</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Cantidad permisos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((r) => {
            const isExpanded = expanded === r.id;
            const perms = r.permissions.includes('*')
              ? ['Acceso total (*)']
              : r.permissions.map((p) => getPermissionLabel(p));
            return (
              <Fragment key={r.id}>
                <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => toggleExpand(r.id)}>
                  <TableCell>{isExpanded ? '▲' : '▼'}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.description}</TableCell>
                  <TableCell>
                    {r.permissions.includes('*') ? 'Todos' : r.permissions.length}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} sx={{ py: 0, borderBottom: 0 }}>
                    <Collapse in={isExpanded} unmountOnExit>
                      <Box sx={{ py: 2, pl: 4 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                          Permisos:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {perms.map((p) => (
                            <Chip key={p} label={p} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
        Catálogo de permisos
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Módulo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.code}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.module}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
