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

type DiWeightedGraph struct {
	WeightedGraph
}

func MakeDiWeightedGraph(numOfVertices int) DiWeightedGraph {
	g := DiWeightedGraph{
		WeightedGraph: MakeWeightedGraph(numOfVertices),
	}
	return g
}

func (g *DiWeightedGraph) AddEdge(src, dest, weight int) {
	destNode := &NodeWithWeight{vertex: dest, weight: weight, next: g.adjacencyList[src]}
	g.adjacencyList[src] = destNode

	g.appendWeight(weight)
}

// edges returns a 2 dimensional slice with all
// edges from one node to another in a graph.
//
// For Example for adjacency list (a linked list):
// A -> (B, 5) -> (C, 2)
// B ->
// C ->
//
// Returns:
// [ [A, B, 5],
//   [A, C, 2] ]
func (g *DiWeightedGraph) edges() [][]int {
	var edges [][]int
	for forNode := 0; forNode < g.numOfVertices; forNode++ {
		temp := g.adjacencyList[forNode]
		for temp != nil {
			edges = append(edges, []int{forNode, temp.vertex, temp.weight})
			temp = temp.next
		}
	}
	return edges
}
