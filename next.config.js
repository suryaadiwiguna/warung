/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    reactStrictMode: true,
    env: {
        GET_PRODUCT: process.env.NEXT_PUBLIC_GET_PRODUCT,
        GET_PRODUCT_LIST: process.env.NEXT_PUBLIC_GET_PRODUCT_LIST
    }
}
