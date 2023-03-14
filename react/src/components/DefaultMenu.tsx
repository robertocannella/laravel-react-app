import React, {Component, useContext} from "react";
import {IThemeContext, ThemeContext} from "../contexts/ThemeContext";
import {Link} from "react-router-dom";

interface MyProps {
    menuVisibility: boolean
    handleMouseDown: (e:any)=> void;
}

export class DefaultMenu extends Component<MyProps> {
    static contextType = ThemeContext;
    declare context: React.ContextType<typeof ThemeContext>;

    componentDidMount() {

        console.log(this.context.theme ) // { name: 'Tania', loggedIn: true }
    }
    render() {
        let visibility = "hide";

        if (this.props.menuVisibility) {
            visibility = "show";
        }

        return (
            <div id="flyoutMenu"
                 onMouseDown={this.props.handleMouseDown}
                 className={visibility}>
                <aside>
                    <Link to={'/dashboard'}  className={this.context.theme}>Dashboard</Link>
                    <Link to={'/users'} className={this.context.theme}>Users</Link>
                    <Link to={'/posts'} className={this.context.theme}>Posts</Link>
                </aside>

            </div>
        );
    }
}
