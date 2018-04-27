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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list,

        };



        this.onDismiss= this.onDismiss.bind(this);
        this.onDiss= this.onDiss.bind(this);

        this.onClickme=()=> {
            console.log(this);
        }
    }

    onDismiss(id){



        const updatedLis=this.state.list.filter(item => item.objectId !==id);

        this.setState({list: updatedLis});
    }

    onDiss() {
        const updatedLis=this.state.list.map(  item =>
            item.points + 1


        )
        this.setState({list: updatedLis});
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
                            <span>
                    <button onClick={() => this.onDiss(item.objectId)}
                            type="button">
                       BBB
                    </button>
                </span>



                        </div>

                )}




            </div>
        );
    }
}

export default App;
