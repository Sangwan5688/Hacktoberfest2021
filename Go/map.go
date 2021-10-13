package main

import "fmt"


func main() {
	// map declaration example
	var names map[string]string
	// by default the value of the map variable is nil, it needs to be initialized by adding {}
	names = map[string]string{}

	names["january"]="erlang"
	names["february"]="golang"

	fmt.Printf("%s", names["january"])

}
