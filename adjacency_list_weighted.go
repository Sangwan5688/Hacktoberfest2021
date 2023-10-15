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
	"DSA/sorting"
	"fmt"
)

type WeightedGraph struct {
	numOfVertices int
	weights       []int
	adjacencyList []*NodeWithWeight
}

type NodeWithWeight struct {
	vertex int
	weight int
	next   *NodeWithWeight
}

type WeightedGraphError struct {
	errorString string
}

func (e WeightedGraphError) Error() string {
	return e.errorString
}

func MakeWeightedGraph(numOfVertices int) WeightedGraph {
	g := WeightedGraph{
		adjacencyList: make([]*NodeWithWeight, numOfVertices),
		numOfVertices: numOfVertices}
	return g
}

func (g *WeightedGraph) AddEdge(src, dest, weight int) {
	destNode := &NodeWithWeight{vertex: dest, weight: weight, next: g.adjacencyList[src]}
	g.adjacencyList[src] = destNode

	srcNode := &NodeWithWeight{vertex: src, weight: weight, next: g.adjacencyList[dest]}
	g.adjacencyList[dest] = srcNode

	g.appendWeight(weight)
}

// appendWeight append unique weight to g.weights
func (g *WeightedGraph) appendWeight(weight int) {
	for i := range g.weights {
		if g.weights[i] == weight {
			return
		}
	}
	g.weights = append(g.weights, weight)
}

// getSortedEdgesBasedOnWeights get a 2 dimensional slice with all
// possible combination (repeating edges) of edges from one node to another sorted in order of weights.
//
// For Example for adjacency list (a linked list):
// A -> (B, 5) -> (C, 2)
// B -> (A, 5)
// C -> (A, 2)
//
// Returns:
// [ [A, C, 2],
//   [C, A, 2],
//	 [B, A, 5],
//   [A, B, 5] ]
func (g *WeightedGraph) getSortedEdgesBasedOnWeights() [][]int {
	var sortedAdjacencyList [][]int
	g.weights = sorting.InsertionSort(g.weights)
	for _, weight := range g.weights {
		for forNode := 0; forNode < g.numOfVertices; forNode++ {
			temp := g.adjacencyList[forNode]
			for temp != nil {
				if temp.weight == weight {
					sortedAdjacencyList = append(sortedAdjacencyList, []int{forNode, temp.vertex, temp.weight})
				}
				temp = temp.next
			}
		}
	}
	return sortedAdjacencyList
}

// GetAdjacencyList returns a slice containing all nodes
// adjacent to forNode
func (g *WeightedGraph) GetAdjacencyList(forNode int) []*NodeWithWeight {
	var adjacencyList []*NodeWithWeight
	temp := g.adjacencyList[forNode]
	for temp != nil {
		adjacencyList = append(adjacencyList, temp)
		temp = temp.next
	}
	return adjacencyList
}

// GetEdges returns a slice containing edges adjacent to forNode
func (g *WeightedGraph) GetEdges(forNode int) []Edge {
	var edges []Edge
	temp := g.adjacencyList[forNode]
	for temp != nil {
		edges = append(edges, Edge{from: forNode, to: temp.vertex, weight: temp.weight})
		temp = temp.next
	}
	return edges
}

func (g *WeightedGraph) PrintAdjacencyList() {
	for i := 0; i < g.numOfVertices; i++ {
		fmt.Printf("Adjacency List of vertex %d [v, w]", i)
		temp := g.adjacencyList[i]
		for temp != nil {
			fmt.Printf(" -> (%d, %d)", temp.vertex, temp.weight)
			temp = temp.next
		}
		println()
	}
}

// union find is a data structure that keeps tracks of
// elements which are split into one or more disjoint sets.
// It's two primary operations are union and find.
// https://youtu.be/ibjEGG7ylHk

// find finds the group the Node belongs to
func (g *WeightedGraph) find(parent []int, i int) int {
	if parent[i] == i {
		return i
	}
	return g.find(parent, parent[i])
}

// union merges two groups of Nodes together
func (g *WeightedGraph) union(parent, rank []int, group1, group2 int) ([]int, []int) {
	xRoot := g.find(parent, group1)
	yRoot := g.find(parent, group2)

	if rank[xRoot] < rank[yRoot] {
		parent[xRoot] = yRoot
	} else if rank[xRoot] > rank[yRoot] {
		parent[yRoot] = xRoot
	} else {
		parent[yRoot] = xRoot
		rank[xRoot]++
	}
	return parent, rank
}

// getDistance returns the distance (edge weight) from
// one node to another
func (g *WeightedGraph) getDistance(from, to int) int {
	temp := g.adjacencyList[from]
	for temp != nil {
		if temp.vertex == to {
			return temp.weight
		}
		temp = temp.next
	}
	return 0
}

// edgeExist returns a slice containing all nodes
// adjacent to forNode
func (g *WeightedGraph) edgeExist(fromNode, toNode int) bool {
	temp := g.adjacencyList[fromNode]
	for temp != nil {
		if temp.vertex == toNode {
			return true
		}
		temp = temp.next
	}
	return false
}

func (g *WeightedGraph) getWeight(fromNode, toNode int) (int, error) {
	temp := g.adjacencyList[fromNode]
	for temp != nil {
		if temp.vertex == toNode {
			return temp.weight, nil
		}
		temp = temp.next
	}
	return -1, WeightedGraphError{"Edge doesn't Exist"}
}
