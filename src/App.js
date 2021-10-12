import github from "./db";
import { useEffect, useState, useCallback } from "react";
import githubQuery from "./query";
import RepoInfo from "./repoInfo";
import SearchBox from "./searchBox";
import NavButtons from "./naviButtons";

function App() {
  let [username, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [query, setQuery] = useState("API");
  let [totalCount, setTotalCount] = useState(null);

  let [startCurser, setStartCurser] = useState(null);
  let [endCursor, setEndCursor] = useState(null);
  let [hasNextPage, setHasNextPage] = useState(true);
  let [hasPreviousPage, setHasPreviousPage] = useState(false);
  let [paginationKeyword, setPaginationKeyword] = useState("first");
  let [paginationString, setPaginationString] = useState("");



  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(githubQuery(pageCount, query, paginationKeyword, paginationString));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        // const viewer = data.data.viewer;
        const repos = data.data.search.edges;
        const total = data.data.search.repositoryCount;

        const start= data.data.search.pageInfo?.startCursor;
        const end= data.data.search.pageInfo?.endCursor;
        const hasNextPage= data.data.search.pageInfo?.hasNextPage;
        const hasPreviousPage= data.data.search.pageInfo?.hasPreviousPage;


        setUserName(repos.name);
        setRepoList(repos);
        setTotalCount(total);
        setStartCurser(start);
        setEndCursor(end);
        setHasNextPage(hasNextPage);
        setHasPreviousPage(hasPreviousPage);

      }).catch(err => {
        console.log(err);
      })
  }, [pageCount, query,paginationString,paginationKeyword]);

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
      <NavButtons 
      start={startCurser} 
      end={endCursor} 
      hasNextPage={hasNextPage} 
      hasPreviousPage={hasPreviousPage} 
      onPage= {(myKeyWord,myString )=>{
        setPaginationKeyword(myKeyWord);
        setPaginationString(myString);
      }}
      />
      <p>
        {username}
      </p>
      {
        repoList && (
          <ul className="list-group list-group-flush ">
            {
              repoList.map((repo) => (
                <RepoInfo key={repo.node.id} repo={repo.node} />
              ))
            }
          </ul>
        )
      }
          <NavButtons 
      start={startCurser} 
      end={endCursor} 
      hasNextPage={hasNextPage} 
      hasPreviousPage={hasPreviousPage} 
      onPage= {(myKeyWord,myString )=>{
        setPaginationKeyword(myKeyWord);
        setPaginationString(myString);
      }}
      />
    </div>
  );
}

export default App;
