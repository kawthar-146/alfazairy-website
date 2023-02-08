import { Fragment } from 'react';
import Intro from '../components/intro/intro';
import ReviewCard from '../components/reviewcard/reviewcard';
import user1 from '../components/assets/user1.jpg';
import user2 from '../components/assets/user2.jpg';
import user3 from '../components/assets/user3.jpg';
import './aboutus.css';

const Aboutus = () => {
  return (
    <Fragment>
      <Intro />
      <p className='intro-header'>Our client reviews</p>
      <div className='reviewcard-container'>
        <ReviewCard
          image={user1}
          name='Lorem,ipsum dolor.'
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aspernatur asperiores porro.'
        />
        <ReviewCard
          image={user2}
          name='Lorem,ipsum dolor.'
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aspernatur asperiores porro.'
        />
        <ReviewCard
          image={user3}
          name='Lorem,ipsum dolor.'
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aspernatur asperiores porro.'
        />
      </div>
    </Fragment>
  );
};

export default Aboutus;
