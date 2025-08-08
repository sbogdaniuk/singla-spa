import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default function Root(props) {
  return (
    <BrowserRouter>
      <section>
        <h4>{props.name} is mounted!</h4>

        <ul>
          {[
            { to: "/product/MODEL_1/SEASON_1", label: "MODEL_1 – SEASON_1" },
          ].map((d) => (
            <li key={d.to}>
              <Link to={d.to}>{d.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </BrowserRouter>
  );
}
