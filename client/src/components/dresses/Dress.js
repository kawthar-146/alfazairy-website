import React from 'react';
import './Dress.css';
import { Link } from 'react-router-dom';

const Dress = (props) => {
  const dressClickHandler = () => {
    props.setSelectedDressData({
      name: props.name,
      price: props.price,
      // category: props.category,
      // collection: props.collection,
      description: props.descritpion,
      src: props.src,
    });
  };

  return (
    <div className='dress'>
      <img
        src={props.src}
        alt='dress thumbnail'
        onClick={dressClickHandler}
      ></img>
      <h3>{props.name}</h3>
    </div>
  );
};

export default Dress;
