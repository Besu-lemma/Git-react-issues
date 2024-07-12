import { useSelector } from "react-redux";
import { ClosedIcon, CommentIcon, OpenIcon } from "./Icons";
import { formatDistanceToNow } from "date-fns";
import Additional from "../Dropdowns/Additional";

function IssueList() {
  const { issues, error } = useSelector((state) => state.github);

  const calculateTimeDifference = (created_at) => {
    const createdAtDate = new Date(created_at);
    return formatDistanceToNow(createdAtDate, { addSuffix: true });
  };

  const formateToRGB = (hex) => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  };

  const hexToRGBAHandler = (hex, alpha) => {
    const { r, g, b } = formateToRGB(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const brightestColorHandler = (hex) => {
    const { r, g, b } = formateToRGB(hex);
    const maxRGB = Math.max(r, g, b);
    const factor = 255 / maxRGB;
    return `rgb(${Math.round(r * factor)}, ${Math.round(
      g * factor
    )}, ${Math.round(b * factor)})`;
  };

  return (
    <div className="text-white">
      <ul className="min-h-[500px]">
        {issues.length > 0 && !error.status ? (
          issues.map((item) => (
            <li
              key={`issues-${item.id}-${Math.random()}`}
              className="hover:bg-gray-800 py-2 border-b border-slate-700 flex flex-col justify-between"
            >
              <div className="flex gap-1 px-3 md:items-center justify-between">
                <div className="flex items-start gap-1">
                  {item.state === "open" ? (
                    <Additional text="Open Issue">
                      <div>
                        <OpenIcon color="#FF7B72" />
                      </div>
                    </Additional>
                  ) : (
                    <Additional text="Closed Issue">
                      <div className="border rounded-full">
                        <ClosedIcon />
                      </div>
                    </Additional>
                  )}
                  <div>
                    <div className="flex items-center flex-wrap gap-2">
                      <button className="font-semibold text-start leading-[20px] text-[#C9D1D9] hover:text-blue-500 text-sm md:text-lg break-all">
                        {item.title}
                      </button>
                      <div className="flex gap-2 flex-wrap">
                        {item.labels.map((label) => (
                          <button
                            key={`${label.id}-${Math.random()}`}
                            className="border rounded-full text-xs font-semibold px-2 flex items-center justify-center h-[20px]"
                            style={{
                              backgroundColor: hexToRGBAHandler(
                                label.color,
                                0.1
                              ),
                              color:
                                label.color === "000000"
                                  ? "#fff"
                                  : brightestColorHandler(label.color),
                              borderColor:
                                label.color === "000000"
                                  ? "#fff"
                                  : `#${label.color}`,
                            }}
                          >
                            {label.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-3">
                  {item.comments > 0 && (
                    <button className="flex items-center rounded text-slate-500 hover:text-blue-500 gap-1">
                      <CommentIcon /> {item.comments}
                    </button>
                  )}
                </div>
              </div>
              <div className="pl-[33px]">
                <span className="text-xs text-slate-500">#{item.number}</span>
                <span className="text-xs text-slate-500">
                  {" "}
                  Open {calculateTimeDifference(item.created_at)} ago by{" "}
                  {item.user.login}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="py-2 flex justify-center h-full items-center pt-10">
            {error.message || "No results matched your search."}
          </li>
        )}
      </ul>
    </div>
  );
}

export default IssueList;
