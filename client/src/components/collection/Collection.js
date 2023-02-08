import React from 'react';
import './Collection.css';
import { Link } from 'react-router-dom';

const Collection = (props) => {
  return (
    <div className='collection'>
      <Link
        to='/collections/dresses'
        state={{
          collection_id: props.collectionId,
          collection_name: props.name,
        }}
      >
        <img src={props.src} alt='collection cover'></img>
      </Link>
      <h2>{props.name}</h2>
    </div>
  );
};

export default Collection;
