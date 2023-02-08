import React, { useState, useEffect } from 'react';
import './Collections.css';
import Collection from '../components/collection/Collection';
import Loader from '../components/loader/Loader';

const Collections = () => {
  const [collectionsData, setCollectionsData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections');
        const data = await response.json();
        console.log(data);
        setCollectionsData(data.collections);
        setShowLoader(false);
      } catch (err) {
        setShowLoader(false);
        alert('Server Error');
      }
    };
    fetchCollections();
  }, []);
  const collectionsArray = collectionsData.map((collection) => {
    return (
      <Collection
        key={collection._id}
        src={`/${collection.coverDress.image}`}
        name={collection.name}
        collectionId={collection._id}
      />
    );
  });

  return (
    <main>
      <div className='intro-section-one'>
        <p className='collections-title'>Collections</p>
      </div>
      {showLoader && <Loader />}
      <div className='collections'>{collectionsArray}</div>
    </main>
  );
};

export default Collections;
