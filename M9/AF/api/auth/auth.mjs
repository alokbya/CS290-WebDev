import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import * as blackList from '../models/blacklist_model.mjs';

dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({Error: 'A token is required for authentication'});
    }

    

    try {
        // Parse token from db to check if blacklisted
        const matchingToken = await blackList.getToken({ token });
        if (matchingToken.length > 0) {
            return res.status(403).json({Error: 'A token is required for authentication'}); 
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (error) {
        console.error(error);
        res.status(500).json({Error: `${error}`});
    }
}

const destroyToken = (token) => {
    blackList.addToken(token)
        .then(addedToken => {
            console.log(`Blacklisted token: ${addedToken}`);
        })
        .catch(error => {
            console.error(`Failed to blacklist token: ${token}`);
        });
}

export { verifyToken, destroyToken };