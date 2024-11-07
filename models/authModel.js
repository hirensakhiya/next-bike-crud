import { DataTypes } from 'sequelize';
import sequelize from '../lib/dbConfig';

const Auth = sequelize.define(
    'tblauth',
    {
        username: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        password: {
            type: DataTypes.TEXT
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Auth;