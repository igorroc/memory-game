import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./style.css"

type TBoardSize = {
	x: number
	y: number
}

export default function Home() {
	const [boardSize, setBoardSize] = useState<TBoardSize>({ x: 0, y: 0 })

	const navigate = useNavigate()

	function handleCreateBoard(e: React.FormEvent) {
		e.preventDefault()
		console.log(boardSize)
		if ((boardSize.x * boardSize.y) % 2 != 0) {
			return alert("Crie um tabuleiro com número par de casas")
		}
        
		navigate("/board", { state: boardSize })
	}
	return (
		<div className="App">
			<p>Digite o tamanho do tabuleiro:</p>
			<form onSubmit={handleCreateBoard}>
				<div>
					<input
						type="number"
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
