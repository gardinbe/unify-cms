import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { data } from '~/databases';

export class Single extends Model<
	InferAttributes<Single>,
	InferCreationAttributes<Single>
> {
	declare id: CreationOptional<number>;
	declare schema: string;
	declare properties: string;
}

Single.init({
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
	tableName: 'singles'
});
