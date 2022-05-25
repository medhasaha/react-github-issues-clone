export const getGithubIssues = () => {
  let queryURL = `https://api.github.com/repos/facebook/react/issues`;
  return fetch(queryURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("[ServiceClass] getGithubIssues data", data);
      return data;
    })
    .catch((error) => {
      console.log("[ServiceClass] getGithubIssues error", error);
    });
};
