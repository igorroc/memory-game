import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import "./style.css"

type TBoardSize = {
	x: number | 2
	y: number | 2
}

export default function Board() {
	const navigate = useNavigate()
	let { size } = useParams()

	const [board, setBoard] = useState<number[][]>([])
	const [boardAnswered, setBoardAnswered] = useState<boolean[][]>([])
	const [boardSize, setBoardSize] = useState<TBoardSize>({
		x: 2,
		y: 2,
	})

	const [previousClick, setPreviousClick] = useState<HTMLElement | null>()

	useEffect(() => {
		if (!size) {
			return navigate("/")
		}
		const [x, y] = size.split("x").map((n) => Number(n))

		if ((x * y) % 2 !== 0 || x < 2 || y < 2) {
			return navigate("/")
		}

		setBoardSize({
			x,
			y,
		})
		let newGrid = new Array(x).fill("").map(() => new Array(y).fill(10))
		let answerGrid = new Array(x).fill("").map(() => new Array(y).fill(false))

		let value = 0
		newGrid.map((row, iRow) =>
			row.map((col, iCol) => {
				newGrid[iRow][iCol] = Math.floor(value / 2)
				value++
			})
		)

		for (let index = 0; index < 50; index++) {
			let randomGrid = [...newGrid]
			let randomX1 = Math.floor(Math.random() * x)
			let randomX2 = Math.floor(Math.random() * x)
			let randomY1 = Math.floor(Math.random() * y)
			let randomY2 = Math.floor(Math.random() * y)

			let aux = randomGrid[randomX1][randomY1]
			randomGrid[randomX1][randomY1] = randomGrid[randomX2][randomY2]
			randomGrid[randomX2][randomY2] = aux

			newGrid = randomGrid
		}

		setBoard(newGrid)
		setBoardAnswered(answerGrid)
	}, [size])

	function handlePositionClick(e: React.MouseEvent, row: number, col: number) {
		let element = e.target as HTMLDivElement

		if (previousClick == element) {
			return
		}

		element.classList.toggle("hide")

		if (!previousClick) {
			setPreviousClick(element)
		} else {
			if (
				board[Number(previousClick?.getAttribute("data-row"))][
					Number(previousClick?.getAttribute("data-col"))
				] == board[row][col]
			) {
				let newBoardAnswered = [...boardAnswered]
				newBoardAnswered[row][col] = true
				newBoardAnswered[Number(previousClick?.getAttribute("data-row"))][
					Number(previousClick?.getAttribute("data-col"))
				] = true

				setBoardAnswered(newBoardAnswered)

				if (boardAnswered.every((row) => row.every((col) => col == true))) {
					setTimeout(() => {
						alert("ganhou")
					}, 500)
				}
			} else {
				setTimeout(() => {
					previousClick.classList.add("hide")
					element.classList.add("hide")
				}, 500)
			}
			setPreviousClick(null)
		}
	}

	return (
		<div>
			<h2>Jogo da memória {size}</h2>
			<div
				className="grid"
				style={
					{
						"--x": boardSize.x,
						"--y": boardSize.y,
					} as React.CSSProperties
				}
			>
				{board?.map((row, iRow) => (
					<div className="row" key={iRow}>
						{row.map((col, iCol) => (
							<div
								className="col hide"
								key={iCol}
								data-row={iRow}
								data-col={iCol}
								onClick={
									!boardAnswered[iRow][iCol]
										? (e) => handlePositionClick(e, iRow, iCol)
										: undefined
								}
							>
								<div className="card">
									<p>{col}</p>
								</div>
							</div>
						))}
					</div>
				))}
				<a href="/">Voltar</a>
			</div>
		</div>
	)
}
