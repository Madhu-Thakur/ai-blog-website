import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BlogContext } from "../context/BlogContext";
import "../styles/modal.css";

function BlogModal() {
  const { addBlog, updateBlog, editingBlog, closeModal } =
    useContext(BlogContext);

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingBlog) {
      setImageUrl(editingBlog.imageUrl || "");
      setTitle(editingBlog.title);
      setDescription(editingBlog.description);
    }
  }, [editingBlog]);

  const submitHandler = () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and Description are mandatory");
      return;
    }

    const blog = {
      id: editingBlog ? editingBlog.id : Date.now(),
      title,
      description,
      imageUrl,
    };

    editingBlog ? updateBlog(blog) : addBlog(blog);
  };

  return ReactDOM.createPortal(
    <div className="modal">
      <h3>{editingBlog ? "Edit Blog" : "Add New Blog"}</h3>
      
      <input
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <input
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Blog Description *"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="actions">
        <button onClick={submitHandler}>
          {editingBlog ? "Update Blog" : "Post Blog"}
        </button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default BlogModal;
