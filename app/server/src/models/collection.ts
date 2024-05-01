import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { data } from '~/databases';

export class Collection extends Model<
	InferAttributes<Collection>,
	InferCreationAttributes<Collection>
> {
	declare id: CreationOptional<number>;
	declare schema: string;
	declare properties: string;
}

Collection.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	schema: {
		type: DataTypes.STRING
	},
	properties: {
		type: DataTypes.TEXT
	}
}, {
	sequelize: data,
	tableName: 'collections'
});
