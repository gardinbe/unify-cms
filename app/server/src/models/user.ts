import { compare, genSalt, hash } from 'bcrypt';
import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { DataTypes, Model } from 'sequelize';

import { data } from '~/databases';

export enum UserType {
	DEFAULT = 0,
	ADMIN = 1
}

export class User extends Model<
	InferAttributes<User>,
	InferCreationAttributes<User>
> {
	declare id: CreationOptional<number>;
	declare type: UserType;
	declare username: string;
	declare email: string;
	declare password: string;
	declare firstName: string;
	declare lastName: string;

	/**
	 * Checks if the given password is valid.
	 * @param password - Password to check
	 * @returns Password validity
	 */
	async validPassword(password: string): Promise<boolean> {
		return await compare(password, this.password);
	}
}

User.afterCreate(async (user) => {
	user.password = await hash(user.password, await genSalt(10));
});

User.afterUpdate(async (user) => {
	if (!user.changed('password'))
		return;

	user.password = await hash(user.password, await genSalt(10));
});

User.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	type: {
		type: DataTypes.TINYINT
	},
	username: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING
	},
	firstName: {
		type: DataTypes.STRING
	},
	lastName: {
		type: DataTypes.STRING
	},
	password: {
		type: DataTypes.STRING
	}
}, {
	sequelize: data,
	tableName: 'users'
});
