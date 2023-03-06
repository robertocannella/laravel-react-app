import React, { Component } from "react";


interface MyProps {
    handleMouseDown: (e:any)=>void;
};
interface MyState {
    count: number;

};

class MenuButton extends Component<MyProps, MyState>  {
    render() {
        return (
            <button id="roundButton"
                    onMouseDown={this.props.handleMouseDown}></button>
        );
    }
}

export default MenuButton;
