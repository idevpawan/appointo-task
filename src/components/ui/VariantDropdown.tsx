import { useState } from "react";
import "./UI.css";

function VariantDropdown() {
  const [show, setShow] = useState(false);
  const [period, setPeriod] = useState("30 min");
  const onHandleClick = (p: string) => {
    setPeriod(p);
    setShow(false);
  };
  return (
    <div className="w-full relative">
      <div onClick={() => setShow(!show)} className="select-container">
        <p>{period}</p>
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
          <li onClick={() => onHandleClick("30 min")}>30 min</li>
          <li onClick={() => onHandleClick("1 hour")}>1 hour</li>
          <li onClick={() => onHandleClick("2 hour")}>2 hour</li>
        </ul>
      )}
    </div>
  );
}

export default VariantDropdown;
