
import {ThemeContext} from "../../contexts/ThemeContext";
import React, {BaseSyntheticEvent, Component, ReactNode} from "react";
import {Link} from "react-router-dom";


type TableHTMLProps = {
    title?: string;     // A table title
    caption?: string;   // A table caption
    fields: any[];      // This is the object field         (must be same size as below)
    headings: any[]     // Place the heading labels here    (must be same size as above)
    content: any[]         // Pass the whole object here
    slug: string        // The base slug for all links in this table. i.e. /users/
    children?: ReactNode
    onDelete: (ev: BaseSyntheticEvent) => void
}


type TableHTMLState = {
    text: string;
    id: string;
    children?: ReactNode
}
class TableHTML extends Component<TableHTMLProps, TableHTMLState> {
    static contextType = ThemeContext;
    declare context: React.ContextType<typeof ThemeContext>;

    constructor(props: TableHTMLProps) {
        super(props);

    }
    componentDidMount() {
        this.setState((state)=>({
            text: "button"
        }))


    }

    render() {

        let filteredArray:any = [];
        this.props.content.forEach((obj: any)=>{
                let extractedObject = {}
                this.props.fields.forEach((field:any)=> {
                   extractedObject = {...extractedObject, [field]: obj[field]}
                })
            filteredArray.push({...extractedObject})
            extractedObject={}
        })



        return (
            <div className="shadow-sm overflow-hidden rounded-lg my-4">

            <table className={this.context.theme + " w-full text-sm"}>
                <thead >
                    <tr>
                {this.props.headings.map((heading:any,index: number)=>(
                        <th scope="col" key={index} className=" pt-2 dark:border-slate-600 font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">{heading}</th>
                ))}
                    </tr>

                </thead>
                <tbody className={this.context.theme + " bg-white dark:bg-slate-800"}>

                    {filteredArray.map((anyObject:any)=>(
                         <tr key={anyObject.id}>
                            {Object.keys(anyObject).filter(key=>{return (key) != 'id'}).map((key,index)=>(
                                <td key={index} className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{anyObject[key]}</td>
                          ))}
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                <Link to={this.props.slug + anyObject.id}><i className="fa-solid fa-pencil"></i></Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="" onClick={(ev)=>this.props.onDelete(anyObject)}><i className="fa-solid fa-trash "></i></button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            </div>
        );
    }
}

export default TableHTML;
