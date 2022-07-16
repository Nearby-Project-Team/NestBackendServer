module.exports = {
    type: 'mysql',
    host: '127.0.0.1',
    username: 'nearby',
    password: 'n3@rbYP@sswD12#$',
    port: 3306,
    database: 'nearby',
    entities: ['dist/**/**/**/*.entity.js'],
    seeds: ['dist/seeds/*.seed.js']
}