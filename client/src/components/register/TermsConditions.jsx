import { icons } from "../../utils/helpers/assets";

import style from "./termsConditions.module.css";

const TermsAndConditions = ({ isOpen, close }) => {
  const containerHandler = (e) => e.stopPropagation();

  return (
    <article
      className={`${style["modal"]} ${isOpen && style["is-open"]}`}
      onClick={close}
    >
      <div className={style["container"]} onClick={containerHandler}>
        <img
          className={`icon-green ${style["closeButton"]}`}
          src={icons.cancel}
          alt='Close button.'
          onClick={close}
        />
        <h2>Terms and Conditions</h2>
        <p>
          This website was created as an individual project for the "Full Stack
          Developer" course of "Soy Henry".
        </p>
        <p>
          The data entered inside this application will NOT be used outside the
          application and its only purpose is to demonstrate the usefulness of
          the web page. Also, some of the recipes shown on the page do not have
          verifications of any kind, and the diets, as well as other values,
          could be incorrect; so it is recommended NOT to follow these recipes
          to prepare the dishes shown.
        </p>
        <p>Thank you very much for your attention!</p>
      </div>
    </article>
  );
};

export default TermsAndConditions;
