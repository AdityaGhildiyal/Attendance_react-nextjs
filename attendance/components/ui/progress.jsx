import React from "react";

const Progress = React.forwardRef(({ value, className = "", ...props }, ref) => {
  return (
    <div className={`relative w-full h-2.5 bg-gray-600 rounded-full ${className}`} ref={ref} {...props}>
      <div
        className="absolute h-full bg-blue-500 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
});

Progress.displayName = "Progress";
export { Progress }; 