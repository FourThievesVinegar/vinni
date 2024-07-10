import { ProjectsList } from "./ProjectsList";

import vinniBackground from "../images/vinni-background.svg";
import vinniJaw from "../images/vinni-jaw.svg";
import vinniNoJaw from "../images/vinni-no-jaw.svg";

export const Home = () => {
  return (
    <section className="home-page">
      <section className="vinni-section">
        <div className="vinni-counter-spacer" />
        <div className="speech-container">
          <p className="speech-bubble" role="button">
            It looks like you're trying to survive capitalism. <br /> Maybe I
            can help...
          </p>
        </div>
        <div className="vinni-container">
          <img className="vinni-background" src={vinniBackground} alt="" />
          <img className="vinni-head" src={vinniNoJaw} alt="" />
          <img className="vinni-jaw talking" src={vinniJaw} alt="" />
        </div>
      </section>
      <section>
        <ProjectsList />
      </section>
    </section>
  );
};
