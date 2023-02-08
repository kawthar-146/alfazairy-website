import './Searchbar.css';
import { ReactComponent as SearchIcon } from '../assets/search.svg';

const Searchbar = (props) => {
  return (
    <div className='wrapper'>
      <div className='searchBar'>
        <input
          id='searchQueryInput'
          type='search'
          name='searchQueryInput'
          placeholder="Search by dress's name"
          onChange={props.searchChangeHandler}
        />
        <button id='searchQuerySubmit' name='searchQuerySubmit'>
          {' '}
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
