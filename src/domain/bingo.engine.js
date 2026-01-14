class BingoEngine {
  constructor(bingoCard) {
    this.bingoCard = bingoCard;
  }

  isWinner(numbersCalled) {
    return (
      this.checkRows(numbersCalled) ||
      this.checkColumns(numbersCalled) ||
      this.checkDiagonals(numbersCalled) ||
      this.checkCorners(numbersCalled)
    );
  }

  checkRows(numbers) {
    for (const key of Object.keys(this.bingoCard)) {
      const row = this.bingoCard[key].filter(n => n !== null);
      if (row.length && row.every(n => numbers.includes(n))) {
        return true;
      }
    }
    return false;
  }

  checkColumns(numbers) {
    for (let i = 0; i < 5; i++) {
      const column = [];

      for (const key of Object.keys(this.bingoCard)) {
        const value = this.bingoCard[key][i];
        if (value !== null) column.push(value);
      }

      if (column.length && column.every(n => numbers.includes(n))) {
        return true;
      }
    }
    return false;
  }

  checkDiagonals(numbers) {
    const diag1 = [];
    const diag2 = [];
    const keys = ["B", "I", "N", "G", "O"];

    for (let i = 0; i < 5; i++) {
      if (this.bingoCard[keys[i]][i] !== null) {
        diag1.push(this.bingoCard[keys[i]][i]);
      }
      if (this.bingoCard[keys[i]][4 - i] !== null) {
        diag2.push(this.bingoCard[keys[i]][4 - i]);
      }
    }

    return (
      diag1.every(n => numbers.includes(n)) ||
      diag2.every(n => numbers.includes(n))
    );
  }

  checkCorners(numbers) {
    const corners = [
      this.bingoCard.B[0],
      this.bingoCard.B[4],
      this.bingoCard.O[0],
      this.bingoCard.O[4],
    ];

    return corners.every(n => numbers.includes(n));
  }
}

module.exports = BingoEngine;
