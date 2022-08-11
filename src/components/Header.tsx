import { Link } from "react-router-dom";

import vinniBackground from "../images/vinni-background.svg";
import vinniJaw from "../images/vinni-jaw.svg";
import vinniNoJaw from "../images/vinni-no-jaw.svg";

import "./Header.scss";

export const Header = () => {
  return (
    <header className="application-header">
      <section className="vinni-section">
        <div className="brand-container">
          <h1 className="title-font">
            <Link to="/">Vinni</Link>
          </h1>
        </div>
        <div className="speech-container">
          <p className="speech-bubble">
            It looks like you're trying to survive capitalism. Maybe I can help.
          </p>
        </div>
        <div className="vinni-container">
          <img className="vinni-background" src={vinniBackground} alt="" />
          <img className="vinni-head" src={vinniNoJaw} alt="" />
          <img className="vinni-jaw talking" src={vinniJaw} alt="" />
        </div>
      </section>
    </header>
  );
};
