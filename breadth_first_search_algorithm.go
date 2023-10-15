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
	"DSA/queue"
)

func (g Graph) BFS(source, destination interface{}) (bool, error) {
	// Queue to ask next node for their adjacency
	nextNodeQueue := queue.MakeQueue()
	// Hashmap to tell which nodes are visited
	// if they are visited, we'll not check its adjacency
	visited := make(map[interface{}]interface{})

	nextNodeQueue.Enqueue(source)
	visited[source] = true

	for nextNodeQueue.IsEmpty() == false {
		currentNode, err := nextNodeQueue.Dequeue()
		if err != nil {
			return false, err
		}
		if currentNode == destination {
			return true, nil
		}
		visited[currentNode] = true

		// Add all nodes which are adjacent to currenNode
		// BUT are not visited yet
		for _, nextNode := range g.GetAdjacencyList(currentNode) {
			if _, found := visited[nextNode]; found != true {
				nextNodeQueue.Enqueue(nextNode.vertex)
			}
		}
	}
	return false, nil
}
