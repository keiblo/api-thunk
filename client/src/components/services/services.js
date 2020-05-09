import React from "react";
import DisplayInput from "../display-inputs";
import InputForm from "../input-form";
import PropTypes from "prop-types";

import {connect} from "react-redux";

const Services = ({editMode, editItem}) => {
  return (
    <div>
      <InputForm />
      <DisplayInput />
    </div>
  );
};

Services.propTypes = {
  editMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  editMode: state.inputs.editMode,
  editItem: state.inputs.editItem,
});

export default connect(mapStateToProps)(Services);
