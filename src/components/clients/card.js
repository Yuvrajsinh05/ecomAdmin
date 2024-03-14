import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function RecipeReviewCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#1d1d1f', color: 'white' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500]  ,backgroundColor:'#111113'}} aria-label="recipe">
            {(product?.model && product.model[0]) || (product?.name && product.name[0]) || ''}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant="subtitle1" sx={{ color: 'white' }}>{(product?.category && product.category)  || ''}</Typography>}
        subheader={<Typography variant="body2" sx={{ color: 'white' }}>{product?.type}</Typography>}
      />
      <CardMedia
        component="img"
        height="194"
        image={(product?.image && product?.image) || product?.imageUrl}
        alt={product?.category}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
        {(product?.model && product.model) || (product?.name && product.name) || ''}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{float:'right'}}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
