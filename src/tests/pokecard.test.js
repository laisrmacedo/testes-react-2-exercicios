import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Pokecard from "../components/Pokecard"
import { pokemonMock } from "./pokemonMock"
import axios from "axios"

//MOCKS
jest.mock("axios")

//props
const urlMock = "https://pokeapi.co/api/v2/pokemon/1/"
const openModalMock = jest.fn() 

//resposta do axios
const axiosResponseMock = {
  data: pokemonMock
}

describe("Pokecard",() => {
  test("testar renderizaçao do card", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock)
    render(<Pokecard url={urlMock} openModal={openModalMock}/>)
    
    await waitFor(() => {
      expect(screen.getByRole('heading', {
        name: /bulbasaur/i
      })).toBeInTheDocument()
      expect(screen.getByRole('img', {
        name: /bulbasaur/i
      })).toBeInTheDocument()
      expect(screen.getByText(/grass/i)).toBeInTheDocument()
      expect(screen.getByText(/poison/i)).toBeInTheDocument()
    })
  })

  test("testar abertura do modal", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock)
    const user = userEvent.setup()
    render(<Pokecard url={urlMock} openModal={openModalMock}/>)
    
    await waitFor(() => {})
    await user.click(screen.getByRole('article'))

    expect(openModalMock).toBeCalledTimes(1)
  })
})