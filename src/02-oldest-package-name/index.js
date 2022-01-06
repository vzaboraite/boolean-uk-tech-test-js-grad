/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */
const getPackages = require('../utils/npms-api');

module.exports = async function oldestPackageName() {
  const givenPackages = await getPackages();

  const oldestPackage = givenPackages.reduce((prev, curr) =>
    curr.date < prev.date ? curr : prev,
  );

  const name = oldestPackage.name;

  return name;
};
