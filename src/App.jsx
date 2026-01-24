import { useContext } from "react";
import { BlogContext } from "./context/BlogContext";
import BlogList from "./components/BlogList";
import BlogModal from "./components/BlogModal";
import Backdrop from "./components/Backdrop";
import "./styles/app.css";

function App() {
  const { openAddModal, isModalOpen, closeModal } = useContext(BlogContext);

  return (
    <div className="app">
      <h1>Blog Website</h1>
      <button onClick={openAddModal}>Add New Blog</button>
      {/* <hr /> */}
 <BlogList />
      {isModalOpen && <Backdrop onClose={closeModal} />}
      {isModalOpen && <BlogModal />}
    </div>
  );
}

export default App;
