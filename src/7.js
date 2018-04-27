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

        };



        this.onDismiss= this.onDismiss.bind(this);
    }

    onDismiss(id){
        const updatedList=this.state.list.filter(item => item.objectId !==id);

        this.setState({list: updatedList});
    }


    render() {
        return (
            <div className="App">

                {this.state.list.map(item =>
                        <div key={item.objectId}>
                        <span>
                            <a href={item.url}>{item.title} </a>
                        </span>
                            <span>{item.author}</span>
                            <div>{item.points}</div>

                            <span>
                    <button onClick={() => this.onDismiss(item.objectId)} type="button">
                        Dismiss


                    </button>

                </span>


                        </div>

                )}




            </div>
        );
    }
}

export default App;
