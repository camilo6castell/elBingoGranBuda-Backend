// class User {
//   constructor(username, bingoCard) {
//     this.username = username;
//     this.bingoCard = bingoCard;
//   }

//   // Método para verificar si el usuario ha ganado en el bingo
//   hasWon(numbersCalled) {
//     const card = this.bingoCard;

//     // Verificar si todos los números del cartón del usuario están en el arreglo
//     if (this.checkNumbersInArray(card, numbersCalled)) {
//       return true;
//     }

//     // Verificar si alguna de las dos diagonales está en el arreglo
//     if (this.checkDiagonalsInArray(card, numbersCalled)) {
//       return true;
//     }

//     // Verificar si alguna de las 5 filas está en el arreglo
//     if (this.checkRowsInArray(card, numbersCalled)) {
//       return true;
//     }

//     // Verificar si alguna de las 5 columnas está en el arreglo
//     if (this.checkColumnsInArray(card, numbersCalled)) {
//       return true;
//     }

//     // Verificar si los números de las 4 esquinas están en el arreglo
//     if (this.checkCornersInArray(card, numbersCalled)) {
//       return true;
//     }

//     // Si ninguna de las condiciones anteriores se cumple, el usuario no ha ganado
//     return false;
//   }

//   // Método para verificar si todos los números del cartón del usuario están en el arreglo
//   checkNumbersInArray(card, numbersCalled) {
//     return Object.values(card)
//       .flat()
//       .every((num) => numbersCalled.includes(num));
//   }

//   // Método para verificar si alguna de las dos diagonales está en el arreglo
//   checkDiagonalsInArray(card, numbersCalled) {
//     const diagonal1 = [card.B[0], card.I[1], card.G[3], card.O[4]];
//     const diagonal2 = [card.B[4], card.I[3], card.G[1], card.O[0]];

//     return (
//       diagonal1.every((num) => numbersCalled.includes(num)) ||
//       diagonal2.every((num) => numbersCalled.includes(num))
//     );
//   }

//   // Método para verificar si alguna de las 5 filas está en el arreglo
//   checkRowsInArray(card, numbersCalled) {
//     return Object.values(card).some((row) =>
//       row.every((num) => numbersCalled.includes(num))
//     );
//   }

//   // Método para verificar si alguna de las 5 columnas está en el arreglo
//   checkColumnsInArray(card, numbersCalled) {
//     for (let col = 0; col < 5; col++) {
//       const column = [
//         card.B[col],
//         card.I[col],
//         card.N[col],
//         card.G[col],
//         card.O[col],
//       ];
//       if (column.every((num) => numbersCalled.includes(num))) {
//         return true;
//       }
//     }
//     return false;
//   }

//   // Método para verificar si los números de las 4 esquinas están en el arreglo
//   checkCornersInArray(card, numbersCalled) {
//     const corners = [card.B[0], card.B[4], card.O[0], card.O[4]];
//     return corners.every((num) => numbersCalled.includes(num));
//   }
// }

class User {
  constructor(username, bingoCard) {
    this.username = username;
    this.bingoCard = bingoCard;
  }

  checkWinningNumbers(numbers) {
    if (
      this.checkRows(numbers) ||
      this.checkColumns(numbers) ||
      this.checkDiagonals(numbers) ||
      this.checkCorners(numbers)
    ) {
      return true;
    }
    return false;
  }

  checkRows(numbers) {
    for (let key in this.bingoCard) {
      let row = this.bingoCard[key].filter((num) => num !== null);
      let rowMatch = row.every((num) => numbers.includes(num));
      if (rowMatch) {
        return true;
      }
    }
    return false;
  }

  checkColumns(numbers) {
    for (let i = 0; i < 5; i++) {
      let column = [];
      for (let key in this.bingoCard) {
        if (this.bingoCard[key][i] !== null) {
          column.push(this.bingoCard[key][i]);
        }
      }
      let columnMatch = column.every((num) => numbers.includes(num));
      if (columnMatch) {
        return true;
      }
    }
    return false;
  }

  checkDiagonals(numbers) {
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < 5; i++) {
      if (this.bingoCard[`BINGO`[i]][i] !== null) {
        diagonal1.push(this.bingoCard[`BINGO`[i]][i]);
      }
      if (this.bingoCard[`BINGO`[i]][4 - i] !== null) {
        diagonal2.push(this.bingoCard[`BINGO`[i]][4 - i]);
      }
    }
    let diagonal1Match = diagonal1.every((num) => numbers.includes(num));
    let diagonal2Match = diagonal2.every((num) => numbers.includes(num));
    return diagonal1Match || diagonal2Match;
  }

  checkCorners(numbers) {
    let corners = [
      this.bingoCard["B"][0],
      this.bingoCard["B"][4],
      this.bingoCard["O"][0],
      this.bingoCard["O"][4],
    ];
    let cornerMatch = corners.every((num) => numbers.includes(num));
    return cornerMatch;
  }
}

module.exports = User;

module.exports = User;
