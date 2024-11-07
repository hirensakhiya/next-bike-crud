import { DataTypes } from 'sequelize';
import sequelize from '../lib/dbConfig';

const Bike = sequelize.define(
    'tblbikes',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        description: {
            type: DataTypes.TEXT
        },
        rating: {
            type: DataTypes.DECIMAL
        },
        price: {
            type: DataTypes.DECIMAL
        },
        quantity: {
            type: DataTypes.DECIMAL
        },
        type: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.TEXT
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Bike;