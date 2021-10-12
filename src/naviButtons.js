const NavButtons = ({ start, end, hasNextPage, hasPreviousPage, onPage }) => {
    return (
        <div className="d-flex justify-content-center my-2">
            {hasPreviousPage && (
                <button className=" mx-1 btn btn-sm btn-danger bi bi-arrew-left"
                    onClick={() => onPage("last", 'before: "' + start + '"')}
                >Previous Page</button>
            )}
            {hasNextPage && (
                <button className="btn mx-1 btn-sm btn-danger bi bi-arrew-right"
                    onClick={() => onPage("first", 'after: "' + end + '"')}
                >Next Page</button>
            )}
        </div>
    );
}

export default NavButtons;