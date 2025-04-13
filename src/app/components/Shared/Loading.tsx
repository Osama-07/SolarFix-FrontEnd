import React from "react";

function Loading() {
  return (
    <div className="absolute top-0 right-0 bg-black/10 backdrop-blur w-full h-full rounded-xl">
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t-purple-800 border-b-purple-800 border-solid border-4 w-10 h-10 rounded-full animate-spin"></span>
    </div>
  );
}

export default Loading;
