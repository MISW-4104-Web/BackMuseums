const jwtConstants = {
    JWT_SECRET: 'secretKey',
    BASE_USERS: [
        {
            id: 1,
            username: 'admin',
            password: 'admin',
            roles: ['admin'],
        },
        {
            id: 2,
            username: 'user',
            password: 'user',
            roles: ['user'],
        }
    ]
}

export default jwtConstants;