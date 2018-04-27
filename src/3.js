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
                    return (
                        <div key={item.objectID}>
                      <span>
                          <a href={item.url}>{item.title} </a>
                      </span>
                            <span>{item.author}</span>
                            <span>{item.points}</span>
                            <div>{item.author}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default App;
