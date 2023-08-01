import { useSelector } from "react-redux";

export default function Tab({ tabData, field, setField }) {
  const {darkMode} = useSelector((state)=>state.mode);
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className={`flex p-1 gap-x-1 my-6 rounded-full max-w-max ${darkMode ? "bg-richblack-800" : "bg-pure-greys-50"}`}
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? `${darkMode ? "bg-richblack-900 text-richblack-5" : "bg-pure-greys-5 text-richblack-600 font-semibold"}`
              : `${darkMode ? "bg-transparent text-richblack-200" : "bg-transparent text-richblack-500"}`
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}