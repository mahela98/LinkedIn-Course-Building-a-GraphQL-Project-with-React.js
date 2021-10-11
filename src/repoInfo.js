const RepoInfo = ({ repo }) => {
let licanse ;
switch (repo.licenseInfo?.spdxId) {
    case undefined:
        licanse= (
            <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger" style={{ fontSize: ".6em" }}>
                NO LICENSE
            </span>
        );
        break;

    case "NOASSERTION":
        licanse= (
            <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning" style={{ fontSize: ".6em" }}>
                {repo.licenseInfo?.spdxId}
            </span>
        );
        break;

    default:
        licanse= (
            <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-success" style={{ fontSize: ".6em" }}>
                {repo.licenseInfo?.spdxId}
            </span>
        );
        break;

}

    return (
        <li className="list-group-item" key={repo.id.toString()}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <a href={repo.url} className="h5 mb-0 text-decoration-none "> {repo.name}</a>
                    <p className="small"> {repo.description} </p>
                </div>
            </div>
       <div className="text-nowrap ms-3">
          {licanse}
       <span className={
                "px-1 py-0 ms-1 d-inline-block btn btn-sm " +
                (repo.viewerSubscription === "SUBSCRIBED"
                    ? "btn-success"
                    : "btn-outline-secondary"
                )

            } style={{ fontSize: ".6em" }}

            >{repo.viewerSubscription}</span>
       </div>

        </li>
    );
}

export default RepoInfo;