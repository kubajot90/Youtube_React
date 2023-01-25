import { render, screen, MemoryRouter, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import InputSearch from "./InputSearch";


it("InputSearch test", ()=>{
    render(<InputSearch searchHandler={ ()=>{} }/>, { wrapper: BrowserRouter });
    const inputElement = screen.getByPlaceholderText(/szukaj/i);
    const buttonElement = screen.getByRole('button', { name : /search/i})
    expect(buttonElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'Test' } });
    expect(inputElement).toHaveDisplayValue(/test/i);
    // fireEvent.click(buttonElement);
})