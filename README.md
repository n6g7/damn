# dAmn [![bitHound Score](https://www.bithound.io/github/as0n/damn/badges/score.svg)](https://www.bithound.io/github/as0n/damn)
Node.js DeviantArt API client

## Quick start

```javascript
var dAmn = require('damn');

dAmn.public(1234, 'cl13nt_s3cr3t', function(err, daClient) {
	// Fetch today's daily deviations
	da.getDailyDeviations(function(err, data) {
		// Output one title
		console.log(data[0].title);
	});
});

```

## Client generation

dAmn currently supports two [authentication methods](https://www.deviantart.com/developers/authentication) : *Client Credentials* and *Implicit*. Both of them provide access to public endpoints. The *Implicit* method however is an user authentication method and also provides access to user-specific APIs.

Both methods require a `client_id` and a `client_secret` to be granted an access token. These are obtained by creating an app in [DeviantArt's application page](https://www.deviantart.com/developers/apps).

### Public API
The easiest way to access public API is to use the *Client Credentials* method, which is available via `dAmn.public` :

```javascript
dAmn.public(4321, 'cl13nt_s3cr3t', function(err, publicClient) {
	publicClient.getDeviation(...);
});
```

Where `4321` is your `client_id` and `cl13nt_s3cr3t` is your `client_secret`.

This returns a `Client` object from which you can call the methods *marked public* described below.

### Logged-in API
Accessing user-specific endpoints can only be done via using the *Implicit* authentication method. This methods requires you to provide an username, a password, a `client_id` and `redirect_uri` for the application you created.

If you're using this method, make sure your "OAuth2 Grant Type" settings is set to "Implicit" in your application parameters :
![DA application's OAuth Grant Type setting](doc/oauth-setting.png)

To instanciate a "private" client you may use `dAmn.private` method :

```javascript
dAmn.private('username', 'password', 1234, 'https://www.example.com', function(err, privateClient) {
	privateClient.getWatchFeed(...);
});
```

Where `1234` is your `client_id` and `https://www.example.com` is your `redirect_uri`.

This returns a `Client` object from which you can call all the methods described below.


## Methods

All these methods are asynchronous.

### getDailyDeviations(*callback*)

> Public endpoint

Returns the list of today's [daily deviations](http://www.deviantart.com/dailydeviations/) :

```javascript
client.getDailyDeviations(function(err, dailyDeviations) {
	console.log(dailyDeviations);
});
```

**Parameters** :
 - `callback` : called with two parameters : *error* (`null` if none) and an array containing the daily deviations.

### getNotifications(*callback*)

> Private endpoint

Returns the list of current user notifications :

```javascript
client.getNotifications(function(err, notifications) {
   console.log(notifications);
});
```

**Parameters** :
- `callback` : called with two parameters : *error* (`null` if none) and an array containing the notifications.

### getWatchFeed(*callback*)

> Private endpoint

Returns the current user's watch feed :

```javascript
client.getWatchFeed(function(err, watchFeedItems) {
   console.log(watchFeedItems);
});
```

**Parameters** :
- `callback` : called with two parameters : *error* (`null` if none) and an array containing the watch feed items.

### placebo(*callback*)

> Public endpoint

Implementation of DA's [placebo](https://www.deviantart.com/developers/http/v1/20150824/placebo/53b9f8bd16df06555acb1dfc06e6df69) route. Use it to check you access token validity. Or better yet, use `checkAccessToken()` !

```javascript
client.placebo(function(err, statusData) {
   console.log(statusData);
});
```

**Parameters** :
- `callback` : called with two parameters : *error* (`null` if none) and an the status object.

### checkAccessToken(*callback*)

Check the validity of your access token.

```javascript
client.checkAccessToken(function(err, isValid) {
   console.log(isValid);
});
```

**Parameters** :
- `callback` : called with two parameters : *error* (`null` if none) and a boolean indicating whether the current access token is still valid.

## Todo

 - [X] Use [Node.js v4.0.0](https://github.com/nodejs/node/blob/v4.0.0/CHANGELOG.md) and ES6 features
 - [ ] Automate token refresh
 - [ ] Use code linting tools :
	- [ ] jshint
	- [ ] jscs
 - [ ] Add access to the following routes :
	- [ ] `/deviation/{deviationid}` Fetch a deviation
	- [ ] `/deviation/content` Fetch full data that is not included in the main devaition object
	- [ ] `/browse/morelikethis` Fetch MoreLikeThis result for a seed deviation
	- [ ] `/browse/newest` Browse newest deviations
	- [ ] `/browse/popular` Browse popular deviations
	- [ ] `/browse/hot` Browse whats hot deviations
	- [ ] and all others routes ?
 - [ ] Revoke access / logout
 - [ ] Find a way to implement [Authorization Code](https://www.deviantart.com/developers/authentication) as an authentication method
