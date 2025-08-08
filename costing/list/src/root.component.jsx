import { version } from "react";

export default function Root(props) {
  return (
    <div className="app">
      <h4>@costing/list is mounted!</h4>
      <pre>{JSON.stringify(props.customProps, null, 2)}</pre>
      <div>React – {version}</div>
    </div>
  );
}
