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

// Graph is a collection of unordered list (here linked lists)
// to represent a finite graph.
// Each index of adjacencyList is a linked list storing nodes approachable by
// this index value with each node storing next node address, i.e.,
// [ 0 ] : 4 -> 1  (means 0 has an edge to 4 and 1)
// [ 1 ] : 0       (means 1 has an edge to 0)
// [ 2 ]
// [ 3 ]
// [ 4 ] : 0       (means 4 has an edge to 0)
type Graph struct {
	numOfVertices int
	adjacencyList map[interface{}]*Node
}

type Node struct {
	vertex interface{}
	next   *Node
}

type Edge struct {
	from   int
	to     int
	weight int
}

func MakeGraph(numOfVertices int) Graph {
	g := Graph{
		adjacencyList: make(map[interface{}]*Node, numOfVertices),
		numOfVertices: numOfVertices}
	return g
}

func (g Graph) AddEdge(src, dest interface{}) {
	destNode := &Node{vertex: dest, next: g.adjacencyList[src]}
	g.adjacencyList[src] = destNode

	srcNode := &Node{vertex: src, next: g.adjacencyList[dest]}
	g.adjacencyList[dest] = srcNode
}

// GetAdjacencyList returns a slice containing all nodes
// adjacent to forNode
func (g Graph) GetAdjacencyList(forNode interface{}) []*Node {
	var adjacencyList []*Node
	temp := g.adjacencyList[forNode]
	for temp != nil {
		adjacencyList = append(adjacencyList, temp)
		temp = temp.next
	}
	return adjacencyList
}

func (g Graph) PrintAdjacencyList() {
	for i := 0; i < g.numOfVertices; i++ {
		fmt.Printf("Adjacency List of vertex %d|", i)
		temp := g.adjacencyList[i]
		for temp != nil {
			fmt.Printf(" -> %d", temp.vertex)
			temp = temp.next
		}
		println()
	}
}
