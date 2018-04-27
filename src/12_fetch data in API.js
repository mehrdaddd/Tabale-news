import React, { Component } from 'react';
import "./App.css";
//
const DEFAULT_QUERY= 'redux';
const PATH_BASE='https://hn.algolia.com/api/v1';
const PATH_SEARCH= '/search';
const PARAM_SEARCH= 'query=';
const url= `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);
const isSearched = searchTerm => m => m.title.includes(searchTerm);
const large={width:"50%" };
//
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result:null,
            searchTerm: DEFAULT_QUERY,
        };
        this.setSearchTopStories=this.setSearchTopStories.bind(this);
        this.onSearch=this.onSearch.bind(this);
        this.onDismiss= this.onDismiss.bind(this);
    }


    componentDidMount(){
        const {searchTerm}= this.state;
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)

            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    setSearchTopStories(result){
        this.setState({result});
    }

    onSearch(event){
        this.setState({searchTerm: event.target.value});
    }

    onDismiss(id){
        const updatedList=this.state.list.filter(item => item.objectId !==id);
        this.setState({list: updatedList});
    }

    render() {
        const {searchTerm ,result }= this.state;
        if (!result){return null;}
        console.log(this.state);
        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearch}>
                        Search:
                    </Search>
                </div>
                <Table
                    list={result.hits}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />

            </div>
        );
    }
}
//
const Search=({value,onChange,children}) =>

    <form>
        {children}<input
        type="text"
        value={value}
        onChange={onChange}
    />

    </form>

//

const Table = ({list, pattern, onDismiss}) =>
    <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectId} className="table-row">
                        <span style={large}>
                            <a href={item.url}>{item.title}</a>
                        </span>
                <span style={{width:'20%'}}> {item.author}</span>
                <span> {item.points}</span>
                <span>
                            <Button
                                onClick={() => onDismiss(item.objectId)}
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