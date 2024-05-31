import React, { useState } from "react";
import "./adminPage.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AnimeAdmin from "../animeAdmin/AnimeAdmin";
import AddAnime from "../addAnime/AddAnime";

function AdminPage() {
  const [content, setContent] = useState(true);

  return (
    <div className="adminPage">
      <Navbar />
      <div className="btn">
        <button
          className="changeContent"
          onClick={() => {
            setContent(!content);
          }}
        >
          {content ? "Add Anime" : "Manage Anime"}
        </button>
      </div>

      {content ? <AnimeAdmin /> : <AddAnime />}
      <Footer />
    </div>
  );
}

export default AdminPage;
