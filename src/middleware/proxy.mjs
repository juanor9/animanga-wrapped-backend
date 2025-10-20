import { createProxyMiddleware } from 'http-proxy-middleware';

export default function proxy(req, res, next) {
  const proxyMiddleware = createProxyMiddleware({
    target: 'https://api.myanimelist.net',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyRes(proxyRes) {
      let body = [];
      proxyRes.on('data', (chunk) => {
        body.push(chunk);
      });
      proxyRes.on('end', () => {
        body = Buffer.concat(body).toString();
      });
    },
  });

  proxyMiddleware(req, res, next);
}
