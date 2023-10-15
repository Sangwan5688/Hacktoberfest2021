// Copyright (C) 2022   Anurag Dhadse. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package graph

import "fmt"

// AdjacencyMatrix struct stores an Adjacency Matrix
// Which is a square matrix used to represent a finite graph.
// The elements of matrix indicate whether pairs of vertices
// are adjacent (set 1) or not (set 0) in the graph
type AdjacencyMatrix struct {
	adjMatrix [][]int
}

func MakeAdjacencyMatrix(size int) AdjacencyMatrix {
	g := AdjacencyMatrix{adjMatrix: make([][]int, size)}
	for i := range g.adjMatrix {
		g.adjMatrix[i] = make([]int, size)
	}
	return g
}

func (g AdjacencyMatrix) AddEdge(val1, val2 int) {
	if val1 == val2 {
		fmt.Printf("Same vertex %d and %d can't be connexted.\n", val1, val2)
	}
	g.adjMatrix[val1][val2] = 1
	g.adjMatrix[val2][val1] = 1
}

func (g AdjacencyMatrix) RemoveEdge(val1, val2 int) {
	if g.adjMatrix[val1][val2] == 0 {
		fmt.Printf("No Edge between %d and %d\n", val1, val2)
		return
	}
	g.adjMatrix[val1][val2] = 0
	g.adjMatrix[val2][val1] = 0
}

func (g AdjacencyMatrix) PrintMatrix() {
	for _, row := range g.adjMatrix {
		for _, val := range row {
			fmt.Printf("%d", val)
		}
		println()
	}
}
