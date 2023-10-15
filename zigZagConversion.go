package main

import (
	"strings"
)

func convert(s string, numRows int) string {
	if numRows == 1 {
		return s
	}

	rows := make([]strings.Builder, min(numRows, len(s)))
	currentRow := 0
	goingDown := false

	for _, char := range s {
		rows[currentRow].WriteRune(char)
		if currentRow == 0 || currentRow == numRows-1 {
			goingDown = !goingDown
		}
		if goingDown {
			currentRow++
		} else {
			currentRow--
		}
	}

	result := strings.Builder{}
	for _, row := range rows {
		result.WriteString(row.String())
	}
	return result.String()
}
