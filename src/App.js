import github from "./db";
import { useEffect, useState, useCallback } from "react";
import githubQuery from "./query";
import RepoInfo from "./repoInfo";

function App() {
  let [username, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);


  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubQuery),
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        // const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        setUserName(repos.name);
        setRepoList(repos);

      }).catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">  <i className="bi bi-diagram-2-fill">
        Repos </i>
      </h1>
      <p>
        {username}
      </p>
      {
        repoList && (
          <ul className="list-group list-group-flush ">
            {
              repoList.map((repo) => (
                <RepoInfo key={repo.id} repo={repo} />
              ))
            }
          </ul>
        )
      }
    </div>
  );
}

export default App;
