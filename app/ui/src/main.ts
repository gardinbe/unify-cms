import '~/lib/scss/main.scss';

import * as fontawesome from '@fortawesome/fontawesome-svg-core';
import { faDeleteLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { createApp } from 'vue';
import { createHead } from '@unhead/vue';
import router from '~/router';
import App from '~/App.vue';
import { errorHandler } from '~/lib/utils';

// register libraries

fontawesome.library.add(
	faPlus,
	faDeleteLeft
);

// create app

//TODO: FIX THIS
const app = createApp(App as object);

const head = createHead();

app.use(head);

app.use(router);

app.config.errorHandler = errorHandler(router);

// mount to dom

app.mount(document.body);
