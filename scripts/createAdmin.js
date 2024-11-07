const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const sequelize = require('../lib/dbConfig');
const { DataTypes } = require('sequelize');

async function createAdmin(username, password) {
    try{
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
        await sequelize.sync();
    
        const existingUser = await Auth.findOne({ where: { username } });
        if (existingUser) {
            throw Error('Username already exists');
        }
    
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create the admin in the 'tblauth' table
        const admin = await Auth.create({
            username,
            password: hashedPassword,
        });

        console.log(`\n\n===================\nAdmin user created: ${admin.username}\n===================\n\n`);
    } catch(error){
        console.error(`\n\nError during admin creation: ${error}\n\n`);
    } finally{
        await sequelize.sync()
        await sequelize.close()
    }
    return;
}

if (process.argv.length < 4) {
    console.log('Usage: pnpm create-admin <username> <password>');
    process.exit(1);
}

// Retrieve the username and password from command-line arguments
const [, , username, password] = process.argv;

// Call the function to create the admin user
createAdmin(username, password)