import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addInput, editInput} from "../../actions/inputActions";
import {useHistory, Link} from "react-router-dom";
import "./input-from.css";

const InputForm = ({addInput, editItem, editMode, editInput}) => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editMode) {
      setPrice(editItem.price);
      setName(editItem.name);
      setContent(editItem.content);
    }
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
      editInput(editItem.id, name, price, content);
      clearInputFields();
    } else {
      addInput(name, price, content);
      clearInputFields();
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    history.push("/services");
    clearInputFields();
  };

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
      <Link to="/setvices" type="submit" className="save-btn">
        Save
      </Link>
      {editMode ? (
        <Link className="cancel-btn" onClick={handleCancel}>
          Cancel
        </Link>
      ) : null}
    </form>
  );
};

InputForm.propTypes = {
  addInput: PropTypes.func.isRequired,
  editItem: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  editInput: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  editItem: state.inputs.editItem,
  editMode: state.inputs.editMode,
});

export default connect(mapStateToProps, {addInput, editInput})(InputForm);
