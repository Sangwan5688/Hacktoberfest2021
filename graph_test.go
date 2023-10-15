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

import (
	"fmt"
	"testing"
)

func TestAdjacencyMatrix(t *testing.T) {
	graph := MakeAdjacencyMatrix(5)
	graph.AddEdge(0, 1)
	graph.AddEdge(0, 2)
	graph.AddEdge(1, 2)
	graph.AddEdge(2, 0)
	graph.AddEdge(2, 3)
	graph.PrintMatrix()
}

func TestGraph(t *testing.T) {
	graph := MakeGraph(5)
	graph.AddEdge(0, 1)
	graph.AddEdge(0, 4)
	graph.AddEdge(1, 2)
	graph.AddEdge(1, 3)
	graph.AddEdge(1, 4)
	graph.AddEdge(2, 3)
	graph.AddEdge(3, 4)

	graph.PrintAdjacencyList()
}

// Should Print:
// Adjacency List of vertex 1| head -> 4 -> 3 -> 2 -> 0
func TestGraph_GetAdjacencyList(t *testing.T) {
	graph := MakeGraph(5)
	graph.AddEdge(0, 1)
	graph.AddEdge(0, 4)
	graph.AddEdge(1, 2)
	graph.AddEdge(1, 3)
	graph.AddEdge(1, 4)
	graph.AddEdge(2, 3)
	graph.AddEdge(3, 4)

	adjacencyList := graph.GetAdjacencyList(1)

	fmt.Printf("Adjacency List of vertex %d| head", 1)
	for _, node := range adjacencyList {
		fmt.Printf(" -> %d", node.vertex)
	}
	println()
}

func TestGraph_BFS(t *testing.T) {
	graph := MakeGraph(5)
	graph.AddEdge(0, 1)
	graph.AddEdge(0, 4)
	graph.AddEdge(1, 2)
	graph.AddEdge(1, 3)
	graph.AddEdge(1, 4)
	graph.AddEdge(2, 3)
	graph.AddEdge(3, 4)

	if found, err := graph.BFS(0, 3); found != true && err == nil {
		t.Errorf("BFS returned false for source:0 destination: 3")
	} else {
		// err != nil; some error deal with it
		return
	}
	if found, err := graph.BFS(0, 2); found != true && err == nil {
		t.Errorf("BFS returned false for source:0 destination: 2")
	} else {
		// err != nil; some error deal with it
		return
	}
	if found, err := graph.BFS(0, 5); found != false && err == nil {
		t.Errorf("BFS returned true for source:0 destination: 3")
	} else {
		// err != nil; some error deal with it
		return
	}
}

func TestGraph_DFS(t *testing.T) {
	graph := MakeGraph(5)
	graph.AddEdge(0, 1)
	graph.AddEdge(0, 4)
	graph.AddEdge(1, 2)
	graph.AddEdge(1, 3)

	if val := graph.DFS(1, 3, []int{}); val != true {
		t.Error("DFS returned false for source: 0, destination: 3")
	}
}

func TestWeightedGraph_KruskalMinimumSpanningTree(t *testing.T) {
	graph := MakeWeightedGraph(4)
	graph.AddEdge(0, 1, 10)
	graph.AddEdge(0, 2, 6)
	graph.AddEdge(0, 3, 5)
	graph.AddEdge(1, 3, 15)
	graph.AddEdge(2, 3, 4)

	graph.KruskalMinimumSpanningTree()
}

func TestDiWeightedGraph_BellmanFord(t *testing.T) {
	g := MakeDiWeightedGraph(5)

	g.AddEdge(0, 1, -1)
	g.AddEdge(0, 2, 4)
	g.AddEdge(1, 2, 3)
	g.AddEdge(1, 3, 2)
	g.AddEdge(1, 4, 2)
	g.AddEdge(3, 2, 5)
	g.AddEdge(3, 1, 1)
	g.AddEdge(4, 3, -3)

	g.BellmanFord(0)
}

func TestWeightedGraph_Dijkstra(t *testing.T) {
	g := MakeWeightedGraph(7)

	g.AddEdge(0, 1, 2)
	g.AddEdge(0, 2, 3)

	g.AddEdge(1, 2, 2)
	g.AddEdge(1, 3, 3)
	g.AddEdge(1, 4, 6)
	g.AddEdge(1, 6, 5)

	g.AddEdge(2, 3, 1)
	g.AddEdge(2, 5, 4)

	g.AddEdge(3, 4, 2)
	g.AddEdge(5, 4, 1)
	g.AddEdge(6, 4, 2)

	g.DijkstraShortestPath(0, 4)
}

// https://youtu.be/jsmMtJpPnhU?t=117
func TestWeightedGraph_PrimMinimumSpanningTree(t *testing.T) {
	g := MakeWeightedGraph(6)
	g.AddEdge(0, 1, 2)
	g.AddEdge(0, 3, 2)
	g.AddEdge(0, 2, 5)
	g.AddEdge(0, 4, 3)
	g.AddEdge(1, 3, 0)
	g.AddEdge(2, 3, 1)
	g.AddEdge(2, 4, 6)
	g.AddEdge(3, 4, 4)
	g.AddEdge(3, 5, 8)

	mst, mstCost, err := g.PrimMinimumSpanningTree(0)
	if err != nil {
		print(err.Error())
		return
	}
	mst.PrintAdjacencyList()
	fmt.Printf("MST total cost: %d\n", mstCost)
}

func TestWeightedGraph_ShortestPath(t *testing.T) {
	g := MakeWeightedGraph(8)
	g.AddEdge(0, 1, 1)
	g.AddEdge(0, 2, 2)
	g.AddEdge(0, 3, 3)
	g.AddEdge(1, 4, 4)
	g.AddEdge(1, 5, 11)
	g.AddEdge(2, 4, 9)
	g.AddEdge(2, 5, 5)
	g.AddEdge(2, 6, 16)
	g.AddEdge(3, 6, 2)
	g.AddEdge(4, 7, 18)
	g.AddEdge(5, 7, 13)
	g.AddEdge(6, 7, 2)
}

//func TestExampleDijkstra(t *testing.T) {
//	g := MakeDiWeightedGraph(9)
//	g.AddEdge(0, 1, 4)
//	g.AddEdge(0, 6, 7)
//	g.AddEdge(0, 7, 3)
//	g.AddEdge(7, 0, 3)
//	g.AddEdge(7, 6, 4)
//	g.AddEdge(1, 2, 1)
//	g.AddEdge(2, 6, -2)
//	g.AddEdge(2, 3, 1)
//	g.AddEdge(3, 6, -7)
//	g.AddEdge(3, 4, 2)
//	g.AddEdge(4, 3, 2)
//	g.AddEdge(4, 5, 3)
//	g.AddEdge(3, 5, 4)
//	g.AddEdge(6, 5, 3)
//	g.AddEdge(6, 8, 5)
//	g.AddEdge(8, 5, 5)
//
//	g.DijkstraShortestPath(0, 4)
//	fmt.Println()
//	g.BellmanFord(0)
//}
