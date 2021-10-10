graph = {
    'A' : ['B'],
    'B' : ['F','G'],
    'C' : ['D'],
    'D' : ['H'],
    'E' : [],
    'F' : ['E'],
    'G' : ['C'],
    'H' : [] 
}

visitedBFS = []
queue = []

def bfs(visited, graph, node):
    visited.append(node)
    queue.append(node)

    while queue:
        s = queue.pop(0)
        print(s, end = " ")
        if s == 'D':
            break
        for neighbour in graph[s]:
            if neighbour not in visited:
                visited.append(neighbour)
                queue.append(neighbour)

visitedDFS= set()

def dfs(visited, graph, node):
    if node not in visited:
        print(node, end = " ")
        visitedDFS.add(node)
        for neighbour in graph[node]:
            if node == 'D':
                break
            dfs(visitedDFS, graph, neighbour)

# from a to d using bfs
print("Search result of 'D' using BFS:")
bfs(visitedBFS,graph, 'A')

print()

# from a to d using dfs
print("Search result of 'D' using DFS:")
dfs(visitedDFS,graph, 'A')