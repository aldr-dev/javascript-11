import {Product} from '../../../types';
import React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {API_URL} from '../../../config';
import {Link} from 'react-router-dom';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({product}) => {
  return (
    <Card component={Link} to={`/product-details/${product._id}`} sx={{ width: 264, cursor: 'pointer', textDecoration: 'none' }}>
      <CardMedia
        sx={{ height: 200,  objectFit: 'cover' }}
        image={`${API_URL}/${product.image}`}
        title="img"/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Цена: {product.price} KGS
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;