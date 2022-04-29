import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import {useOutletContext,useNavigate} from 'react-router-dom';
import { CreatePostContainer, CreatePostForm, PageTitle } from './create-post-styles';

const CreatePost = () => {
    const navigate = useNavigate();
  
    const { userInfo, authToken } = useOutletContext();
    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;

    const[formData, setFormData] = useState('');
    const [title, setTitle] = useState('');
    
    useEffect(() => {
        if(!user) {
            navigate("/")
        }
    }, [])

    const onTextChange = (e) => {
        setFormData(e.target.getContent())
    }

    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const fetchEditorAPIKey = () => {
        fetch("/auth/tinyMCE/apikey", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            }
        })
        .then(res => res.json())
        .then(res => {
            const key = res.key
            return key
        })
    };

    const onSubmit = (e) => {
        fetch('/posts/create', {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({title: title, text: formData})
        })
        .then(res => {
            if(res.ok) {
                navigate('/')
                return
            }
            //Error Submiting
        })
    }

    return(
        <CreatePostContainer>
            <PageTitle>Create New Post</PageTitle>
            <CreatePostForm onSubmit={onSubmit}>
                Title:
                <input name='title' type='text' placeholder="Title" onChange={onTitleChange} value={title}></input>
                <Editor apiKey={fetchEditorAPIKey()} onChange={onTextChange} init={{width: "100%", min_height: "40rem", plugins: "autoresize"}}/>
                <button type='submit'>Submit</button>
            </CreatePostForm>
        </CreatePostContainer>
    )
}
export default CreatePost;