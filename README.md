# GoTrue JS Examples

Hi there! This is my playground repo to test out Netlify’s [GoTrue JS](https://github.com/netlify/gotrue-js) client library. You can see a live demo of the examples at [link](https://lunaceee-gotruejs.netlify.com/).

To run the examples locally, here’s what you’ll need:

## System Requirements

* [git](https://git-scm.com)
* [NodeJS](nodejs.org) 8 or greater
* [yarn](yarnpkg.com)

## Setup

```
git clone git@github.com:lunaceee/netlify-gotruejs-example-site.git
cd netlify-gotruejs-example-site.git
yarn
```

## Running the examples

```
yarn start
```

## Troubleshooting

If you want to run the examples against your own Identity instance, change the
value of `APIUrl` in `src/index.js` to point to your own Netlify site URL.

After you do that, you might come across one of the following errors, like I did.

### Error: Failed to load

```
Failed to load https://github.com/lunaceee/netlify-gotruejs-example-site/signup:
Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'http://localhost:8082' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

What this error can mean:

* The URL in the `APIUrl` option is wrong. **Solution**: Look out for typos! `APIUrl` should look something like: `https://{your-site-domain}/.netlify/identity`
* You haven’t enabled Identity in your Netlify site. **Solution**: Go to your Netlify dashboard and enable Identity for your site.

### Error: Unable to locate site configuration

```
POST https://imorente-gotrue-examples.netlify.com/.netlify/identity/signup 404 ()
error :( Error: Unable to locate site configuration
  at main.js:1
```

What this error can mean:

* Your Identity service hasn’t been detected yet. **Solution**: Trigger a new
  deploy from your Netlify dashboard (or push a change to your repository) to
  force a cache refresh in the Netlify origin server.
