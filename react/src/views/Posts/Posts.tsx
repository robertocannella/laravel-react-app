
import React, {useEffect, useState} from "react";
import PostsService from "../../services/PostsService";
import ButtonHTML from "../../components/html-components/ButtonHTML";
import TableHTML from "../../components/html-components/TableHTML";
import Modal from "../../components/alerts/Modal/Modal";
import {IPost, Post} from "./IPost";



export default function Posts () {
    let axiosService = new PostsService();
    const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isConfirmDeleteModalVisible, setConfirmDeleteModalVisibility] = useState(false);
    const [isSuccessDeleteModalVisible, setSuccessDeleteModalVisibility] = useState(false);

    useEffect(()=>{
        getPosts();

    },[])

    const getPosts = () => {
        setIsLoading(true);

        axiosService.getPosts()
            .then((resp)=>{

                setPosts(resp.data.data);
                setIsLoading(false);
            }).catch(()=>{
            setIsLoading(false);
        });

    }
    const confirmDelete = (post:IPost | any) =>  {

        setConfirmDeleteModalVisibility(true);
        setSelectedPost(post)

    }
    const cancelDelete = () => {

        setConfirmDeleteModalVisibility(false);
        setSelectedPost(null);
    }
    const handleDismiss = () => {
        setSuccessDeleteModalVisibility(false);
        setSelectedPost(null);
    }

    const handleDelete = () => {
        setIsLoading(true);
        setConfirmDeleteModalVisibility(false);

        axiosService.removePost(selectedPost!.id)
            .then((res)=>{

                setIsLoading(false);
                /*
                *  To maintain pagination, we need to get the updated list from the server
                *  Here we can't just filter out the deleted user and remove it from the DOM
                *
                */
                // setUsers(users.filter(user => user.id !== selectedUser!.id));
                getPosts();
                setSuccessDeleteModalVisibility(true);
            })
            .catch((err)=>{
                setIsLoading(false)
                console.log(err)
            })

    }
    return (
        <div>
            <Modal onConfirm={handleDelete} onCancel={cancelDelete} type="danger" title={"Confirm delete."} visibility={isConfirmDeleteModalVisible}>
                <p className={"text-base leading-relaxed"}>Are you sure you want to delete this entry?</p>
                <p className={"text-base loading-relaxed"}> {selectedPost?.title} </p>
            </Modal>
            <Modal onConfirm={handleDismiss}  type="success" title={"Delete successful."} visibility={isSuccessDeleteModalVisible}>
                <p className={"text-base leading-relaxed"}>The user has been removed</p>
                <p className={"text-base loading-relaxed"}> {selectedPost?.title} </p>
            </Modal>
            <div style={{display:'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Post</h1>
                {isLoading ? "Loading...": ""}
                <ButtonHTML text={"Add New"} id={"add-new"} linkTo={"/posts/new"}/>
            </div>
            <TableHTML onDelete={(ev)=>confirmDelete(ev)} slug={'/posts/'} fields={['id','title','excerpt']} content={posts} headings={["Title","Excerpt","Actions"]}/>
        </div>
    );
}


