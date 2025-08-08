import { render } from "@testing-library/react";
import { PortalHeaderApp } from "./portal-header-app";

describe("<PortalHeaderApp />", () => {
  it("should be in the document", () => {
    const { getByText } = render(<PortalHeaderApp name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
