import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Dresses.css';
import Searchbar from '../components/dresses/Searchbar';
import Dress from '../components/dresses/Dress';
import MuiSelect from '../components/dresses/MuiSelect';
import Loader from '../components/loader/Loader';
import DressDetails from '../components/dresses/DressDetails';

const Dresses = () => {
  const [fetchedDressesData, setDressesData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDressData, setSelectedDressData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchDressesByCollection = async () => {
      try {
        const response = await fetch(
          `/api/dresses/bycollection/${location.state.collection_id}`
        );
        const data = await response.json();
        setDressesData(data.dresses);
        setShowLoader(false);
      } catch (err) {
        setShowLoader(false);
        alert('Server Error');
      }
    };
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategoriesData(data.categories);
    };
    fetchDressesByCollection();
    fetchCategories();
  }, []);

  //Create function to handle search input change
  const searchChangeHandler = (e) => {
    setSearchField(e.target.value);
  };

  let dressesToShowData = [];

  if (selectedCategory !== '' && selectedCategory !== 'all') {
    dressesToShowData = fetchedDressesData.filter((dress) => {
      return dress.category._id == selectedCategory;
    });
  } else {
    dressesToShowData = fetchedDressesData;
  }

  if (!searchField == '') {
    dressesToShowData = [...dressesToShowData].filter((dress) => {
      return dress.name.toLowerCase().includes(searchField.toLowerCase());
    });
    console.log(dressesToShowData);
  }

  const dressesArray = dressesToShowData.map((dress) => {
    return (
      <Dress
        key={dress._id}
        src={`/${dress.image}`}
        name={dress.name}
        price={dress.price}
        dressId={dress._id}
        category={dress.category.name}
        collection={dress.Dcollection.name}
        description={dress.description}
        setSelectedDressData={setSelectedDressData}
      />
    );
  });

  return (
    <main className='dresses-main'>
      <div className='top-header'>
        <Searchbar searchChangeHandler={searchChangeHandler} />
        <MuiSelect
          categories={categoriesData}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className='intro-section-one'>
        <p className='collection-title'>{location.state.collection_name}</p>
      </div>
      {/* <h1 className='underlined-design'>{location.state.collection_name}</h1> */}
      {showLoader && <Loader />}
      <div className='dresses-gallery'>{dressesArray}</div>
      {selectedDressData && (
        <DressDetails
          setSelectedDressData={setSelectedDressData}
          name={selectedDressData.name}
          price={selectedDressData.price}
          // category={selectedDressData.category}
          // collection={selectedDressData.collection}
          description={selectedDressData.description}
          src={selectedDressData.src}
        />
      )}
    </main>
  );
};

export default Dresses;
