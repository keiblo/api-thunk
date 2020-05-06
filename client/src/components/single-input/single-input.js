import React from "react";
import "./single-input.css";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {deleteInput, setCurrent} from "../../actions/inputActions";

const SingleInput = ({
  id,
  name,
  price,
  content,
  deleteInput,
  setCurrent,
  editMode,
}) => {
  const deleteWhileEditing = (id) => {
    if (editMode) {
      alert("PLease cancel edit mode before deleting input");
    } else {
      deleteInput(id);
    }
  };
  return (
    <div className="single-input-box">
      <ul className="inputs-box">
        <li className="input-item">{name}</li>
        <li className="input-item">¥{price}</li>
        <li className="input-item">
          <Link
            to={`/services/:${id}`}
            className="edit-btn"
            onClick={() => setCurrent(id)}
          >
            <span className="material-icons">create</span>
          </Link>

          <Link
            to="/services"
            className="delete-btn"
            onClick={() => deleteWhileEditing(id)}
          >
            <span className="material-icons">delete</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

SingleInput.propTypes = {
  deleteInput: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  editMode: state.inputs.editMode,
});

export default connect(mapStateToProps, {deleteInput, setCurrent})(SingleInput);
