export function baseUrlConfig() {
    return (process.env.NODE_ENV === 'production') ? 'https://api.nearby.com:3000'
    : (process.env.NODE_ENV === 'stage') ? 'https://api-stage.nearby.com:3000' : 'http://localhost:3000';
}