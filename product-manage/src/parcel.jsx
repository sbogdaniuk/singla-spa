import SpaParcel from "single-spa-react/parcel";

export const Parcel = (props) => {
  const { name, customProps } = props;

  return (
    <SpaParcel
      key={name}
      config={() => import(/* webpackIgnore: true */ name)}
      wrapWith="div"
      wrapClassName="wrapper"
      customProps={{
        name,
        ...customProps,
      }}
      handleError={() => null}
    />
  );
};
