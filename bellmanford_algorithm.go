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
	"math"
)

// BellmanFord is a shortest path algorithm
// in a directed graph. It's main advantage over DijkstraShortestPath is where DijkstraShortestPath
// doesn't work with negative edge weights, BellmanFord does. Although at
// the cost of worse time complexity of O(EV).
// https://youtu.be/lyw4FaxrwHg
//
// Algorithm:
// Let's define a few variables:
//	- Let E be the number of edges
//	- Let V be the number of vertices
//	- Let S be the starting node
//	- Let D be an array of size V that tracks the best distance from S to each node.
//
// Then,
//  - 1. Set every entry in D to +inf
//  - 2. Set D[S]=0
//  - 3. Relax each edge V-1 times:
//    for i:=0; i < V-1; i=i++:
//	    for edge := range graph.edges:
//		--relax edge (update D with shorter path)--
//         if D[edge.from] + edge.cost < D[edge.to]:
//           D[edge.to] = D[edge.from] + edge.cost
//
//    --Repeat to find nodes caught in a negative cycle--
//    for i:=0; i<V-1; i=i++:
//	    for edge := graph.edges:
//        if D[edge.from] + edge.cost < D[edge.to]:
//          D[edge.to] = -inf
func (g *DiWeightedGraph) BellmanFord(src int) []float64 {
	dist := make([]float64, g.numOfVertices)

	for i := range dist {
		dist[i] = math.Inf(+1)
	}
	dist[src] = 0

	for i := 0; i < g.numOfVertices-1; i++ {
		// iterate over directed edges from jth vertex
		for _, edge := range g.edges() {
			from, to, weight := edge[0], edge[1], edge[2]
			if dist[from] != math.Inf(+1) && dist[from]+float64(weight) < dist[to] {
				dist[to] = dist[from] + float64(weight)
			}
		}
	}

	// Repeat to find nodes caught in a negative cycle
	for _, edge := range g.edges() {
		from, to, weight := edge[0], edge[1], edge[2]
		if dist[from]+float64(weight) < dist[to] {
			// Graph contains negative weight cycles
			dist[to] = math.Inf(-1)
		}
	}

	// Print Distance
	fmt.Printf("Vertex Distance from source: %d\n", src)
	for i := 0; i < g.numOfVertices; i++ {
		fmt.Printf("%d\t\t%f\n", i, dist[i])
	}
	return dist
}
