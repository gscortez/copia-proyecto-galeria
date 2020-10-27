import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import pingRouter from './routes/ping';
import itemsRouter from './routes/items';
import storesRouter from './routes/stores';
import { client as mongoClient } from './utils/mongo-utils'
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ping', pingRouter);
app.use('/items', itemsRouter);
app.use('/stores', storesRouter);

console.log(`Hello world`);
export default app;