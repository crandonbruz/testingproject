import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Modal from "../components/Modal";
import ModalTwo from "../components/ModalTwo";

import { QUERY_USER } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().data.username },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() &&
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().data.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4 style={{ color: "#e1e1e1" }}>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center m-auto">
        <h1
          className="col-12 col-md-10 p-3 mb-5"
          style={{ color: "#e1e1e1", fontSize: "75px" }}
        >
          Viewing {userParam ? `${user.username}'s` : "Your"} Profile.
        </h1>
        <div className="col-12 col-md-5">
          <div className="p-3">
            <Modal />
          </div>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ModalTwo
                checkLists={user?.checkLists}
                user={user}
                title="Here are your checklists!"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
