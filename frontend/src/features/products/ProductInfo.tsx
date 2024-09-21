import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {deleteProduct, fetchOneProduct} from './productsThunks';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {filterDeleteProduct, selectDeleteLoading, selectProductInfo} from './productsSlice';
import {
  Box,
  CardMedia,
  Container,
  Grid, Typography,
} from '@mui/material';
import {API_URL} from '../../config';
import {selectUser} from '../users/usersSlice';
import {LoadingButton} from '@mui/lab';

const ProductInfo = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const oneProduct = useAppSelector(selectProductInfo);
  const deleteLoading = useAppSelector(selectDeleteLoading);

  useEffect(() => {
    const fetchOneProductData = async () => {
      if (id) {
        try {
          await dispatch(fetchOneProduct(id)).unwrap();
        } catch (error) {
          toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
          console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
        }
      }
    };

    void fetchOneProductData();
  }, [dispatch, id]);

  const oneDeleteProduct =  async () => {
    const confirmDelete = confirm('Вы действительно уверены, что хотите снять данное объявление с публикации?');
    if (confirmDelete && oneProduct && user) {
     await dispatch(deleteProduct(oneProduct._id));
     dispatch(filterDeleteProduct(oneProduct._id));
      navigate('/');
    }
  };

  return (
    <>
      {oneProduct && (
        <Container>
          <Grid container spacing={4} sx={{alignItems: 'center'}}>
            <Grid item xs={6}>
              <CardMedia
                sx={{ height: 400,  objectFit: 'cover', borderRadius: '12px' }}
                image={`${API_URL}/${oneProduct.image}`}
                title="img"/>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{
                color: '#fff',
                background: '#FF7F50',
                width: '130px',
                textAlign: 'center',
                borderRadius: '15px',
                mb: 4,
                py: '3px'}}>
                {oneProduct.category.title}
              </Typography>

              <Typography sx={{mb: 5}} variant="h4">{oneProduct.title}</Typography>
              <Typography sx={{fontWeight: 'bold', mb: 2}} variant="body1">Описание</Typography>
              <Typography variant="body2" sx={{pb: 3, mb: 4 ,borderBottom: '1px solid #E0E0E0'}}>{oneProduct.description}</Typography>
              <Typography sx={{mb: 2, display: 'flex', alignItems: 'center'}} variant="body1"><LocalOfferIcon/>&nbsp;Цена: {oneProduct.price} KGS</Typography>
              <Typography sx={{mb: '8px', display: 'flex', alignItems: 'center'}} variant="body1"><AccountCircleIcon/>&nbsp;Автор объявления: {oneProduct.user.displayName}</Typography>
              <Typography sx={{mb: '8px', display: 'flex', alignItems: 'center'}} variant="body1"><LocalPhoneIcon/>&nbsp;Контактный телефон: {oneProduct.user.phone}</Typography>
              <Box>
                {oneProduct.user._id === user?._id && (
                  <LoadingButton
                    variant="contained"
                    color="error"
                    onClick={oneDeleteProduct}
                    loading={deleteLoading}
                    disabled={deleteLoading}
                    disableElevation>
                    Продано
                  </LoadingButton>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProductInfo;