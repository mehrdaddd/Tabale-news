import React, { Component } from 'react';
import "./App.css";
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

const large={width:"50%" };
//
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
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
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => this.setState({error}));
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }

    setSearchTopStories(result) {
        const {hits, page} = result;
        const {searchKey, results} = this.state;
        const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
        const updatedHits = [
            ...oldHits,
            ...hits
        ];
        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            }
        });
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
            error
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
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearch}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search:
                    </Search>
                </div>
                {error
                    ? <div className="interactions">
                        <p>somthing wrong </p>
                    </div>
                    : <Table
                        list={list}
                        onDismiss={this.onDismiss}
                    />
                }
                <div className={'interaction'}>
                    <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)
                    }>
                        More
                    </Button>
                </div>
            </div>
        );
    }
}
//
const Search=({value,onChange,onSubmit,children}) =>
    <form onSubmit={onSubmit}>
        <input onSubmit={onSubmit}
               type="text"
               value={value}
               onChange={onChange}
        />
        <button type="submit">
            {children}
        </button>
    </form>
//
const Table = ({list, onDismiss}) =>
    <div className="table">
        {list.map(item =>
            <div key={item.objectID} className="table-row">
                        <span style={large}>
                            <a href={item.url}>{item.title}</a>
                        </span>
                <span style={{width:'20%'}}> {item.author}</span>
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
//
const Button= ({onClick,className='', children,}) =>
    <button
        onClick={onClick}
        className={className}
        type="button"
    >
        {children}
    </button>
//
export default App;