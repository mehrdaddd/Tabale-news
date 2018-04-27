import React, { Component } from 'react';
import "./App.css";


const nex=[
    {name:"a"},
    {name:"b"}

];

const list= [
    {
        title: "react",
        url: "https:/facebook",
        author: "mehr",
        points: 4,
        bjectId:0,
    },
    {
        title: "redux",
        url: "https://github.com/",
        author:" ddan abramov",
        points: 5,
        bjectId:1,
    },
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list,
            nex
        };

        this.ml = [
            {aloh: "wwwww"},
            {aloh: "vvvv"}

        ];


    }
    render() {
        return (
            <div className="App">

                {this.state.list.map(item =>
                    <div key={item.objectID}>
                        <span>
                            <a href={item.url}>{item.title} </a>
                        </span>
                        <span>{item.author}</span>
                        <div>{item.points}</div>
                    </div>

                )}
                {this.state.nex.map(item =>
                    <div>{item.name} </div>
                )}
                {this.ml.map(item =>
                    <div>{item.aloh} </div>
                )}
                <span>
                    <button onClick={() => this.onDismiss(item.objectID)}
                            type="button"
                    >
                        Dismiss


                    </button>

                </span>



            </div>
        );
    }
}

export default App;
