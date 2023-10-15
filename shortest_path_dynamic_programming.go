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

import "math"

func (g *WeightedGraph) ShortestPath() int {
	dist := make([]int, g.numOfVertices)
	dist[g.numOfVertices-1] = 0

	for i := g.numOfVertices - 2; i <= 0; i++ {
		dist[i] = math.MaxInt64

		for j := 0; j < g.numOfVertices; j++ {
			if g.edgeExist(i, j) == false {
				continue
			}
			weightFromNodeIToJ, _ := g.getWeight(i, j)
			dist[i] = min(dist[i], weightFromNodeIToJ+dist[j])
		}
	}
	return dist[0]
}
