import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Board from "./pages/Board"

import Home from "./pages/Home"

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/board" element={<Board />} />
			</Routes>
		</BrowserRouter>
	)
}
