import { Fragment } from 'react';
import React from 'react';
import Form from '../components/form/form';
import Info from '../components/info/info';
import './contact.css';
import weddingimage from '../components/assets/wedding.jpg';
import weddingimage1 from '../components/assets/wedding1.jpg';

const Contact = () => {
  return (
    <Fragment>
      <div>
        <div className='intro-section-one'>
          <p>We'd love to hear from you !</p>
        </div>
        <div
          className='contact-page-container'
          style={{
            backgroundColor: 'white',
            backgroundImage: `url(${weddingimage1})`,
          }}
        >
          <Info />
          <Form />
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
