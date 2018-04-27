import React, { Component } from 'react';
import "./App.css";

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
    render() {

        return (

            <div className="App">

                {list.map(function (item) {
                    return <div> {item.title}</div>
                })}
            </div>
        );
    }
}

export default App;
