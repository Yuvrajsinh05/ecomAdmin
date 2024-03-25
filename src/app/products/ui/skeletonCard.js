import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export default function RecipeReviewCardSkeleton() {
    return (
        <div style={{ width: '20%', padding: '10px' }}>
            <Card sx={{ maxWidth: 345, backgroundColor: '#1d1d1f', color: 'white' }}>
                <Skeleton variant="rectangular" width={345} height={194} />
                <CardContent>
                    <Skeleton variant="text" width={150} />
                    <Skeleton variant="text" width={250} />
                </CardContent>
                <CardActions disableSpacing sx={{ float: 'right' }}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}
