import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import {useOutletContext, useParams, useNavigate} from 'react-router-dom';

const CreatePost = () => {
    const params = useParams();
    const navigate = useNavigate();
  
    const { userInfo, authToken } = useOutletContext();
    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;

    const [apiKey, setAPIKey] = useState('')
    const[formData, setFormData] = useState('');
    const [title, setTitle] = useState('');
    
    useEffect(() => {
        fetchEditorAPIKey();
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
        .then(res => setAPIKey(res.key))
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
        <div>
            <form onSubmit={onSubmit}>
                <input name='title' type='text' placeholder="title" onChange={onTitleChange} value={title}></input>
                <Editor apiKey={apiKey} onChange={onTextChange}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default CreatePost;