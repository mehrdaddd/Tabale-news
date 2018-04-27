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
const large={width:"50%" };
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
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearch}>
                        Search:
                    </Search>
                </div>
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