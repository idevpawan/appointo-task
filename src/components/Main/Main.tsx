import Calendar from "react-calendar";
import VariantDropdown from "../ui/VariantDropdown";
import "./Main.css";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { formatDate, selectedFormatDate } from "../../utils";
import { useDispatch } from "react-redux";
import { set } from "../../slices/reducerSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface ApiResponse {
  date: string;
  slots: TimeSlot[];
}

interface TimeSlotWithSelection extends TimeSlot {
  isSelected: boolean;
  formattedStartTime: string;
  formattedEndTime: string;
}

interface monthSlots {
  date: string;
  slots: TimeSlotWithSelection[];
}

function Main() {
  const [value, onChange] = useState<Value>(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [monthClicked, setMonthClicked] = useState(true);
  const [timeSlots, setTimeSlots] = useState<monthSlots[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlotWithSelection[]>(
    []
  );
  const [isAnySlotSelected, setIsAnySlotSelected] = useState(false);
  const dispatch = useDispatch();

  let slotURL = `https://app.appointo.me/scripttag/mock_timeslots?start_date=${formatDate(
    String(value)
  )}&end_date=${formatDate(String(value), true)}`;

  useEffect(() => {
    if (isAnySlotSelected) {
      dispatch(set(true));
    } else {
      dispatch(set(false));
    }
  }, [isAnySlotSelected]);

  useEffect(() => {
    setTimeSlots([]);
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse[]>(slotURL);

        const apiData = response.data;

        const transformedTimeSlots: monthSlots[] = apiData.map(
          (slotData: any) => ({
            date: slotData.date,
            slots: slotData.slots.map((slot: TimeSlot) => ({
              start_time: slot.start_time,
              end_time: slot.end_time,
              isSelected: false,
              formattedStartTime: new Date(slot.start_time).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              ),
              formattedEndTime: new Date(slot.end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            })),
          })
        );
        setTimeSlots(transformedTimeSlots);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong!", {
          toastId: "error",
        });
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [monthClicked]);

  useEffect(() => {
    timeSlots.map((e) => {
      if (e.date === selectedFormatDate(String(value))) {
        return setAvailableSlots(e.slots);
      }
    });
  }, [value, timeSlots]);

  const tileDisabled = ({ date }: any) => {
    return date < new Date();
  };

  const handleSelect = (
    _selectedDate: string,
    startTime: string,
    endTime: string
  ) => {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.date === selectedFormatDate(String(value))) {
        return {
          ...slot,
          slots: slot.slots.map((timeSlot) => ({
            ...timeSlot,
            isSelected:
              timeSlot.formattedStartTime === startTime &&
              timeSlot.formattedEndTime === endTime
                ? !timeSlot.isSelected
                : false,
          })),
        };
      }
      return {
        ...slot,
        slots: slot.slots.map((timeSlot) => ({
          ...timeSlot,
          isSelected: false,
        })),
      };
    });

    setIsAnySlotSelected(
      updatedTimeSlots.some((slot) =>
        slot.slots.some((timeSlot) => timeSlot.isSelected)
      )
    );
    setTimeSlots(updatedTimeSlots);
  };

  return (
    <div className="main">
      <ToastContainer />
      <div className="grid-container">
        {/* section 1 */}
        <div className="inner-container first">
          <p className="first-title">Test Service</p>
          <p className="timezone-text">
            Timezone: <span>Asia/Calcutta</span>
          </p>
          <Calendar
            prev2Label={false}
            next2Label={false}
            onDrillDown={(e) => {
              if (e.view === "month") {
                onChange(e.activeStartDate);
              }
            }}
            onChange={onChange}
            className={"calendar-container"}
            onClickMonth={() => setMonthClicked(!monthClicked)}
            value={value}
            tileDisabled={tileDisabled}
            onActiveStartDateChange={(e) => {
              if (e.view === "month") {
                onChange(e.activeStartDate);
                setMonthClicked(!monthClicked);
              }
            }}
          />
        </div>
        {/* section 2 */}
        <div className="inner-container">
          <p className="slot-title">Select From Variants</p>
          <VariantDropdown />
          <div className="inner-divider" />
          <p className="slot-title">Thursday, Dec 2 - Available Slots</p>
          <div className="slots">
            {loading ? (
              <div>
                <span className="skeleton">&zwnj;</span>
                <span className="skeleton">&zwnj;</span>
                <span className="skeleton">&zwnj;</span>
                <span className="skeleton">&zwnj;</span>
              </div>
            ) : (
              availableSlots.map((slot) => {
                return (
                  <SlotBox
                    startTime={slot.formattedStartTime}
                    selectedDate={formatDate(String(value))}
                    endTime={slot.formattedEndTime}
                    isActive={slot.isSelected}
                    onClick={handleSelect}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

const SlotBox = ({
  isActive,
  startTime,
  endTime,
  onClick,
  selectedDate,
}: {
  isActive?: boolean;
  startTime: string;
  endTime: string;
  selectedDate: string;
  onClick: (selectedDate: string, startTime: string, endTime: string) => void;
}) => {
  return (
    <div
      onClick={() => onClick(selectedDate, startTime, endTime)}
      className={`slot-box ${isActive && "isActiveSlot"}`}
    >
      <p>
        {startTime} - {endTime}
      </p>
      {isActive && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M11.25 15L13.75 17.5L18.75 12.5M3.75 15C3.75 16.4774 4.04099 17.9403 4.60636 19.3052C5.17172 20.6701 6.00039 21.9103 7.04505 22.955C8.08971 23.9996 9.3299 24.8283 10.6948 25.3936C12.0597 25.959 13.5226 26.25 15 26.25C16.4774 26.25 17.9403 25.959 19.3052 25.3936C20.6701 24.8283 21.9103 23.9996 22.955 22.955C23.9996 21.9103 24.8283 20.6701 25.3936 19.3052C25.959 17.9403 26.25 16.4774 26.25 15C26.25 13.5226 25.959 12.0597 25.3936 10.6948C24.8283 9.3299 23.9996 8.08971 22.955 7.04505C21.9103 6.00039 20.6701 5.17172 19.3052 4.60636C17.9403 4.04099 16.4774 3.75 15 3.75C13.5226 3.75 12.0597 4.04099 10.6948 4.60636C9.3299 5.17172 8.08971 6.00039 7.04505 7.04505C6.00039 8.08971 5.17172 9.3299 4.60636 10.6948C4.04099 12.0597 3.75 13.5226 3.75 15Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};
