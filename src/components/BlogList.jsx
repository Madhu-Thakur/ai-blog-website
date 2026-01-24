import { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { generateSummary } from "../ai/summary";
import { getReadability } from "../ai/readability";
import "../styles/blog.css";

function BlogList() {
  const { blogs, openEditModal, deleteBlog } =
    useContext(BlogContext);

  const [summary, setSummary] = useState({});
  const [readability, setReadability] = useState({});
  const [loadingSummary, setLoadingSummary] = useState({});
  const [loadingReadability, setLoadingReadability] = useState({});

  const handleGenerateSummary = async (blogId, description) => {
    setLoadingSummary(prev => ({ ...prev, [blogId]: true }));
    try {
      const result = await generateSummary(description);
      setSummary(prev => ({ ...prev, [blogId]: result }));
    } catch (error) {
      setSummary(prev => ({ ...prev, [blogId]: "Error generating summary" }));
    } finally {
      setLoadingSummary(prev => ({ ...prev, [blogId]: false }));
    }
  };

  const handleGetReadability = async (blogId, description) => {
    setLoadingReadability(prev => ({ ...prev, [blogId]: true }));
    try {
      const result = await getReadability(description);
      setReadability(prev => ({ ...prev, [blogId]: result }));
    } catch (error) {
      setReadability(prev => ({ ...prev, [blogId]: "Error analyzing readability" }));
    } finally {
      setLoadingReadability(prev => ({ ...prev, [blogId]: false }));
    }
  };

  return (
    <div className="blog-container">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <h3>{blog.title}</h3>

          {blog.imageUrl && <img src={blog.imageUrl} />}

          <p>{blog.description}</p>

          <button onClick={() => openEditModal(blog)}>Edit Blog</button>
          <button onClick={() => deleteBlog(blog.id)}>Delete Blog</button>

          <div className="ai">
            <button
              onClick={() => handleGenerateSummary(blog.id, blog.description)}
              disabled={loadingSummary[blog.id]}
            >
              {loadingSummary[blog.id] ? "Generating..." : "AI Summary"}
            </button>

            <button
              onClick={() => handleGetReadability(blog.id, blog.description)}
              disabled={loadingReadability[blog.id]}
            >
              {loadingReadability[blog.id] ? "Analyzing..." : "AI Readability"}
            </button>
          </div>

          {summary[blog.id] && (
            <p><b>Summary:</b> {summary[blog.id]}</p>
          )}

          {readability[blog.id] && (
            <p><b>Readability:</b> {readability[blog.id]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default BlogList;
