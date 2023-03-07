import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Modal from "../components/Modal"

//mocks
const activeModalMock = {
  sprites: {
    front_default: "https://image.png"
  },
  id: "1",
  name: "pokemon1",
  types: [
    {
      type:{
        name: "type1"
      }
    }
  ],
  weight: 100,
  height: 100
}

const closeModalMock = jest.fn()

describe("test modal",() => {
  test("testar renderizaçao ",() => {
    render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>)
    
    // screen.logTestingPlaygroundURL()
    const image = screen.getByRole('img', {
      name: /pokemon1/i
    })
    const title = screen.getByText( /pokemon1/i)
    const weight = screen.getByText(/10\.0 kg/i)
    const height = screen.getByText(/10\.0 m/i)
    const id = screen.getByRole('heading', {name: /#1 pokemon1/i})
    const type = screen.getByText(/type1/i)
    const button = screen.getByRole('button', {
      name: /❌/i
    })

    expect(image).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(weight).toBeInTheDocument()
    expect(height).toBeInTheDocument()
    expect(id).toBeInTheDocument()
    expect(type).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  test("testar fechamento do modal", async () => {
    const user = userEvent.setup()
    render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>)

    const button = screen.getByRole('button', {
      name: /❌/i
    })

    await user.click(button)
    expect(closeModalMock).toBeCalledTimes(1)
    expect(closeModalMock).toReturn()
  })

})