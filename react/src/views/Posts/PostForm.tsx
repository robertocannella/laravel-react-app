import {Link, useNavigate, useParams} from "react-router-dom";
import {BaseSyntheticEvent, useContext, useEffect, useState} from "react";
import {IPost, Post} from "./IPost";
import PostsService from "../../services/PostsService";
import {FormTextInput} from "../../components/form-components/FormTextInput";
import FormSubmitButton from "../../components/form-components/FormSubmitButton";
import FormWindow from "../../components/form-components/FormWindow";
import {ThemeContext} from "../../contexts/ThemeContext";
import FormTextArea from "../../components/form-components/FormTextArea";


export default function PostForm () {
    const axiosService = new PostsService();
    const {theme} = useContext(ThemeContext);
    const {id} = useParams();
    const [selectedPost, setSelectedPost] = useState<IPost>(new Post());
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);     /* State to manage errors               */

    const navigate = useNavigate();

    const getPost = (id:string) =>{
        setIsLoading(true);
        axiosService.getPostById(id).then(resp=>{
            setSelectedPost(resp.data.data)
            setIsLoading(false)
        }).catch(()=>{
            setIsLoading(false);
        });

    }

    if (id){
        useEffect(()=>{
            getPost(id)
        },[])

    }
    const updateForm = (event:any) =>{

        setSelectedPost({
            ...selectedPost as IPost, [event.target.name]: event.target.value
        })
    }

    const onSubmit = (ev:BaseSyntheticEvent)=>{
        ev.preventDefault();        /* prevent page refresh */


        if (selectedPost.id) {

            let payload = selectedPost;

            axiosService.updatePost(selectedPost.id, payload)
                .then((resp)=>{
                    navigate('/posts')
                    // TODO: SHOW NOTIFICATION
                }).catch((error)=>{
                    const response = error.response;
                    if (response && response.status === 422) { // Validation Error
                        setErrors(response.data.errors);
                    }

            })
        }else {

            // These fields need to match Laravel Backend
            const payload ={
                title: selectedPost.title,
                excerpt: selectedPost.excerpt,
                body: selectedPost.body,
                published_at: new Date()
            }

            axiosService.createPost(payload)
                .then((resp)=>{
                    navigate('/posts')
                    // TODO: SHOW NOTIFICATION
                }).catch((error)=>{
                    const response = error.response;
                    if (response && response.status === 422) { // Validation Error
                        setErrors(response.data.errors);
                    }
            })
        }
    }
    return (
        <>
            {isLoading ? "Loading...": ""}
            {!isLoading &&
                <FormWindow containsTextArea={true} title={selectedPost.id ? `Update post ${selectedPost.title}` : 'Create new post.'}>
                    {errors &&

                        <div role="alert  rounded-lg">
                            {Object.keys(errors).map(key => (
                                <div  key={errors} className="px-3 bg-red-100 py-1 text-red-700">
                                    <p> {errors[key][0]}</p>
                                </div>
                            ))}
                        </div>
                    }

                    <form onSubmit={onSubmit} className={theme + ' p-6 rounded-b-lg'}>
                        <div className="w-full md:w-2/3 px-0 mb-6 md:mb-0">

                            <FormTextInput name={"title"} updateForm={(e: BaseSyntheticEvent) => updateForm(e)}
                                           id="title" text="Title" inputValue={selectedPost.title}/>
                            <FormTextInput name={"excerpt"} updateForm={(e: BaseSyntheticEvent) => updateForm(e)}
                                           id="excerpt" text="Excerpt" inputValue={selectedPost.excerpt}/>

                        </div>

                        <FormTextArea name={"body"} updateForm={(e=>updateForm(e))} defaultValue={selectedPost.body}/>



                        <FormSubmitButton text={"Save"} id={"save"}/>
                    </form>
                </FormWindow>
            }

        </>
    );
}
