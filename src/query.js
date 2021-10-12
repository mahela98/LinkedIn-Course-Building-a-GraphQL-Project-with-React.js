const githubQuery = (pageCount, query, paginationKeyword, paginationString) => {

  return {
    query: `
      {
        viewer {
          name
        }
         search(query: "${query} user:mahela98  sort:updated.desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
          repositoryCount
          edges {
            cursor
            node {
              ... on Repository {
                name
                id
                url
                description
                viewerSubscription
                licenseInfo {
                  spdxId
                }
              }
            }
          }
          pageInfo{
            startCursor
            hasNextPage
            endCursor
            hasPreviousPage
          }
        }
      }
        
      `,
  };
};

export default githubQuery;