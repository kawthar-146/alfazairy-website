import React, { Fragment } from 'react';
import './coverdress.css';
import img2020 from '../assets/nancy2020.jpg';
import img2021 from '../assets/nour20201.jpg';
import img2022 from '../assets/homepage3.jpg';
import pink from '../assets/pink.jpg';

const Coverdress = () => {
  return (
    <Fragment>
      {/* <div className="cover-dress-container">
        <div className="container-1">
          <div className="cover-section-1">
            <div className="image-container">
              <img className="image-2020" src={img2020} alt="" />
            </div>
            <div className="text-container">
              <p>Dummy Text tittle</p>
              <br></br>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi atque nemo fugit iusto blanditiis nulla dicta
                similique eos amet deleniti?
              </p>
            </div>
          </div>
        </div>
        <div className="cover-section-2">
          <div className="image-container">
            <img className="image-2020" src={img2021} alt="" />
          </div>
          <div className="text-container">
            <p>Dummy Text tittle</p>
            <br></br>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              atque nemo fugit iusto blanditiis nulla dicta similique eos amet
              deleniti?
            </p>
          </div>
        </div>
      </div> */}
      <div class='container' style={{ backgroundImage: `url(${pink})` }}>
        <div className='text-box'>
          <p>
            Selecting a wedding dress is more than just a fitting.
            <span>it's a memory..</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Coverdress;
