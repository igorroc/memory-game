import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./style.css"

type TBoardSize = {
	x: number
	y: number
}

export default function Home() {
	const [boardSize, setBoardSize] = useState<TBoardSize>({ x: 2, y: 2 })

	const navigate = useNavigate()

	useEffect(() => {
		let element = document.querySelector("#boardSizeX") as HTMLElement
		element.focus()
	}, [])

	function handleCreateBoard(e: React.FormEvent) {
		e.preventDefault()
		console.log(boardSize)
		if ((boardSize.x * boardSize.y) % 2 != 0) {
			return alert("Crie um tabuleiro com número par de casas")
		} else if (boardSize.x < 2 || boardSize.y < 2) {
			return alert("Crie um tabuleiro com no mínimo 2x2 casas")
		} else if ((boardSize.x * boardSize.y) / 2 > 80) {
			return alert("Crie um tabuleiro com no máximo 160 casas")
		}

		navigate("/board/" + boardSize.x + "x" + boardSize.y)
	}
	return (
		<div className="App">
			<p>Digite o tamanho do tabuleiro:</p>
			<form onSubmit={handleCreateBoard}>
				<div>
					<input
						type="number"
						min={2}
						name="boardSizeX"
						id="boardSizeX"
						value={boardSize.x}
						onChange={(e) =>
							setBoardSize((prev) => ({ ...prev, x: Number(e.target.value) }))
						}
					/>
					<p>X</p>
					<input
						type="number"
						min={2}
						name="boardSizeY"
						id="boardSizeY"
						value={boardSize.y}
						onChange={(e) =>
							setBoardSize((prev) => ({ ...prev, y: Number(e.target.value) }))
						}
					/>
				</div>
				<button type="submit">Criar tabuleiro</button>
			</form>
		</div>
	)
}
