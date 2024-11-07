// pages/api/auth.js

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import apiResponse from './common/api-response.js';
import Auth from '@/models/authModel.js';

export default async function handler(req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.method === 'POST') {
            try {
                const { email, password } = req.body;
                let response = await Auth.findOne({
                    where: {
                        username: email
                    }
                })
                response = response.dataValues;
                if (!response) return apiResponse(res, 204, null, null, "Account not found!");

                const dPassword = bcrypt.compareSync(password, response.password);
                if (!dPassword) return apiResponse(res, 400, null, null, "Incorrect password!");

                const token = jwt.sign({ email }, process.env.JWT_SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRE_TIME });
                return apiResponse(res, 200, "Login successful.", { email, token });
            } catch (error) {
                console.error(error);
                return apiResponse(res, 500, "Something went wrong!", null, error);
            }
        }

        res.setHeader('Allow', ['POST']);
        return apiResponse(res, 405, null, null, `Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error.", null, error);
    }
}