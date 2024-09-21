import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Product from './models/Product';
import Category from './models/Category';


const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [user1, user2, user3, user4] = await User.create(
    {
      username: 'user1',
      password: 'WGZYV',
      displayName: 'Илья',
      phone: '+996 550 123 456',
      token: crypto.randomUUID(),
    },
    {
      username: 'user2',
      password: '12%WGZYV',
      displayName: 'Саша',
      phone: '+996 551 987 654',
      token: crypto.randomUUID(),
    },
    {
      username: 'user3',
      password: '1xx2%WGZYV',
      displayName: 'Ольга',
      phone: '+996 552 234 567',
      token: crypto.randomUUID(),
    },
    {
      username: 'user4',
      password: 'WqxxYV',
      displayName: 'Олег',
      phone: '+996 553 876 543',
      token: crypto.randomUUID(),
    },
  );

  const [bicycle, flower, clothes, cars] = await Category.create(
    {
      title: 'Велосипеды',
    },
    {
      title: 'Цветы',
    },
    {
      title: 'Одежда',
    },
    {
      title: 'Машины',
    },
  );

  await Product.create(
    {
      user: user1,
      category: bicycle,
      title: 'Велосипед Cube Analog 2020 года',
      description: 'Продаю велосипед Cube Analog 2020 года в отличном состоянии! Этот модель идеально подходит как для городских поездок, так и для приключений на природе.',
      price: 48000,
      image: 'fixtures/cube.jpeg',
    },
    {
      user: user2,
      category: bicycle,
      title: 'Велосипед Cube Acid 2020 года',
      description: 'Продаю велосипед Cube Acid 2020 года в отличном состоянии! Этот горный велосипед идеально подходит для любителей активного отдыха и приключений на природе.',
      price: 29900,
      image: 'fixtures/acid.jpeg',
    },
    {
      user: user1,
      category: cars,
      title: 'Mercedes-Benz 230: 1992 г., 2.3, Механика, Бензин, Седан',
      description: 'Mercedes Benz W124 2.3 обьем. 1992год. полный электропакет подогрев сидения люк чистый салон сел поехал все работает в хорошем состоянии для своего года машина.',
      price: 320000,
      image: 'fixtures/mers.webp',
    },
    {
      user: user2,
      category: cars,
      title: 'Subaru Legacy: 2020 г., 2.5, Вариатор, Бензин, Седан',
      description: 'Продам Subaru LEGACY. Свежепригнан ,растаможен,не оформлен.',
      price: 1780000,
      image: 'fixtures/subaru.webp',
    },
    {
      user: user3,
      category: clothes,
      title: 'Пальто, Классика, Осень-весна, По колено, L (EU 40)',
      description: 'Пальто от Zara, шикарный жёлтый цвет состояние нового одевала очень редко, из качественной шерсти, пальто из ручной работы, продою потому что весит без дела, разгружаю гардероб, размер L ка срочная цена, покупала за 170$',
      price: 1780000,
      image: 'fixtures/clothes.webp',
    },
    {
      user: user3,
      category: flower,
      title: 'Розы «Классическая Любовь»',
      description: 'Продаю свежие розы «Классическая Любовь» — символ нежности и страсти. Эти розы с насыщенными лепестками идеально подходят для романтических моментов и особых случаев. Каждая роза аккуратно упакована, чтобы сохранить свежесть и аромат. Порадуйте своих близких или добавьте яркость в свой дом!',
      price: 1780,
      image: 'fixtures/rose.jpg',
    },
    {
      user: user4,
      category: clothes,
      title: 'Пуховик, Короткая модель, Оверсайз, M (EU 38)',
      description: 'Zara куртка рубашка, водонепроницаемая,новая,размер: М, цена окончательная',
      price: 1780000,
      image: 'fixtures/mont.webp',
    },
    {
      user: user4,
      category: flower,
      title: 'Тюльпаны «Весенний Ветер»',
      description: 'Предлагаю тюльпаны «Весенний Ветер» — яркий акцент для любого интерьера. Эти цветы с нежными лепестками и разнообразной палитрой цветов добавят весеннего настроения в ваш дом. Тюльпаны подходят для подарка или украшения праздничного стола. Свежие и ароматные, они обязательно вызовут улыбку!',
      price: 2000,
      image: 'fixtures/tulip.jpeg',
    },
  );
  await db.close();
};

run().catch(console.error);