import { Loader2Icon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="my-48 flex items-center justify-center">
      <Loader2Icon className="animate-spin" />
    </div>
  );
};

export default Loading;
