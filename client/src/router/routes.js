import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import { useRoutes } from "react-router-dom";

const routes = [
  {
    path: "/userprofile",
    component: lazy(() => import("../pages/UserProfile")),
  },
  {
    path: "/sdkmanagement",
    component: lazy(() => import("../pages/SDKManagement")),
  },
  {
    path: "/dashboards",
    component: lazy(() => import("../pages/Dashboards")),
  },
  {
    path: "/conditions",
    component: lazy(() => import("../pages/Conditions")),
  },
];

const withRoutes = (routes) => {
  const result = [];
  routes.forEach((item) => {
    const { component: Comp, children, ...reset } = item;
    const route = {
      ...reset,
      element: (
        <Suspense fallback={<Loading />}>
          <Comp />
        </Suspense>
      ),
      ...(Array.isArray(children) && children.length > 0 && { children: withRoutes(children), }),
    };
    result.push(route);
  });
  return result;
};

const Routes = () => useRoutes(withRoutes(routes));

export default Routes;
