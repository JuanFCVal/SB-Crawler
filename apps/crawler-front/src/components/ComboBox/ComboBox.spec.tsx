import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Combobox } from "./ComboBox"

const props = {
    items: [
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
        { label: 'Item 3', value: 'item3' },
    ],
    value: 'item1',
    onChange: jest.fn(),
}

describe.only('ComboBox', () => {
    it('Should render the ComboBox and value as initial', () => {
        const { getByRole, getByText } = render(<Combobox items={props.items} value={props.value} />)
        expect(getByRole('combobox')).toBeInTheDocument()
        expect(getByText('Item 1')).toBeInTheDocument()
    })
})