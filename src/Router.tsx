import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import DefaultLayout from "./layoutes/DefaultLayout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/react-time-ignite" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
};

export default Router;
