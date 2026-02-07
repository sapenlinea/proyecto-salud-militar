import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Attachment } from '../types.js';

interface AttachmentsViewerProps {
  attachments: Attachment[];
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-CO', { dateStyle: 'medium' });
  } catch {
    return iso;
  }
}

export default function AttachmentsViewer({ attachments }: AttachmentsViewerProps) {
  const [selected, setSelected] = useState<Attachment | null>(null);

  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, minHeight: 400 }}>
      <Paper variant="outlined" sx={{ flex: { md: '0 0 280px' }, overflow: 'auto', maxHeight: 400 }}>
        <Typography variant="subtitle2" sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
          Documentos y resultados
        </Typography>
        <List dense disablePadding>
          {attachments.map((a) => (
            <ListItemButton
              key={a.id}
              selected={selected?.id === a.id}
              onClick={() => setSelected(a)}
            >
              <ListItemText
                primary={a.name}
                secondary={a.description ?? formatDate(a.date)}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItemButton>
          ))}
        </List>
        {attachments.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            No hay adjuntos.
          </Typography>
        )}
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
          p: 2,
          bgcolor: 'grey.50',
        }}
      >
        {selected ? (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            {selected.type === 'pdf' && (
              <Box
                component="iframe"
                title={selected.name}
                src={selected.url}
                sx={{
                  width: '100%',
                  minHeight: 400,
                  border: 0,
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                }}
              />
            )}
            {selected.type === 'image' && (
              <Box
                component="img"
                src={selected.url}
                alt={selected.name}
                sx={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }}
              />
            )}
            {(selected.type === 'other' || selected.url === '#') && (
              <Typography variant="body2" color="text.secondary">
                Visor no disponible para este tipo de archivo.
                <br />
                {selected.description && `(${selected.description})`}
              </Typography>
            )}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Seleccione un documento de la lista para visualizarlo.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
