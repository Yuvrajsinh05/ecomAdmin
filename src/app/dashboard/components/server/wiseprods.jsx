
import { Typography, List, ListItem, ListItemText, Box, Skeleton } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DevicesIcon from '@mui/icons-material/Devices';
import { ProdCountWrtCate } from '../../operations/operation';
import { getStateCalls } from '../../operations/reqCall';
import { WiseProdSkeleton } from '../../Loaders/wiseProdsSkeleton';




export const WiseProducts = async () => {
    const stateData = await getStateCalls()
    if (!stateData) return <WiseProdSkeleton />
    return (
        <>
            <Box sx={{ borderRight: '1px solid #555', paddingRight: '20px' }}>
                <Typography variant="subtitle1" sx={{ color: '#fff' }}>Category-wise Products</Typography>
                <List>
                    <ListItem>
                        <DiamondIcon style={{ color: '#ffcc33', marginRight: '1rem' }} />
                        <ListItemText primary={`Fashion : ${ProdCountWrtCate(stateData, "Fashion")}`} sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem>
                        <AddReactionIcon style={{ color: '#ffcc33', marginRight: '1rem' }} />
                        <ListItemText primary={`Beauty : ${ProdCountWrtCate(stateData, "Beauty")} `} sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem>
                        <DevicesIcon style={{ color: '#ffcc33', marginRight: '1rem' }} />
                        <ListItemText primary={`Electronics : ${ProdCountWrtCate(stateData, "Electronics")} `} sx={{ color: '#fff' }} />
                    </ListItem>
                </List>
            </Box>
        </>
    )
}