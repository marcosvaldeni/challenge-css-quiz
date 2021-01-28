import React from 'react';
import PropTypes from 'prop-types';

import { InputStyle } from './styles';

const Input = ({ onChange, placeholder, ...props }) => {

  return (
    <>
      <InputStyle 
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </>
  );
}

Input.defaultProps = {
  value: '',
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
