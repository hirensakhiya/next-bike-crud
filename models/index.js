import sequelize from '@/lib/dbConfig';
import Auth from './authmodel';
import Bike from './bikeModel';

const db = {};

db.sequelize = sequelize;
db.Auth = Auth;
db.Bike = Bike

export default db;
