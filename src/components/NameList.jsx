import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NameList({ items, onEdit, onDelete }) {
    return (
        <Box sx={{ maxWidth: '400px', margin: 'auto', p: 3, direction: 'rtl' }}>
            <List>
                {items.map((item) => (
                    <ListItem
                        key={item._id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #e0e0e0',
                            padding: '10px 0',
                        }}
                    >
                        <ListItemText primary={item.name} sx={{ textAlign: 'right', fontWeight: 'bold' }} />
                        <Box>
                            <IconButton
                                color="primary"
                                onClick={() => onEdit(item._id)}
                                sx={{ marginLeft: 1 }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => onDelete(item._id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
