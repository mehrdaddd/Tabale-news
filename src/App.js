import React, { Component } from 'react';
import "./App.css";
import axios from 'axios';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';
//
const DEFAULT_QUERY= 'redux';
const DEFAULT_HPP = '10';
const PATH_BASE='https://hn.algolia.com/api/v1';
const PATH_SEARCH= '/search';
const PARAM_SEARCH= 'query=';
const PARM_PAGE= 'page=';
const PARAM_HPP = 'hitsPerPage=';

//const url= `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARM_PAGE}`;
//console.log(url);
const SORTS = {
    NONE : list => list,
    TITLE: list => sortBy(list ,'title'),
    AUTHOR: list => sortBy(list,'author'),
    POINTS: list => sortBy(list,'points').reverse() ,
};

const Loading =()=> <div> Loading ... </div>
const withLoading = (Component) => ({isLoading, ...rest}) =>
isLoading ? <Loading/> : <Component { ...rest} />

const Sort = ({ sortKey, activeSortKey, onSort, children}) =>{
    const sortClass = classNames(
      'button-inline',
        {'button-active': sortKey === activeSortKey}
    );
   return(
    <Button onClick={() => onSort(sortKey)}
    className = {sortClass}
    >
        {children}
    </Button>
   );
}

const updateSearchTopStoriesState = (hits , page) => (prevState) => {
    const { searchKey, results}= prevState ;

    const oldHits = results && results[searchKey]
        ? results[searchKey].hits : [];
    const updatedHits = [
        ...oldHits,
        ...hits
    ];
    return {
        results: {
            ...results,
            [searchKey]: {hits: updatedHits, page}
        },
        isLoading: false
    };
};
const large={width:"50%" };
//
class App extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
        };

        this.needToSearchTopStories = this.needToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);

    }

    needToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        this.setState({ isLoading: true});
        axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(result => this._isMounted && this.setSearchTopStories(result.data))
            .catch(error => this._isMounted && this.setState({error}));
    }

    componentDidMount() {
        this._isMounted = true;
        const {searchTerm} = this.state;

        this.setState( searchTerm => {
            const {searchKey} = searchTerm ;
            return { searchKey};
        });

        this.fetchSearchTopStories(searchTerm);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setSearchTopStories(result) {
        const {hits, page} = result;

    this.setState( updateSearchTopStoriesState( hits , page));
    }


    onSearch(event) {
        this.setState({searchTerm: event.target.value});

    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        if (this.needToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }
        event.preventDefault();

    }


    onDismiss(id) {
        const {searchKey, results} = this.state;
        const {hits, page} = results[searchKey];
        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);
        this.setState({
            results: {...results, [searchKey]: {hits: updatedHits, page}}
        });


    }

    render() {
        const {
            searchTerm,
            results,
            searchKey,
            error,
            isLoading
        } = this.state;

        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0;

        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
        ) || [];

        return (
            <div className="page">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearch}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search:
                    </Search>
                {error
                    ? <div className="interactions">
                        <p>somthing wrong </p>
                    </div>
                    : <Table
                        list={list}
                        onDismiss={this.onDismiss}
                    />
                }
                     <div className="interactions">
              <ButtonWithLoading isLoading={isLoading}
                    onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                        More
              </ButtonWithLoading>
            </div>
            </div>
        );
    }
}
//
const Search=({value,onChange,onSubmit,children}) =>
    <form onSubmit={onSubmit}>
        <input onSubmit={onSubmit}
               type= "text"
               value={value}
               onChange={onChange}
        />
        <button type="submit">
            {children}
        </button>
    </form>
//
class Table extends Component {

    constructor(props){
        super(props);
        this.state={
        sortKey: 'NONE',
        isSortReverse: false,
        };
        this.onSort = this.onSort.bind(this);
    }

    onSort(sortKey){
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({sortKey, isSortReverse});
    }


    render() {
        const {
            list,
            onDismiss
        } = this.props;

        const {
            sortKey,
            isSortReverse,
        }= this.state;

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

        return (
            <div className="table">
                <div className='table-header'>
            <span style={{width: '40%'}}>
                <Sort
                    sortKey={'TITLE'}
                    onSort={this.onSort}
                    activeSortKey={sortKey}
                >
                    Title
                </Sort>
            </span>
                    <span style={{width: '30%'}}>
                <Sort
                    sortKey={'AUTHOR'}
                    onSort={this.onSort}
                    activeSortKey={sortKey}
                >
                    Author
                </Sort>
            </span>

                    <span style={{width: '20%'}}>
                <Sort
                    sortKey={'POINTS'}
                    onSort= {this.onSort}
                    activeSortKey={sortKey}
                >
                    Points
                </Sort>
                    </span>



                </div>
                {reverseSortedList.map(item =>
                    <div key={item.objectId} className="table-row">
                        <span style={large}>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span style={{width: '20%'}}> {item.author}</span>
                        <span> {item.points}</span>
                        <span>
                            <Button
                                onClick={() => onDismiss(item.objectID)}
                                className="button-inline"
                            >
                               Dismiss
                            </Button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}
//
const Button= ({onClick,className, children}) =>
    <button
        onClick={onClick}
        className={className}
        type="button"
    >
        {children}
    </button>

//

const ButtonWithLoading= withLoading(Button);

//
Button.defaultProps={
    className: '',
};
//
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Table.propTypes= {
    list: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired,
};

Search.propTypes={
    value: PropTypes.string,
    onChange:  PropTypes.func,
    onSubmit:  PropTypes.func,
    children: PropTypes.node,
}
//
export default App;

export{
    Button,
    Search,
    Table,
    updateSearchTopStoriesState,
};