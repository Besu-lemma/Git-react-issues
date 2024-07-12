import { useEffect, useRef } from "react";

function Modals({ children, modelPosition, title, onClose }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (window.innerWidth > 767) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (window.innerWidth > 767) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [onClose]);

  return (
    <>
      <div className="sm:hidden fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
      <div
        className="sm:hidden fixed top-auto mt-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-[#161B22] text-white rounded-md shadow-md z-50"
        ref={wrapperRef}
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-[#161B22]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
          {children}
        </div>
      </div>

      <div
        className={`hidden sm:block origin-top-right absolute ${modelPosition} mt-2 w-[300px] rounded-md bg-[#161B22] text-white shadow-md text-xs ring-1 ring-black ring-opacity-5 z-50`}
        ref={wrapperRef}
      >
        <div className="py-4">
          <button
            onClick={onClose}
            className="absolute mx-2 right-2 bg-[#161B22]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h3 className="text-lg mx-4 font-semibold text-white mb-4">
            {title}
          </h3>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modals;
