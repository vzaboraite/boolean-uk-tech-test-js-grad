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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

const getPackages = require('../utils/npm-api');

module.exports = async function organiseMaintainers() {
  const givenPackages = await getPackages();

  const maintainers = [];

  givenPackages.forEach(item => {
    const packageName = item.name;

    item.maintainers.forEach(maintainer => {
      const foundMaintainer = maintainers.find(
        entry => entry.username === maintainer.username,
      );

      if (foundMaintainer) {
        foundMaintainer.packageNames.push(packageName);
      } else {
        maintainers.push({
          username: maintainer.username,
          packageNames: [packageName],
        });
      }
    });
  });

  maintainers.sort((a, b) => a.username.localeCompare(b.username));
  maintainers.forEach(entry => entry.packageNames.sort());

  return maintainers;
};
