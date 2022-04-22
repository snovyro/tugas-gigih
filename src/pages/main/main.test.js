import Main from "./main";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("input test", () => {
  render(<Main />);
  const inputKeyword = screen.getByPlaceholderText(/Keyword/i);
  userEvent.type(inputKeyword, "Polyphia");
  expect(inputKeyword).toHaveValue("Polyphia");
});
