import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import Navbar from "./Navbar"

describe('Navbar', () => {
    it('should render an image and a title', () => {
        const { getByAltText, getByText } = render(<Navbar />)
        expect(getByAltText('logo')).toBeInTheDocument()
        expect(getByText('Juan Francisco Cevallos')).toBeInTheDocument()
    })
})