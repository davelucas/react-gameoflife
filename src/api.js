
export const newBoard = (rows, columns, cells) =>
  fetch('/api/game/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      rows: rows,
      columns: columns,
      activeCells: cells
    })
  }).then((response) => {
    if (response.status !== 201) {
      throw new Error("Something went wrong creating the game");
    }
    return response.json();
  }).catch((error) =>
    console.log("Unable to create a new game")
  );


export const toggle = (gameId, x, y) =>
  fetch(`/api/game/${gameId}/toggleCell`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      x: x,
      y: y
    })
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error("Something went wrong toggling cell {x},{y}");
    }
    return response.json();
  }).catch((error) =>
    console.log("Problem toggling a cell")
  );

export const nextGeneration = (gameId) =>
  fetch(`/api/game/${gameId}/nextGeneration`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Something went wrong getting the next generation of ${gameId}`);
    }
    return response.json();
  }).catch((error) =>
    console.log("Problem getting next generation")
  );

