import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuthCheck from "@shared/hooks/useCheckAuth";
import { authRoutes, publicRoutes } from "./routes";
import { useAppSelector } from "@shared/hooks";
import { MAIN_ROUTE } from "./consts";
const AppRouter: React.FC = () => {
  const { isLoading } = useAuthCheck();
  const isAuth = useAppSelector((state) => state.user.auth);
  if (isLoading) {
    return <div>Loading... {isAuth}</div>;
  }
  return (
    <div className="wrapper">
      <Router>
        {isAuth !== null && (
          <Routes>
            {isAuth &&
              authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            {publicRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};

export default AppRouter;
