// prvni input pro test je nazev, druhy je funkce
// pri psani testu plati the three A's
/*
1. Arrange - set up the test data and conditions
2. act - set the logic
3. assert - compare execution results with expected ones
*/

import Greeting from "./Greeting";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// 1 testing suite (greeting component) with one test.
describe("Greeting component", () => {
  test("renders Hello world as a test", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Hello world", { exact: false }); // exact: false => casing insensitive
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders good to see you if the button was NOT clicked", () => {
    render(<Greeting />);
    const paragraphElement = screen.getByText("good to see you", {
      exact: false,
    }); // exact: false => casing insensitive
    expect(paragraphElement).toBeInTheDocument();
  });

  test("renders Change! if the button was clicked", () => {
    // arrange
    render(<Greeting />);
    // act - clicking the button
    const buttonElement = screen.getByRole("button"); // opet bychom to mohli ziskat pomoci textu (Change text!)
    userEvent.click(buttonElement);
    // assert
    const changedElement = screen.getByText("Change!", { exact: false }); // exact: false => casing insensitive
    expect(changedElement).toBeInTheDocument();
  });

  test('does not render "good to see" you if the button was clicked', () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole("button"); // opet bychom to mohli ziskat pomoci textu (Change text!)
    userEvent.click(buttonElement);

    const goneElement = screen.queryByText("good to see you", { exact: false }); // zmenime to na queryByText => to vrati null, pokud to tam neni. to getByText by hodilo error, kdyby to tam nebylo.
    expect(goneElement).toBeNull(); // a tady tedy chceme otestovat, jestli je to opravdu null
  });
});
