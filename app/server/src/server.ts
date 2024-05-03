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

log('Starting Unify CMS'.blue + '\n');

log('Checking schema directories'.gray);

await initSchemaDirs();

// init database

await initDatabase(data);

//create app, init middlewares

log('Creating application'.gray);

const app = express();

app.use(cors());

app.use(json());

app.use(urlencoded({ extended: true }));

app.use(compression());

app.use(staticFiles(config.UI_ASSETS_PATH, { index: false }));

app.use(cookieParser(config.COOKIE_SECRET ?? undefined));

app.use(router);

// create http server

log('Creating server'.gray);

const server = createServer(app);

server.listen(config.PORT, () => {
	log('\n' + 'Unify CMS running: '.green + `http://localhost:${config.PORT}`.yellow.underline + '\n');
});
