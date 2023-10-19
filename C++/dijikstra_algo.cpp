#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

// Define a structure to represent a graph edge
struct Edge {
    int destination;
    int weight;
};

// Define a function to find the shortest paths from a source vertex to all other vertices in a graph
void Dijkstra(vector<vector<Edge>>& graph, int source, vector<int>& distance) {
    int V = graph.size(); // Number of vertices

    // Create a min-heap (priority queue) to store vertices and their distances
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    // Initialize distances and set all initially to INFINITE
    for (int i = 0; i < V; i++) {
        distance[i] = INT_MAX;
    }

    // Distance from the source vertex to itself is 0
    distance[source] = 0;

    // Add the source vertex to the priority queue
    pq.push({0, source});

    while (!pq.empty()) {
        int u = pq.top().second; // Get the vertex with the minimum distance
        pq.pop();

        // Iterate through all adjacent vertices of the extracted vertex 'u'
        for (const Edge& edge : graph[u]) {
            int v = edge.destination;
            int weight = edge.weight;

            // If a shorter path to 'v' is found, update the distance and push it to the priority queue
            if (distance[u] != INT_MAX && distance[u] + weight < distance[v]) {
                distance[v] = distance[u] + weight;
                pq.push({distance[v], v});
            }
        }
    }
}

int main() {
    int V = 5; // Number of vertices
    int source = 0; // Source vertex

    vector<vector<Edge>> graph(V); // Adjacency list representation of the graph
    vector<int> distance(V); // To store the shortest distances

    // Adding edges to the graph
    graph[0].push_back({1, 2});
    graph[0].push_back({3, 6});
    graph[1].push_back({2, 3});
    graph[1].push_back({3, 8});
    graph[1].push_back({4, 5});
    graph[2].push_back({4, 7});
    graph[3].push_back({4, 9});

    Dijkstra(graph, source, distance);

    // Output the shortest distances from the source to all other vertices
    for (int i = 0; i < V; i++) {
        cout << "Shortest distance from " << source << " to " << i << " is: " << distance[i] << endl;
    }

    return 0;
}
