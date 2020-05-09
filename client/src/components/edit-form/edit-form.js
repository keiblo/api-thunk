import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner";
import {connect} from "react-redux";
import {editInput} from "../../actions/inputActions";
import {useHistory} from "react-router-dom";
import "./edit-form.css";

const EditForm = ({editItem, editInput, editMode, error, loading}) => {
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

    clearInputFields();
    editInput(editItem.id, name, price, content);

    history.push("/services");
  };

  const handleCancel = () => {
    clearInputFields();
    history.push("/services");
  };

  if (error !== null) {
    return <p className="error">{error.message}</p>;
  }

  if (loading & !editMode) {
    return <Spinner />;
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

      <button
        onClick={() => {
          handleCancel();
        }}
        className="cancel-btn"
      >
        Cancel
      </button>
    </form>
  );
};

EditForm.propTypes = {
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

export default connect(mapStateToProps, {editInput})(EditForm);
