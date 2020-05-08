import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner";
import {connect} from "react-redux";
import {editInput, addInput} from "../../actions/inputActions";
import {Link, useHistory} from "react-router-dom";
import "./input-from.css";

const InputForm = ({editItem, editInput, editMode, error, loading}) => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setPrice(editItem.price);
    setName(editItem.name);
    setContent(editItem.content);

    // eslint-disable-next-line
  }, [editMode]);

  const clearInputFields = () => {
    setPrice("");
    setName("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      clearInputFields();
      editInput(editItem.id, name, price, content);

      history.push("/services");
    } else {
      clearInputFields();
      addInput(name, price, content);
    }
  };

  const handleCancel = () => {
    history.push("/services");
  };

  if (error !== null) {
    return <p className="error">{error.message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Вид ремонта</label>
      <input
        className="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <label>Цена</label>
      <input
        className="price-input"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Описание</label>
      <input
        className="content-input"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="save-btn">
        Save
      </button>
      {editMode ? (
        <button
          onClick={() => {
            clearInputFields();
            handleCancel();
          }}
          className="cancel-btn"
        >
          Cancel
        </button>
      ) : null}
    </form>
  );
};

InputForm.propTypes = {
  editItem: PropTypes.object.isRequired,
  editInput: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  editItem: state.inputs.editItem,
  error: state.inputs.error,
  loading: state.inputs.loading,
  editMode: state.inputs.editMode,
});

export default connect(mapStateToProps, {editInput})(InputForm);
