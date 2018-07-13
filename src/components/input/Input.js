import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    optional: PropTypes.bool,
    optionalText: PropTypes.string,
    hasErrors: PropTypes.bool,
    errorMsg: PropTypes.string
  }

  static defaultProps = {
    label: null,
    className: '',
    disabled: false,
    maxLength: 30,
    value: '',
    onBlur: null,
    onChange: null,
    hasErrors: false,
    errorMsg: '',
    required: false,
    optionalText: ''
  }

  render() {
    const {
      className,
      name,
      placeholder,
      disabled,
      value,
      type,
      errorMsg,
      hasErrors,
      maxLength,
      label,
      required,
      optionalText,
      onChange,
      onBlur
    } = this.props;
    return (
      <div className={`e-form-section ${className} ${hasErrors ? 'has-error' : ''}`}>
        {
          label
            ?
              <label className="e-label" htmlFor={name}>
                {`${label}${required ? '*' : ''}`}
                <span className="e-label-optional">
                  {
                    `${optionalText || ''}`
                  }
                </span>
              </label>
            : null
        }
        <input
          className="e-form-control"
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          type={type}
          value={value === null || typeof value === 'undefined' ? '' : value}
          onBlur={onBlur}
          onChange={onChange}
        />
        {
          hasErrors && <div className="e-form-control__feedback">{errorMsg}</div>
        }
      </div>
    );
  }
}

export default Input;
