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

// DFS performs a depth-first search on Adjacency List
//
// Parameters
// 	- `source`: source vertex
//  - `destination`: destination vertex
//  - `asked`: a set of all nodes that are already checked
func (g *Graph) DFS(source, destination interface{}, asked ...interface{}) bool {
	if contains(asked, source) {
		return false
	}
	asked = append(asked, source)
	if source == destination {
		return true // stopping condition
	}
	for _, adjacentNode := range g.GetAdjacencyList(source) {
		if g.DFS(adjacentNode, destination, asked) {
			return true
		}
	}
	return false
}
