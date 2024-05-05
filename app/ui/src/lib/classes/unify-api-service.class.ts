import { ApiService } from '~/lib/classes/api-service.class';
import { badRequest, internalError, notFound, serverError } from '~/lib/utils';
import type { ApiError, ApiSuccess, CollectionSchema, CreatedItem, CreatedSchema, Item, ItemProperties, Schema, SingleSchema } from '~shared/types';

export class UnifyApiService extends ApiService {
	async getAllSingleSchemas() {
		return this.unwrap(
			await this.get<SingleSchema[] | ApiError>('schemas/singles')
		);
	}

	async getSingleSchema(name: string) {
		return this.unwrap(
			await this.get<SingleSchema | ApiError>(`schemas/singles/${name}`)
		);
	}

	async addSingleSchema(schema: Schema) {
		return this.unwrap(
			await this.postJson<CreatedSchema | ApiError>('schemas/singles', schema)
		);
	}

	async updateSingleSchema(name: string, schema: Schema) {
		return this.unwrap(
			await this.patchJson<ApiSuccess | ApiError>(`schemas/singles/${name}`, schema)
		);
	}

	async deleteSingleSchema(name: string) {
		return this.unwrap(
			await this.delete<ApiSuccess | ApiError>(`schemas/singles/${name}`)
		);
	}

	async getAllCollectionSchemas() {
		return this.unwrap(
			await this.get<CollectionSchema[] | ApiError>('schemas/collections')
		);
	}

	async getCollectionSchema(name: string) {
		return this.unwrap(
			await this.get<CollectionSchema | ApiError>(`schemas/collections/${name}`)
		);
	}

	async addCollectionSchema(schema: Schema) {
		return this.unwrap(
			await this.postJson<CreatedSchema | ApiError>('schemas/collections', schema)
		);
	}

	async updateCollectionSchema(name: string, schema: Schema) {
		return this.unwrap(
			await this.patchJson<ApiSuccess | ApiError>(`schemas/collections/${name}`, schema)
		);
	}

	async deleteCollectionSchema(name: string) {
		return this.unwrap(
			await this.delete<ApiSuccess | ApiError>(`schemas/collections/${name}`)
		);
	}

	async getSingles(schema: string) {
		return this.unwrap(
			await this.get<Item[] | ApiError>(`content/singles/${schema}`)
		);
	}

	async getSingle(schema: string) {
		const item = this.unwrap(
			await this.get<Item | ApiError>(`content/singles/${schema}`),
			[404]
		);

		// TODO: perhaps not ideal, wrap in success response object maybe?
		// if 404, return null
		return !('error' in item)
			? item
			: null;
	}

	async setSingle(schema: string, properties: ItemProperties) {
		return this.unwrap(
			await this.postJson<ApiSuccess | ApiError>(`content/singles/${schema}`, properties)
		);
	}

	async updateSingle(schema: string, properties: ItemProperties) {
		return this.unwrap(
			await this.patchJson<ApiSuccess | ApiError>(`content/singles/${schema}`, properties)
		);
	}

	async getCollectionItems(schema: string) {
		return this.unwrap(
			await this.get<Item[] | ApiError>(`content/collections/${schema}`)
		);
	}

	async getCollectionItem(schema: string, id: number) {
		return this.unwrap(
			await this.get<Item | ApiError>(`content/collections/${schema}/${id}`)
		);
	}

	async addCollectionItem(schema: string, properties: ItemProperties) {
		return this.unwrap(
			await this.postJson<CreatedItem | ApiError>(`content/collections/${schema}`, properties)
		);
	}

	async updateCollectionItem(schema: string, id: number, properties: ItemProperties) {
		return this.unwrap(
			await this.patchJson<ApiSuccess | ApiError>(`content/collections/${schema}/${id}`, properties)
		);
	}

	async deleteCollectionItem(schema: string, id: number) {
		return this.unwrap(
			await this.delete<ApiSuccess | ApiError>(`content/collections/${schema}/${id}`)
		);
	}

	private unwrap<TData extends object>(
		[data, response]: [TData | ApiError, Response]
	): TData;

	private unwrap<TData extends object>(
		[data, response]: [TData | ApiError, Response],
		ignoredErrorCodes: number[]
	): TData | ApiError;

	private unwrap<TData extends object>(
		[data, response]: [TData | ApiError, Response],
		ignoredErrorCodes?: number[]
	) {
		if (!('error' in data) || ignoredErrorCodes?.includes(response.status))
			return data;

		if (response.status === 400)
			throw badRequest(data.error);
		else if (response.status === 404)
			throw notFound();
		else if (response.status.toString().startsWith('5'))
			throw serverError();
		else
			throw internalError();
	}
}
