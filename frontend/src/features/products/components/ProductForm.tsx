import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {Navigate, useNavigate} from 'react-router-dom';
import {selectUser} from '../../users/usersSlice';
import {selectCreateError, selectSendLoading} from '../productsSlice';
import {ProductMutation} from '../../../types';
import SendIcon from '@mui/icons-material/Send';
import {toast} from 'react-toastify';
import {sendProductData} from '../productsThunks';
import {Box, Grid, MenuItem, TextField, Typography} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import {getCategoriesData} from '../../categories/categoriesThunks';
import {selectCategoriesData} from '../../categories/categoriesSlice';

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategoriesData);
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectCreateError);
  const loading = useAppSelector(selectSendLoading);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(getCategoriesData()).unwrap();
      } catch (error) {
        toast.error('Произошла ошибка при получении категорий, попробуйте позже.');
        console.error('Произошла ошибка при получении категорий, попробуйте позже. ' + error);
      }
    };

    void fetchCategories();
  }, [dispatch]);

  const [resetFileName, setResetFileName] = useState(false);
  const [state, setState] = useState<ProductMutation>({
    title: '',
    description: '',
    price: '',
    image: null,
    category: '',
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const handleResetFileName = (status: boolean) => {
    setResetFileName(status);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (user) {
        if (state.category.trim().length !== 0 &&
          state.title.trim().length !== 0 &&
          state.description.trim().length !== 0 &&
          state.price.trim().length !== 0 &&
          state.image instanceof File
        ) {
          await dispatch(sendProductData(state)).unwrap();
          setResetFileName(true);
          toast.success('Продукт был успешно опубликован.');
          navigate('/');
        }
        setState({
          title: '',
          description: '',
          price: '',
          image: null,
          category: '',
        });
      }
    } catch (error) {
      console.error('Произошла ошибка при попытке создания записи. Пожалуйста, попробуйте позже. ' + error);
    }
  };

  return (
    <>
      {user ? null : (<Navigate to="/"/>)}
      <Box component="form" onSubmit={submitFormHandler}>
        <Typography variant={'h4'} sx={{mb: 2}}>Опубликовать новый продукт</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Заголовок"
              id="title"
              name="title"
              required
              value={state.title}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Описание"
              required
              id="description"
              name="description"
              value={state.description}
              multiline
              rows={4}
              error={Boolean(getFieldError('description'))}
              helperText={getFieldError('description')}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Цена"
              required
              type="number"
              id="price"
              inputProps={{ min: 0 }}
              name="price"
              value={state.price}
              error={Boolean(getFieldError('price'))}
              helperText={getFieldError('price')}/>
          </Grid>
          <Grid item>
            <FileInput
              onChange={onChangeFileInput}
              label="Изображение"
              name="image"
              resetFileName={resetFileName}
              handleResetFileName={handleResetFileName}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              required
              id="category"
              label="Выберите категорию"
              value={state.category}
              onChange={inputChangeHandler}
              name='category'
              error={Boolean(getFieldError('category'))}
              helperText={getFieldError('category')}>
              <MenuItem value="" disabled>
               Пожалуйста выберите категорию
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <LoadingButton
          sx={{
            mt: 2,
          }}
          disabled={
            state.category.trim().length === 0 ||
            state.title.trim().length === 0 ||
            state.description.trim().length === 0 ||
            state.price.trim().length === 0 ||
            !(state.image instanceof File)
        }
          color="primary"
          type="submit"
          loading={loading}
          loadingPosition="start"
          startIcon={<SendIcon/>}
          variant="contained">
          <span>Отправить</span>
        </LoadingButton>
      </Box>
    </>
  );
};

export default ProductForm;