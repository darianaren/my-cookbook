import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "../layout/Footer";
import CookBook from "../pages/UserCookbook";
import CreateRecipe from "../pages/CreateRecipe";
import Diets from "../pages/Diets";
import Error404 from "../pages/Error404";
import Login from "../pages/Login";
import MyProfile from "../pages/MyProfile";
import Recipe from "../pages/Recipe";
import Recipes from "../pages/Recipes";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import UpdateRecipe from "../pages/UpdateRecipe";

const RouterFunction = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Recipes />} />
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/diets' element={<Diets />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/recipes' element={<CookBook />} />
          <Route path='/create-recipe' element={<CreateRecipe />} />
          <Route path='/update-recipes' element={<UpdateRecipe />} />
        </Route>
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
};

export default RouterFunction;
