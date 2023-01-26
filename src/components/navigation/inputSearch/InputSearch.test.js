import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import InputSearch from "./InputSearch";


it("InputSearch value", () => {
    render(<InputSearch searchHandler={ () => {} }/>, { wrapper: BrowserRouter });
    const inputElement = screen.getByPlaceholderText(/szukaj/i);
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'Test' } });
    expect(inputElement).toHaveDisplayValue(/test/i);
})

it("Search icon appear",  () => {
    render(<InputSearch searchHandler={ () => {} }/>, { wrapper: BrowserRouter });
    const inputElement = screen.getByPlaceholderText(/szukaj/i);
    const iconBox =  screen.getByTestId('iconBox');
    inputElement.focus();
    expect(iconBox).toBeVisible();
})