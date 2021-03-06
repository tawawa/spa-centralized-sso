function displayStatus () {
  let status;
  const token = localStorage.getItem('accessToken');
  const expirationDate = new Date(Number.parseInt(localStorage.getItem('expirationDate')));
  const isExpired = expirationDate < new Date();

  if (!token) {
    status = 'There is no access token present in local storage, meaning that you are not logged in. <a href="#" onclick="checkSession()">Click here to attempt an SSO login</a>';
  } else if (isExpired) {
    status = 'There is an expired access token in local storage. <a href="#" onclick="checkSession()">Click here to renew it</a>';
    document.getElementById('logout').style.visibility = 'visible';
  } else {
    status = `There is an access token in local storage, and it expires on ${expirationDate}. <a href="#" onclick="checkSession()">Click here to renew it</a>`;
    document.getElementById('logout').style.visibility = 'visible';
  }
  document.getElementById('status').innerHTML = status;
}

function saveAuthResult (result) {
  localStorage.setItem('accessToken', result.accessToken);
  localStorage.setItem('expirationDate', Date.now() + Number.parseInt(result.expiresIn) * 1000);
  displayStatus();
}

function checkSession () {
  auth0js.checkSession({
    responseType: 'token id_token',
    scope: 'openid profile email',
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    connection: AUTH0_CONNECTION,
    redirectUri: 'http://localhost:3000/callback.html',
    timeout: 5000,
    usePostMessage: true
  }, function (err, result) {
    if (err) {
      alert(`Could not get a new token using silent authentication (${err.error}). Redirecting to login page...`);
      auth0js.authorize();
    } else {
      saveAuthResult(result);
    }
  });
}

auth0js.parseHash(window.location.hash, function (err, result) {
  if (err) {
    console.error(err);
  } else if (result) {
    saveAuthResult(result);
  }
});

console.log('page loaded..');
debugger;
displayStatus();
