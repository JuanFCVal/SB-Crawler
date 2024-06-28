import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import Layout from "./Layout"

describe('Layout', () => {
    it('should render the navbar and the children', () => {
        const { getByTestId, getByText } = render(
            <Layout>
                <div>Children</div>
            </Layout>
        )
        expect(getByTestId('navbar')).toBeInTheDocument()
        expect(getByText('Children')).toBeInTheDocument()
    })
})