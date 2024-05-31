import { useState } from "react";
import "./editableRow.scss";

const EditableRow = ({
  value,
  id,
  commentUserID,
  identificator,
  onConfirm,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rowValue, setRowValue] = useState(value);
  let content = <span className="content">{rowValue}</span>;
  if (isEditing) {
    if (identificator === "text") {
      content = (
        <textarea
          rows="8"
          type="text"
          className="editText"
          value={rowValue}
          onChange={(event) => {
            setRowValue(event.target.value);
          }}
        />
      );
    } else {
      content = (
        <input
          className="editRating"
          type="number"
          name="rating"
          min="1"
          max="5"
          maxLength="1"
          value={rowValue}
          onChange={(event) => {
            setRowValue(event.target.value);
          }}
        />
      );
    }
  }
  return (
    <div className="commentEditableRow">
      <div className="container">
        {content}
        <div className="btn">
          <button
            className="editButton"
            onClick={() => {
              if (isEditing) {
                onConfirm(commentUserID, id, identificator, rowValue);
              }
              setIsEditing((prevState) => {
                return !prevState;
              });
            }}
          >
            {isEditing ? "Confirm" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableRow;
