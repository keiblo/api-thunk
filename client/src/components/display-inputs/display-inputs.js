import React, {useEffect} from "react";
import "./display-inputs.css";
import {connect} from "react-redux";
import SingleInput from "../single-input";
import Spinner from "../spinner";
import PropTypes from "prop-types";
import {getInputs} from "../../actions/inputActions";

const DisplayInputs = (props) => {
  const {loading, list, getInputs, error} = props;

  useEffect(() => {
    getInputs();
    //eslint-disable-next-line
  }, []);

  if (error !== null) {
    return <p className="error">{error.message}</p>;
  } else if (loading || list === null) {
    return <Spinner />;
  }

  return (
    <div className="display-input-box">
      {list.length === 0 ? (
        <p>No inputs to show</p>
      ) : (
        list.map((input) => (
          <SingleInput
            key={input.id}
            id={input.id}
            name={input.name}
            price={input.price}
            content={input.content}
          />
        ))
      )}
    </div>
  );
};

DisplayInputs.propTypes = {
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array,
  getInputs: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  loading: state.inputs.loading,
  list: state.inputs.list,
  error: state.inputs.error,
});
export default connect(mapStateToProps, {getInputs})(DisplayInputs);
