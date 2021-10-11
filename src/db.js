const github ={
    baseURL ="https://api.github.com/graphql",
    username= process.env.GITHUB_USERNAME,
    headers: {
        "Content-Type":"application/json",
        Authorization: "bearer " + process.env.GITHUB_TOKEN,
    },
    
}

export default github;