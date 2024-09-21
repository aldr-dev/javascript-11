import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import InfoIcon from '@mui/icons-material/Info';
import {fetchProducts, filterByCategory} from './productsThunks';
import {
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import {selectCategoriesData, selectGetCategoryLoading} from '../categories/categoriesSlice';
import {getCategoriesData} from '../categories/categoriesThunks';
// import {selectGetLoading} from './productsSlice';

const Products = () => {
  const dispatch = useAppDispatch();
  const {categoryId} = useParams();
  const categoryLoading = useAppSelector(selectGetCategoryLoading);
  // const productLoading = useAppSelector(selectGetLoading);
  const categories = useAppSelector(selectCategoriesData);

  useEffect(() => {
    const fetchCategoriesAndProductsData = async () => {
      try {
        await dispatch(getCategoriesData()).unwrap();
        await dispatch(fetchProducts()).unwrap();
      } catch (error) {
        toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
        console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
      }
    };

    void fetchCategoriesAndProductsData();
  }, [dispatch]);


  useEffect(() => {
    if (categoryId) {
      dispatch(filterByCategory(categoryId));
    }
  }, [dispatch, categoryId]);


  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item sx={{mb: 2}}>
              <Typography variant="h6">Категории</Typography>
            </Grid>
            {categoryLoading ? (<CircularProgress sx={{color: '#1976d2'}}/>) : (
              <Grid item>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to="/" selected={!categoryId}>
                      <ListItemText onClick={() => dispatch(fetchProducts())} primary="Все товары"/>
                    </ListItemButton>
                  </ListItem>
                  {categories.length === 0 ? (
                    <Typography sx={{display: 'flex', alignItems: 'center'}} variant="body2" color="#000"><InfoIcon />&nbsp;Список категорий пуст.</Typography>
                  ) : (
                    <>
                      {categories.map((category) => (
                        <ListItem key={category._id} disablePadding>
                          <ListItemButton
                            component={Link}
                            to={`/categories/${category._id}`}
                            selected={category._id === categoryId}>
                            <ListItemText primary={category.title}/>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </>
                  )}
                </List>
              </Grid>)}
          </Grid>
        </Grid>
        <Grid item xs={9}>
          2
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products;