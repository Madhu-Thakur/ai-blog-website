import { createContext, useState } from "react";

export const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const openAddModal = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, blog]);
    closeModal();
  };

  const updateBlog = (blog) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === blog.id ? blog : b))
    );
    closeModal();
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        isModalOpen,
        editingBlog,
        openAddModal,
        openEditModal,
        closeModal,
        addBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
