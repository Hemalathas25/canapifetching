import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },

    {
        name: 'Athirai',
        email: 'athirai@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },

    {
        name: 'Hevanthika',
        email: 'hevanthika@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]

export default users;