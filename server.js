require('isomorphic-fetch');
var funcs = require('./functions.js');
var sql = require('./sql.js');
const dotenv = require('dotenv');
const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const axios = require('axios');
var sleep = require('sleep');

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session({ secure: true, sameSite: 'none' }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  router.get('/test', async (ctx) => {
    if (funcs.validateSignature(ctx.query)) {

      axios.post('/admin/api/2020-01/customers.json')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      ctx.body = {
        status: 'Success',
        data: "Customer Created"
      };
    } else {
      ctx.body = {
        status: 'Failed',
        data: "Not authenticated"
      };
    }
  })

  server.use(router.routes());
  server.use(router.allowedMethods());

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'read_customers'],
      accessMode: 'offline',
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;

        if (!funcs.validateHMAC(ctx.query)) {
          ctx.body = {
            status: 'Failed',
            data: "Not authenticated"
          };
          ctx.res.statusCode = 401;
          return
        }

        //funcs.permanentAcessCode(ctx.query);

        funcs.requestCustomers(ctx.session);
        
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
        ctx.redirect('/');
      },
    }),
  );

  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

});