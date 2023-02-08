import React, { Fragment } from 'react';
import './features.css';

const Features = () => {
  return (
    <Fragment>
      <div className='section-container'>
        <p>What makes our product special</p>

        <div className='features-container'>
          <div className='specs-section'>
            <div className='specs'>
              <p className='specs-header'>Lorem ipsum dolor sit.</p>
              <p className='specs-text'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
                autem assumenda asperiores?
              </p>
            </div>
            <div className='specs'>
              <p className='specs-header'>Lorem ipsum dolor sit.</p>
              <p className='specs-text'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque,
                deleniti nihil. Deserunt.
              </p>
            </div>
          </div>
          <div className='specs-section'>
            <div className='specs'>
              <p className='specs-header'>Lorem ipsum dolor sit.</p>
              <p className='specs-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                facilis animi earum.
              </p>
            </div>
            <div className='specs'>
              <h1 className='specs-header'>Lorem ipsum dolor sit.</h1>
              <p className='specs-text'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium excepturi repellendus numquam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Features;
