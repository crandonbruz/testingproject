import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_CHECKLIST } from "../../utils/mutations";
import { GET_ALL_CHECKLISTS } from "../../utils/queries";

import Auth from "../../utils/auth";
import checkList from "../Checklist";

const CheckListForm = () => {
  const [items, setItems] = useState([""]);
  const [checkListText, setCheckListText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addCheckList, { error }] = useMutation(ADD_CHECKLIST, {
    refetchQueries: [GET_ALL_CHECKLISTS, "getcheckLists"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCheckList({
        variables: {
          checkListText,
          checkListAuthor: Auth.getProfile().data.username,
        },
      });

      setCheckListText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "checkListText" && value.length <= 280) {
      setTitle(value);
      setCharacterCount(value.length);
    }
  };

  const addItems = () => {
    setItems([...items, ""]);
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    const list = [...items];
    list[name] = value;
    setItems(list);
  };

  // change the thought list form to make it the checklist and to add items to it and also connect the querys
  return (
    <div>
      <div>
        <h3>What Disaster are you preparing for?</h3>

        {Auth.loggedIn() ? (
          <>
            <p
              className={`m-0 ${
                characterCount === 280 || error ? "text-danger" : ""
              }`}
            >
              Character Count: {characterCount}/280
            </p>
            <form
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              <textarea
                name="title"
                placeholder="Title"
                value={title}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
              {/* change this input to add a title and connect it to the mutation */}
              <div className="col-12 col-lg-9">
                {items.map((item, index) => (
                  <textarea
                    name={index}
                    placeholder="Add items to list"
                    value={item}
                    className="form-input w-100"
                    style={{ lineHeight: "1.5", resize: "vertical" }}
                    onChange={handleItemChange}
                    key={index}
                  ></textarea>
                ))}
                <button onClick={addItems}>add</button>
              </div>

              <div className="col-12 col-lg-3">
                <button
                  className="btn btn-primary btn-block py-3"
                  type="submit"
                >
                  Create List
                </button>
              </div>

            </form>
          </>
        ) : (
          <p>
            You need to be logged in to share your thoughts. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckListForm;
