import React, { Component } from 'react';
import "./App.css";
//
const list= [
    {
        title: "react",
        url: "https:/facebook",
        author: "mehr",
        points: 4,
        objectId:0,
    },
    {
        title: "redux",
        url: "https://github.com/",
        author:" ddan abramov",
        points: 5,
        objectId:1,
    },
];

const isSearched = searchTerm => m => m.title.includes(searchTerm);
//
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
            searchTerm: ''
        };
        this.onSearch=this.onSearch.bind(this);
        this.onDismiss= this.onDismiss.bind(this);
    }

    onSearch(event){
        this.setState({searchTerm: event.target.value});
    }

    onDismiss(id){
        const updatedList=this.state.list.filter(item => item.objectId !==id);
        this.setState({list: updatedList});
    }

    render() {
        const {searchTerm ,list }=this.state;
        return (
            <div className="App">
                <Search
                    value={searchTerm}
                    onChange={this.onSearch}>
                    Search:
                </Search>
                <Table
                    list={list}
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
    <div>
        {list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectId}>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                <span> {item.author}</span>
                <span> {item.points}</span>
                <span>
                            <button onClick={() => onDismiss(item.objectId)}>
                               Dismiss
                            </button>
                        </span>
            </div>
        )}
    </div>


//
const button= ({onClick,className='', children,}) =>


    <button
        onClick={onClick}
        className={className}
        type="button"
    >
        {children}
    </button>


//
export default App;