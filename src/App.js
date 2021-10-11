import github from "./db";
import { useEffect, useState, useCallback } from "react";
import githubQuery from "./query";
import RepoInfo from "./repoInfo";
import SearchBox from "./searchBox";

function App() {
  let [username, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [query, setQuery] = useState("API");
  let [totalCount, setTotalCount] = useState(null);



  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(githubQuery(pageCount, query));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        // const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUserName(repos.name);
        setRepoList(repos);
        setTotalCount(total);

      }).catch(err => {
        console.log(err);
      })
  }, [pageCount, query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">  <i className="bi bi-diagram-2-fill">
        Repos </i>
      </h1>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        query={query}
        onQueryChange={(myString) => { setQuery(myString) }}
        onTotalChange={(number) => { setPageCount(number) }}
      />
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
