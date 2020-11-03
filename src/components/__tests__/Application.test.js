import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, getByText, getAllByTestId, queryByText, queryByAltText, getByAltText, prettyDOM } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("Form", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, getByAltText, queryAllByTestId, getByPlaceholderText } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen")); 
    const day = queryAllByTestId("day").find((n) => getByText(n, "Monday"))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument
    fireEvent.click(getByAltText("Add"))
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText("Sylvia Palmer"))
    fireEvent.click(getByText(container, "Save"))
    expect(getByText(container, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(container, "Lydia Miller-Jones"))
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug, queryAllByTestId } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?"))
    fireEvent.click(getByText(appointment, "Confirm"))
    expect(getByText(appointment, "Deleting"))
    await waitForElement(() => getByAltText(appointment, "Add"))
    const day = queryAllByTestId("day").find((n) => getByText(n, "Monday"))
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug, getByPlaceholderText, queryAllByTestId } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Save"))
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"))
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"))
    const day = queryAllByTestId("day").find((n) => getByText(n, "Monday"))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument
  })


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug, getByPlaceholderText} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Save"))
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"))
    await waitForElement(() => getByText(appointment, "Could not make this appointment"))
  })

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?"))
    fireEvent.click(getByText(appointment, "Confirm"))
    expect(getByText(appointment, "Deleting"))
    await waitForElement(() => getByText(container, "Could not delete this appointment"))
  });

})

