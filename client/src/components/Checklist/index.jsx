import { Link } from "react-router-dom";

//  change all thoughts to checkLists
const checkList = ({ checkLists }) => {
  if (!checkLists?.length) {
    return (
      <h3 style={{ fontSize: "1.5rem", color: "#e1e1e1" }}>No Checklists</h3>
    );
  }
  // change the routing to add this list to the pages cd ..
  return (
    <div>
      {checkLists &&
        checkLists.map((checkList) => (
          <div key={checkList._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <Link
                className="text-light text-center"
                to={`/checkLists/${checkList._id}`}
              >
                {checkList.checkListAuthor}
              </Link>
              <br />
              <span style={{ fontSize: "1.5rem" }}>
                created this list on {checkList.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2 text-center">
              <p style={{ fontSize: "2rem" }}>{checkList.checkListText}</p>
              <ol>
                {checkList.items.map((item) => {
                  return <li>{item.text}</li>;
                })}
              </ol>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              style={{
                fontSize: "1.5rem",
                backgroundColor: "#2d3e50",
                color: "#edede9",
              }}
              to={`/checkLists/${checkList._id}`}
            >
              Add comments to the list.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default checkList;
