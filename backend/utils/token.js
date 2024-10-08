import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true }); // Optional: store in cookie
    return token;
};

export default generateToken;
