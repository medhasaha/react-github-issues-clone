export const getGithubIssues = (page = 1) => {
  let queryURL = `https://api.github.com/repos/facebook/react/issues?page=${page}`;
  return fetch(queryURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log("[ServiceClass] getGithubIssues data", data);
      let filteredData = data && data.length > 0 && data.filter(item => !("pull_request" in item) )
      return filteredData;
    })
    .catch((error) => {
      console.log("[ServiceClass] getGithubIssues error", error);
    });
};

export function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
