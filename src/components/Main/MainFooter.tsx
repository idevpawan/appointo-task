import { useSelector } from "react-redux";
import "./Main.css";

function MainFooter() {
  const isProceed = useSelector((state: any) => state.data.isProceed);
  return (
    <div className="main-footer">
      <p>
        Powered by{" "}
        <a
          href="https://apps.shopify.com/appointo-appointments-and-bookings"
          className="underline text-white"
          target="_blank"
        >
          appointo
        </a>
      </p>
      <button
        disabled={!isProceed}
        className={`btn ${!isProceed && "disable-btn"}`}
      >
        <p>Next</p>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="#378760"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default MainFooter;
