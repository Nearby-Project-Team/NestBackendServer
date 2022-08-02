export function baseUrlConfig() {
    return (process.env.NODE_ENV === 'production') ? 'https://api.nearby.com:8443'
    : (process.env.NODE_ENV === 'stage') ? 'https://api-stage.nearby.com:8443' : 'https://api-test/nearby.com:8443';
}