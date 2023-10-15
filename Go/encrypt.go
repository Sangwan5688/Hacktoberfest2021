package main

import ("fmt")

func encrypt(s string, k int32) {
	result := make([]rune, len(s))

	for i, c := range s {
		shifted := c

		if c >= 'a' && c < 'z' {
			shifted = (c + k)
		} else if c >= 'A' && c < 'Z' {
			shifted = (c + k)
		} else if c == 'z' || c == 'Z' {
			shifted = (c - 26) + k
		}
		result[i] = shifted
	}

	fmt.Println(string(result))

}

func main () {
  encrypt("Hello World", 5)
}
