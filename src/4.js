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

                {list.map(item =>{


                    <span>
                          <a href={item.url}>{item.title} </a>


                      </span>
                    return(2)


                } )}
            </div>
        );
    }
}

export default App;
