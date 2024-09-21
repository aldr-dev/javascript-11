import {Container} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';
import Register from './features/users/Register';
import Login from './features/users/Login';
import NavBar from './UI/NavBar/NavBar';
import ProductForm from './features/products/components/ProductForm';
import Products from './features/products/Products';

const App = () => {
  return (
    <>
      <NavBar/>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/add-new-product" element={<ProductForm/>}/>
          <Route path="/categories/:categoryId" element={<Products />} />
          <Route path="/" element={<Products/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;