import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner";
import {connect} from "react-redux";
import {editInput} from "../../actions/inputActions";
import {Link, useHistory} from "react-router-dom";
import "./input-from.css";

const InputForm = ({editItem, editInput, error, loading}) => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setPrice(editItem.price);
    setName(editItem.name);
    setContent(editItem.content);

    // eslint-disable-next-line
  }, [editItem]);

  const clearInputFields = () => {
    setPrice("");
    setName("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editInput(editItem.id, name, price, content);
    clearInputFields();
    history.push("/services");
  };
  if (error !== null) {
    return <p className="error">{error.message}</p>;
  } else if (loading) {
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
      {editItem ? (
        <Link to="/services" className="cancel-btn">
          Cancel
        </Link>
      ) : null}
    </form>
  );
};

InputForm.propTypes = {
  editItem: PropTypes.object.isRequired,
  editInput: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  editItem: state.inputs.editItem,
  error: state.inputs.error,
  loading: state.inputs.loading,
});

export default connect(mapStateToProps, {editInput})(InputForm);
