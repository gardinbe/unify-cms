import { createRouter, createWebHistory } from 'vue-router';
import { lazy } from '~/lib/utils';

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'not-found',
			path: '/:pathMatch(.*)*',
			component: lazy(import('~/pages/NotFound/NotFound.vue'))
		},
		{
			name: 'error',
			path: '/error',
			component: lazy(import('~/pages/Error/Error.vue'))
		},
		{
			name: 'home',
			path: '/',
			component: lazy(import('~/pages/Home/Home.vue'))
		},
		{
			name: 'contents',
			path: '/content',
			component: lazy(import('~/pages/Content/Content.vue')),
			children: [
				{
					name: 'single-contents',
					path: 'singles',
					component: lazy(import('~/pages/Content/Singles/Singles.vue')),
					children: [
						{
							name: 'single-content',
							path: ':name',
							component: lazy(import('~/pages/Content/Singles/Single/Single.vue'))
						}
					]
				},
				{
					name: 'collection-contents',
					path: 'collections',
					component: lazy(import('~/pages/Content/Collections/Collections.vue')),
					children: [
						{
							name: 'collection-content',
							path: ':name',
							component: lazy(import('~/pages/Content/Collections/Collection/Collection.vue')),
							children: [
								{
									name: 'create-collection-item',
									path: 'create',
									component: lazy(import('~/pages/Content/Collections/Collection/Create/Create.vue'))
								},
								{
									name: 'collection-item',
									path: ':id',
									component: lazy(import('~/pages/Content/Collections/Collection/Item/Item.vue'))
								}
							]
						}
					]
				}
			]
		},
		{
			name: 'schemas',
			path: '/schemas',
			component: lazy(import('~/pages/Schemas/Schemas.vue')),
			children: [
				{
					name: 'single-schemas',
					path: 'singles',
					component: lazy(import('~/pages/Schemas/Singles/Singles.vue')),
					children: [
						{
							name: 'create-single-schema',
							path: 'create',
							component: lazy(import('~/pages/Schemas/Singles/Create/Create.vue'))
						},
						{
							name: 'single-schema',
							path: ':name',
							component: lazy(import('~/pages/Schemas/Singles/Single/Single.vue'))
						}
					]
				},
				{
					name: 'collection-schemas',
					path: 'collections',
					component: lazy(import('~/pages/Schemas/Collections/Collections.vue')),
					children: [
						{
							name: 'create-collection-schema',
							path: 'create',
							component: lazy(import('~/pages/Schemas/Collections/Create/Create.vue'))
						},
						{
							name: 'collection-schema',
							path: ':name',
							component: lazy(import('~/pages/Schemas/Collections/Collection/Collection.vue'))
						}
					]
				}
			]
		}
	]
});
