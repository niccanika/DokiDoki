import { useContext, useState } from "react";
import "./App.scss";
import Home from "./pages/home/Home";
import AnimeDetail from "./pages/animeDetail/AnimeDetail";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import AddAnime from "./pages/addAnime/AddAnime";
import AnimeAdmin from "./pages/animeAdmin/AnimeAdmin";
import AdminPage from "./pages/adminPage/AdminPage";
import UserProfile from "./pages/userProfile/UserProfile";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate replace to="/register" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate replace to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate replace to="/" />}
          />
          <Route
            path="/movies"
            element={
              user ? (
                <Home type="movies" />
              ) : (
                <Navigate replace to="/register" />
              )
            }
          />
          <Route
            path="/series"
            element={
              user ? (
                <Home type="series" />
              ) : (
                <Navigate replace to="/register" />
              )
            }
          />
          <Route
            path="/animeDetail/:animeID"
            element={
              user ? <AnimeDetail /> : <Navigate replace to="/register" />
            }
          />
          <Route
            path="/addAnime"
            element={user ? <AddAnime /> : <Navigate replace to="/register" />}
          />
          <Route
            path="/animeAdmin"
            element={user ? <AdminPage /> : <Navigate replace to="/register" />}
          />
          <Route
            path="/profile"
            element={
              user ? <UserProfile /> : <Navigate replace to="/register" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
