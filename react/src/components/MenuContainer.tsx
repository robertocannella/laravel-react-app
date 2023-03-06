import{ Component } from "react";
import MenuButton from "./MenuButton";
import {Menu} from "./Menu";
import {DefaultMenu} from "./DefaultMenu";


type MyProps = {

};
type MyState = {
    visible: boolean; // like this

};


class MenuContainer extends Component<MyProps,MyState> {
    constructor(props:any, context: any) {
        super(props, context);

        this.state = {
            visible: false
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }
    handleMouseDown(e:any) {
        this.toggleMenu();

        e.stopPropagation();
    }
    render() {

        return (
        <>
            <MenuButton handleMouseDown={(e:any)=> this.handleMouseDown(e)}/>
            <DefaultMenu handleMouseDown={this.handleMouseDown}
                  menuVisibility={this.state.visible}/>
        </>
        );
    }
}

export default MenuContainer;
