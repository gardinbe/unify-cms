export interface ApiSuccess {
	success: string;
}

export interface ApiError {
	error: string;
}

export interface CreatedSchema extends ApiSuccess {
	created_schema_name: string;
}

export interface CreatedItem extends ApiSuccess {
	created_item_id: number;
}
