import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import "../Blog/BlogDetail.css";
import { MainContext, useContext } from "../../components/Context";

const BlogDetail = () => {
  const { URLAPI, lang } = useContext(MainContext); 
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${URLAPI}/api/blogs/${id}?lang=${lang}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlog(data); 
      } catch (error) {
        setError(error);
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id, URLAPI, lang]);

  if (error) {
    return <div>Error loading blog details. Please try again later.</div>;
  }

  if (!blog) {
    return <div>Yüklənir...</div>;
  }

  return (
    <div className="blogDetail container">
      <div className="img">
        {blog.image ? <img src={blog.image} alt={blog.title} /> : <p>No image available</p>}
      </div>
      <div className="blog-detail-center">
        <h3 className="blog-title">{blog.title}</h3>
        <span className="blog-date">{new Date(blog.created_at).toLocaleDateString()}</span> 
        <p className="blog-content">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
