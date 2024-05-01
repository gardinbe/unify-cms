import { createServer } from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { json, urlencoded, static as staticFiles } from 'express';
import cors from 'cors';
import config from '~/config';
import { data } from '~/databases';
import { router } from '~/routes/router';
import { initSchemaDirs, initDatabase, initLogsDir, log } from '~/lib/utils';
import 'colors';

// init directories

await initLogsDir();

void log('Starting Unify CMS'.blue + '\n');

void log('Checking schema directories'.gray);

await initSchemaDirs();

// init database

await initDatabase(data);

//create app, init middlewares

void log('Creating application'.gray);

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

app.use(staticFiles(config.UI_ASSETS_PATH, { index: false }));

app.use(cookieParser(config.COOKIE_SECRET ?? undefined));

app.use(router);

// create http server

void log('Creating server'.gray);

const server = createServer(app);

server.listen(config.PORT, () => {
	void log('\n' + 'Unify CMS running: '.green + `http://localhost:${config.PORT}`.yellow.underline + '\n');
});
