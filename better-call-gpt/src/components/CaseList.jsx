import * as React from 'react';
import { useEffect, useState } from 'react';
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
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


export function CaseList(props) {
    const [caseItems, setCaseItems] = useState([]);
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        let tempCaseItems = [];
        if (Array.isArray(props.cases)) {
            props.cases.forEach((caseItem, caseIdx) => {
                tempCaseItems.push(
                    <>
                        <ListItem disablePadding>
                            <ListItemButton >
                                <ListItemIcon >
                                    {caseItem % 2 === 0 ? <DescriptionIcon className='text-yellow-400' /> : <PictureAsPdfIcon className='text-yellow-400' />}
                                </ListItemIcon>
                                <ListItemText className='text-yellow-400' >Case File {caseIdx}</ListItemText>
                            </ListItemButton>
                        </ListItem >
                        <Divider />
                    </>
                )
            })
        }
        setCaseItems(tempCaseItems);
    }, [props.cases])

    return (
        <Paper className='scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-zinc-800' sx={{ width: "100%", height: "100%", maxHeight: "80vh", overflow: 'auto' }}>
            <List className='bg-zinc-800'>
                {caseItems}

                {/* TODO: use below when files are mapped to a case
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                </ListItemButton>
                </List>
            </Collapse> */}
            </List>
        </Paper>


    );
}