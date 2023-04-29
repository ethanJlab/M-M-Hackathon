import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface CaseListProps {
    cases : any[];
}

export function CaseList( { cases } : CaseListProps) {

  let caseItems = cases.map((caseItem) =>
    <>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
            </ListItemButton>
        </ListItem>
        <Divider/>
    </>

    
    );

  return (
    <Paper sx={{ width: 320, maxWidth: '100%', height:"100%", overflow: 'auto'}}>
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PictureAsPdfIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItemButton>
            </ListItem>
            <Divider />

            {caseItems}
        </List>
    </Paper>
  );
}