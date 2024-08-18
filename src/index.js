const redirectMap = {
	'/cf': 'https://www.curseforge.com/members/jonas_jones_/projects',
	'/curseforge': 'https://www.curseforge.com/members/jonas_jones_/projects',
	'/dc': 'https://discord.gg/V2EsuUVmWh',
	'/discord': 'https://discord.gg/V2EsuUVmWh',
	'/gh': 'https://github.com/JonasunderscoreJones/',
	'/github': 'https://github.com/JonasunderscoreJones/',
	'/ig': 'https://www.instagram.com/_jonas_jones_/',
	'/instagram': 'https://www.instagram.com/_jonas_jones_/',
	'/fm': 'https://www.last.fm/user/Jonas_Jones',
	'/lastfm': 'https://www.last.fm/user/Jonas_Jones',
	'/mr.': 'https://modrinth.com/user/Jonas_Jones',
	'/modrinth': 'https://modrinth.com/user/Jonas_Jones',
	'/reddit': 'https://www.reddit.com/user/Jonas_Jones_',
	'/r/Jonas_Jones': 'https://www.reddit.com/r/Jonas_Jones/',
	'/x': 'https://twitter.com/Jonas_Jones_',
	'/twitter': 'https://twitter.com/Jonas_Jones_',
	'/yt': 'https://www.youtube.com/channel/UCVIxvKBIMSMgurYS8pK7fSg',
	'/youtube': 'https://www.youtube.com/channel/UCVIxvKBIMSMgurYS8pK7fSg'
	};

	addEventListener('fetch', (event) => {
	  event.respondWith(handleRequest(event));
	});

	async function recordRequest(request) {

		const analyticsData = {
		  timestamp: Date.now(),
		  domain: new URL(request.url).hostname,
		  method: request.method,
		  path: new URL(request.url).pathname,
		  ipcountry: request.cf.country,
		}
		const ANALYTICS_URL = 'https://analytics.jonasjones.dev/requests/record';

		const response = await fetch(ANALYTICS_URL, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': ANALYTICS_API_KEY,
		  },
		  body: JSON.stringify(analyticsData)
		});

		if (response.ok) {
		  console.log('Request recorded successfully');
		} else {
		  console.error('Failed to record request:', response.status, await response.text());
		}
	  }

	async function handleRequest(event) {
		event.waitUntil(recordRequest(event.request));
	  const request = event.request;
	  const { pathname } = new URL(request.url);

	  // Check if the requested URL is in the redirect map
	  if (redirectMap[pathname]) {
		const newURL = redirectMap[pathname];

		// Perform a 301 (Permanent) redirect to the new URL
		return Response.redirect(newURL, 301);
	  }

	  // If the URL is not in the redirect map, pass through the request
	  return fetch(request);
	}