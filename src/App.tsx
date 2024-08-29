import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { MATRIX } from "./constants/board";
import { BOARD_STATE, BoardContext, IBoard } from "./contexts/BoardContext";

function App() {
  const [state, setState] = useState<IBoard>(BOARD_STATE);

  return (
    <div className="app">
      <BoardContext.Provider value={{ value: state, onChange: setState }}>
        <Board matrix={MATRIX} />
      </BoardContext.Provider>
    </div>
  );
}

export default App;
