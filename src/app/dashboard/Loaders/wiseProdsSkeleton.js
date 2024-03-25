
import { Typography, List, ListItem, ListItemText, Box ,Skeleton } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DevicesIcon from '@mui/icons-material/Devices';





export const WiseProdSkeleton = () => {
    return (
        <>
            <Box sx={{ borderRight: '1px solid #555', paddingRight: '20px' }}>
                <Typography variant="subtitle1" sx={{ color: '#fff' }}>Category-wise Products</Typography>
                <List>
                    <ListItem>
                        <DiamondIcon style={{ color: '#ffcc33', marginRight: '1rem' }} />
                        <ListItemText primary={<Skeleton width={100} variant="text" />} sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem>
                        <AddReactionIcon style={{ color: '#ffcc33', marginRight: '1rem' }} />
                        <ListItemText primary={<Skeleton width={100} variant="text" />} sx={{ color: '#fff' }} />
                    </ListItem>
                    <ListItem>
                        <DevicesIcon style={{ color: '#ffcc33', marginRight: '1rem' }} />
                        <ListItemText primary={<Skeleton width={100} variant="text" />} sx={{ color: '#fff' }} />
                    </ListItem>
                </List>
            </Box>
        </>
    )
}