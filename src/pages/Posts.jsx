import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Posts() {
    const {id} = useParams();
    const[posts, setPosts] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[searchId, setSearchId] = useState(id)

    function onSearch() {
        fetchPosts(searchId)
    }
    async function fetchPosts(userId) {
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`)
        setPosts(data);
    }
    useEffect(()  => {
        fetchPosts();
        setIsLoading(false)
    }, [])
  return (
    <>
      <div className="post__search">
            <button>← Back</button>
            <div className="post__search--container">
            <label className="post__search--label">Search by Id</label>
            <input
                type="number"
                value={searchId}
                onChange={(event) => setSearchId(event.target.value)}
                onKeyPress={(event) => 
                    // if (event.key === 'Enter') {
                    //     onSearch()
                    // }
                    console.log(event.key)
                }
            />
            <button onClick={() => onSearch()}>Enter</button>
            </div>
        </div>
        {isLoading? 
            new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
                <div className="post__title">
                <div className="post__title--skeleton"></div>
                </div>
                <div className="post__body">
                <p className="post__body--skeleton"></p>
                </div>
            </div>
            )
        ) : (
        posts.map(post =>                 
            <div className="post" key={post.id}>
                <div className="post__title">{post.title}</div>
                <p className="post__body">{post.body}</p>
            </div>
        )
        )}

    </>
  )
}

