import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./Pagination";
import Posts from "./Posts";

const App = () => {

  const [post, setPost] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const fetchAPI = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
       
          console.log(response.data);
          setPost(response.data);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
    <h1 className='text-primary mb-3'>My Blog</h1>
    <Posts posts={currentPosts} />
    <Pagination
      postsPerPage={postsPerPage}
      totalPosts={post.length}
      paginate={paginate}
    />
    <p>https://github.com/bradtraversy/simple_react_pagination</p>
  </div>
  );
};

export default App;
