import React, { Component } from 'react';
import "./App.css";

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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
            searchTerm: ''
        };
        this.nSearch=this.nSearch.bind(this);
    }

    nSearch(event){
        this.setState({searchTerm: event.target.value});
    }


    render() {
        const {searchTerm ,list }=this.state;
        return (
            <div className="App">
                <form>
                    <input type="text"
                           value={searchTerm}
                           onChange={this.nSearch}
                    />
                </form>


                {this.state.list.filter(isSearched(searchTerm)).map(item =>
                    <div key={item.objectId}>

                        <a >{item.points} </a>


                    </div>
                )}

            </div>
        );
    }
}


export default App;