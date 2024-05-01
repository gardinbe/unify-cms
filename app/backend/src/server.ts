import { createServer } from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { json, urlencoded, static as staticFiles } from 'express';
import cors from 'cors';
import config from '~/config';
import { data } from '~/databases';
import { router } from '~/routes/router';
import { initDatabase } from '~/lib/utils/init-database';
import 'colors';

//create app, init middlewares

const app = express();

app.use(cors({
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: 204
}));

app.use(json());

app.use(urlencoded({ extended: true }));

app.use(compression());

app.use(staticFiles(`${config.ROOT_DIR}/app/public`, { index: false }));

app.use(staticFiles(`${config.ROOT_DIR}/app/frontend/dist`, { index: false }));

app.use(cookieParser(config.COOKIE_SECRET ?? undefined));

app.use(router);

// init databases

console.log('Initializing database...\n'.gray);

await initDatabase(data);

// create http server

const server = createServer(app);

server.listen(config.PORT, () => {
	console.log('App running at ' + `http://localhost:${config.PORT}\n`.cyan.underline);
});
