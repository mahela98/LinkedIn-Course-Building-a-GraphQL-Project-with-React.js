const githubQuery =(pageCount,query)=>{
  
    return {
      query: `
      {
          viewer {
            name
          }
          search(query: "${query} user:mahela98  sort:updated.desc", type: REPOSITORY, first: ${pageCount}) {
            repositoryCount
            nodes {
              ... on Repository {
                name
                id
                url
                description
                viewerSubscription
                licenseInfo{
                  spdxId
                }
              }
            }
          }
        }
        
        
      `,
    };
};

export default githubQuery;