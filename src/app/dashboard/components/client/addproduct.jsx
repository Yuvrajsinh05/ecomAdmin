"use client"

import { Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { AddCircleOutline, Close } from '@mui/icons-material';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import axios from 'axios';
import { useRouter } from 'next/navigation'


export const Addproduct = () => {
    const router = useRouter()

    async function createProduct() {
        const GPTcreateProfuct = await axios.get('http://localhost:3000/api/createproduct')
        console.log("GPTcreateProfuct", GPTcreateProfuct)
        if (GPTcreateProfuct.status == 200) {
            router.push('/products')
            router.refresh()
        }
    }

    return (
        <Box>
            <Typography variant="subtitle1" sx={{ color: '#fff' }}>New Products</Typography>
            <List>
                <ListItem>
                    <Button variant="outlined" onClick={createProduct} startIcon={<AddCircleOutline style={{ color: '#00e676' }} />} sx={{ color: '#00e676', borderColor: '#00e676', textTransform: 'none', width: '100%' }}>Add Product</Button>
                </ListItem>
                <ListItem>
                    <NewReleasesIcon style={{ color: '#ff3d00', marginRight: '1rem' }} />&nbsp;
                    <ListItemText primary="Pending Pre-Approval : 10" sx={{ color: '#fff' }} />
                </ListItem>
            </List>
        </Box>
    )
}