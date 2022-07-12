import { Link } from "react-router-dom";

import "./ProjectsList.scss";

export const Home = ({}) => {
  return (
    <section className="projects-list">
      <h1>Home</h1>
      <h2>
        <Link to="/projects">Projects</Link>
      </h2>
      <h2>Research</h2>
      <h2>Compounds</h2>
      <h2>Pathways</h2>
      <h2>Recipes</h2>
    </section>
  );
};
