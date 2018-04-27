import React, { Component } from 'react';

class App extends Component {
    render() {
        var x= {
            first: "mm",
            last:"ttt",
            hight: 24,
            width: 2,
            compx: function(){
                return this.first+ this.last;
            }

        }


        return (

            <div className="App">



                <h2>{x.compx()}</h2>

            </div>
        );
    }
}

export default App;
