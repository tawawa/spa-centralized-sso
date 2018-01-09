const AUTH0_CLIENT_ID = 'zalZ1MTxYGmq72QYJ3fhsMl13Z5xfZga';
const AUTH0_DOMAIN = 'demonstration.auth0.com';

if (!AUTH0_CLIENT_ID || !AUTH0_DOMAIN) {
  alert('Make sure to set the AUTH0_CLIENT_ID and AUTH0_DOMAIN variables in auth0-variables.js.');
}

const auth0js = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
  scope: 'openid profile',
  responseType: 'token',
  redirectUri: 'http://localhost:3000'
});
