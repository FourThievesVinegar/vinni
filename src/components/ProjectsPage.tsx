import { Outlet } from "react-router-dom";

import "./ProjectsPage.scss";

export const ProjectsPage = () => {
  return (
    <>
      <section className="projects-page">
        <Outlet />
      </section>
    </>
  );
};
