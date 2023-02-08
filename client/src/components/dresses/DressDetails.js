import React from 'react';
import './DressDetails.css';

const DressDetails = (props) => {
  const containerClickHandler = (e) => {
    if (e.target.classList.contains('dress-details-container')) {
      props.setSelectedDressData(null);
    }
  };

  const closeClickHandler = () => {
    props.setSelectedDressData(null);
  };

  return (
    <div className='dress-details-container' onClick={containerClickHandler}>
      <div className='dress-details-div'>
        <div className='close-btn' onClick={closeClickHandler}>
          X
        </div>
        <div className='dress-image'>
          <img src={props.src}></img>
        </div>
        <div className='dress-details'>
          <div className='detail-title'>
            <p>
              {' '}
              <span>Dress name:</span>&nbsp;
              {props.name}
            </p>
          </div>
          <div className='detail-title'>
            <p>
              {' '}
              <span>Price:</span>&nbsp;${props.price.toLocaleString()}
            </p>
          </div>
          {props.description && (
            <div className='detail-title'>
              <p>
                <span>Description:</span>&nbsp;{props.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DressDetails;
