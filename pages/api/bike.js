// pages/api/bike.js

import pool from '@/lib/db-config';
import { v4 as uuidv4 } from 'uuid';
import formidable from "formidable";
import jwt from 'jsonwebtoken';
import apiResponse from './common/api-response.js';
import path from 'path';
import { put } from "@vercel/blob";
import { readFileSync } from 'fs';

export const config = {
    api: {
        bodyParser: false, // Disable the default body parsing
    },
};

export default async function handler(req, res) {
    const client = await pool.connect();

    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.method === 'GET') {
            try {
                const { id } = req.query;
                let response;
                if (id) {
                    response = await client.query('SELECT * FROM tblbikes WHERE id = $1', [id]);
                } else {
                    response = await client.query('SELECT * FROM tblbikes');
                }
                if (response.rows.length < 1) return apiResponse(res, 204, null, null, "No record found!");
                return apiResponse(res, 200, "Bike data successfully fetched.", id ? response.rows[0] : response.rows);
            } catch (error) {
                console.error(error);
                return apiResponse(res, 500, "Something went wrong!", null, error);
            }
        }
        const token = req.headers.authorization;

        if (!token) return apiResponse(res, 401, null, null, "Unauthorized access.");

        jwt.verify(token, process.env.JWT_SECRET_TOKEN_KEY, (err) => {
            if (err) return apiResponse(res, 401, err.message, null, err.name);
        });

        if (req.method === 'POST') {           
            try {
                const formData = formidable({
                    uploadDir: '/tmp',
                    keepExtensions: true,
                    filename: (name, ext, part) => {
                        return Date.now() + ext;
                    }
                });
                let fields;
                let files;
                [fields, files] = await formData.parse(req);

                if(files?.image?.[0]?.mimetype.split("/")[0] !== "image") return apiResponse(res, 400, null, null, "Please upload only image file.");
                
                let imageUrl;
                if(files?.image?.[0]){
                    const filepath = files?.image?.[0]?.filepath
                    const { url } = await put(filepath, readFileSync(filepath), { access: 'public' });
                    imageUrl = url;
                }

                const body = {
                    description: fields?.description?.[0],
                    rating: fields?.rating?.[0],
                    price: fields?.price?.[0],
                    quantity: fields?.quantity?.[0],
                    type: fields?.type?.[0],
                    image: imageUrl
                }

                const nullKeys = Object.entries(body).filter(([key, value]) => value === null || value === undefined).map(([key]) => key);  //to check null values in body data
                if (nullKeys.length > 0) return apiResponse(res, 400, null, null, `${nullKeys[0]} is required.`);

                if (body.rating < 0 || body.rating > 5) return apiResponse(res, 400, null, null, "Rating should be between 1 to 5.");

                if (body.price < 1) return apiResponse(res, 400, null, null, "Price cannot less than 0.");

                const response = await client.query('INSERT INTO tblbikes(id, description, rating, price, quantity, type, image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [uuidv4(), body.description, body.rating, body.price, body.quantity, body.type, body.image]);
                if (response.rows.length < 1) return apiResponse(res, 204, null, null, "Data not saved!");

                return apiResponse(res, 201, "Bike added successfully.", response.rows[0]);
            } catch (error) {
                console.error(error);
                return apiResponse(res, 500, "Something went wrong!", null, error);
            }
        }

        if (req.method === 'PUT') {
            try {
                const formData = formidable({
                    uploadDir: '/tmp',
                    keepExtensions: true,
                    filename: (name, ext, part) => {
                        return Date.now() + ext;
                    }
                });
                let fields;
                let files;
                [fields, files] = await formData.parse(req);
                const getBikeById = await client.query('SELECT * FROM tblbikes WHERE id = $1', [fields?.id?.[0]]);
                let bikeData = getBikeById.rows[0];
                if (bikeData.length < 1) return apiResponse(res, 204, null, null, "No record found!");

                let imageUrl;
                if(files?.image?.[0]){
                    const filepath = files?.image?.[0]?.filepath
                    const { url } = await put(filepath, readFileSync(filepath), { access: 'public' });
                    imageUrl = url;
                }

                const body = {
                    id: fields?.id?.[0],
                    description: fields?.description?.[0] || bikeData.description,
                    rating: fields?.rating?.[0] || bikeData.rating,
                    price: fields?.price?.[0] || bikeData.price,
                    quantity: fields?.quantity?.[0] || bikeData.quantity,
                    type: fields?.type?.[0] || bikeData.type,
                    image: imageUrl || bikeData.image,
                }

                if (body.rating < 0 || body.rating > 5) return apiResponse(res, 400, null, null, "Rating should be between 1 to 5.");

                const response = await client.query('UPDATE tblbikes SET description = $1, rating = $2, price = $3, quantity = $4, type = $5  WHERE id = $6 RETURNING *', [body.description, body.rating, body.price, body.quantity, body.type, body.id]);
                return apiResponse(res, 200, "Bike data successfully updated.", response.rows[0]);
            } catch (error) {
                console.error(error);
                return apiResponse(res, 500, "Something went wrong!", null, error);
            }
        }

        if (req.method === 'DELETE') {
            try {
                const { id } = req.query;
                const response = await client.query('DELETE FROM tblbikes WHERE id = $1', [id]);
                if (response.rowCount < 1) return apiResponse(res, 204, null, null, "Bike data not deleted.");

                return apiResponse(res, 200, "Bike data successfully deleted.");
            } catch (error) {
                console.error(error);
                return apiResponse(res, 500, "Something went wrong!", null, error);
            }

        }

        res.setHeader('Allow', ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE']);
        return apiResponse(res, 405, null, null, `Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error.", null, error);
    } finally {
        client.release();
    }
}