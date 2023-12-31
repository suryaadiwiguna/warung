/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.BASE_URL,
        GET_PRODUCT: process.env.GET_PRODUCT,
        GET_PRODUCT_LIST: process.env.GET_PRODUCT_LIST
    }
}
