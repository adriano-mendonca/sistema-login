import React from "react";

export const Head = (props) => {
  React.useEffect(() => {
    if (props.title != undefined) {
      document.title = "Megalink | " + props.title;
    } else {
      document.title = "Megalink";
    }
  }, [props]);

  return <></>;
};
