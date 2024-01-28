import { useState } from "react";
import "./UI.css";

function VariantDropdown() {
  const [show, setShow] = useState(false);
  const onHandleClick = () => {
    setShow(false);
  };
  return (
    <div className="w-full relative">
      <div onClick={() => setShow(!show)} className="select-container">
        <p>30 min</p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${show && "rotate"}`}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="#378760"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {show && (
        <ul className="variantDropdown">
          <li onClick={onHandleClick}>30 min</li>
          <li>1 hour</li>
          <li>2 hour</li>
        </ul>
      )}
    </div>
  );
}

export default VariantDropdown;
