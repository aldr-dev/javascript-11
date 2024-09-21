import express from 'express';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import usersRouter from './routers/users';
import productsRouter from './routers/products';
import categoriesRouter from './routers/categories';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);