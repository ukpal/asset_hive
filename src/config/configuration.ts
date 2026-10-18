

export default () => ({
    port: parseInt(process.env.PORT || '3000'),

    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        name: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    },

    admin:{
        name: process.env.ADMIN_NAME,
        email:process.env.ADMIN_EMAIL,
        password:process.env.ADMIN_PASSWORD
    }

})