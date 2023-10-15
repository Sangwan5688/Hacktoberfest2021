function convert(s, numRows) {
    if (numRows === 1) return s;
    
    const rows = new Array(Math.min(numRows, s.length)).fill("");
    let currentRow = 0;
    let goingDown = false;

    for (const char of s) {
        rows[currentRow] += char;
        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }
        currentRow += goingDown ? 1 : -1;
    }

    return rows.join("");
}
