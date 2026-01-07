import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import Single from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path="/">
      <Route element={<Home />} path="/" />
      <Route element={<Single />} path="/single/:type/:theid" />
      <Route element={<Demo />} path="/demo" />
      <Route element={<h1>Not found!</h1>} path="*" />
    </Route>
  )
);