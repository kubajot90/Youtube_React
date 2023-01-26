import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VideoCard from "./VideoCard";


it("Render cards in VideosSection",() => {
    render(<VideoCard searchHandler = { () => {} } />, { wrapper: BrowserRouter });
    const videoCard =  screen.getByTestId("videoCard");
    expect(videoCard).toBeInTheDocument();
})
 // const buttonElement = screen.getByRole('button', { name : /search/i})
    // expect(buttonElement).toBeInTheDocument();
    // fireEvent.click(buttonElement);
    // expect(inputElement).toHaveClass('iconBoxResponsive');
      // expect(iconBox).toHaveClass('iconBoxResponsive');
    // expect(iconBox).toBeDisabled();