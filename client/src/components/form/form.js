import { Fragment, useState } from 'react';
// import { useForm, ValidationError } from "@formspree/react";
import React from 'react';
import './form.css';

const Form = () => {
  const [values, setValues] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
  });

  const handleFullNameInputChange = (event) => {
    setValues({ ...values, fullName: event.target.value });
  };

  const handleEmailAddressInputChange = (event) => {
    setValues({ ...values, emailAddress: event.target.value });
  };

  const handlePhoneNumberInputChange = (event) => {
    setValues({ ...values, phoneNumber: event.target.value });
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    // event.preventDefault();
    if (values.fullName && values.emailAddress && values.phoneNumber) {
      setValid(true);
    }
    setSubmitted(true);
  };

  const [valid, setValid] = useState(false);

  return (
    <Fragment>
      <div className='form-container'>
        <form
          action='https://formsubmit.co/24223d9021d2ae50748a662a3d672338'
          method='POST'
          onSubmit={handleSubmit}
        >
          {submitted && valid ? (
            <div className='success-message'>
              Success! Thank you for submitting.
            </div>
          ) : null}

          {/* Full name  */}
          <div className='input-sections'>
            <label htmlFor='full-name'>Full name</label>
            <br></br>
            <input
              onChange={handleFullNameInputChange}
              value={values.fullName}
              type='text'
              id='full-name'
              name='full-name'
              placeholder='Name'
            />

            {submitted && !values.fullName ? (
              <span>Please enter a full name</span>
            ) : null}
            <br></br>
          </div>
          {/* Email  */}
          <div className='input-sections'>
            <label htmlFor='email-address'>Email-address</label>
            <br></br>
            <input
              onChange={handleEmailAddressInputChange}
              value={values.emailAddress}
              type='email'
              id='email-address'
              name='email-address'
              placeholder='email@domain.com'
            />
            {submitted && !values.emailAddress ? (
              <span>Please enter an Email address</span>
            ) : null}
            <br></br>
          </div>
          {/* Phone number  */}
          <div className='input-sections'>
            <label htmlFor='phone-number'>Phone number</label>
            <br></br>
            <input
              onChange={handlePhoneNumberInputChange}
              value={values.phoneNumber}
              maxLength={8}
              type='tel'
              id='phone-number'
              name='phone-number'
              placeholder='Number'
            />
            {submitted && !values.phoneNumber ? (
              <span>Please enter a phone number</span>
            ) : null}
          </div>
          {/* Text area  */}
          <div className='input-sections'>
            <label htmlFor='feedback'>How can we help</label>
            <br></br>
            <textarea
              name='feedback'
              id='feedback'
              cols='25'
              rows='5'
              placeholder='Write your message'
            ></textarea>
          </div>
          <button type='submit'>Send</button>
        </form>
      </div>
      {/* test  */}
    </Fragment>
  );
};

export default Form;
