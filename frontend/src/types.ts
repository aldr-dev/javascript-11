export interface User {
  _id: string;
  username: string;
  displayName: string;
  phone: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phone: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ProductMutation {
  category: string;
  title: string;
  description: string;
  price: string;
  image: File | null;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
}

export interface ProductInfo {
  _id: string;
  user: {
    _id: string;
    displayName: string;
    phone: string;
  };
  category: {
    _id: string;
    title: string;
  };
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}