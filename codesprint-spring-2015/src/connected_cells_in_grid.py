from math import sqrt, ceil
import sys

class Node:
    def __init__(self, data, coords):
        self.data = data
        self.coords = coords

    def distance(self, otherNode):
        return sqrt((self.coords[0] - otherNode.coords[0])**2 + (self.coords[1] - otherNode.coords[1])**2)

    def get_connected_nodes(self, mat):
        row = self.coords[0]
        col = self.coords[1]

        min_row = max(row - 1, 0)
        max_row = min(row + 1, len(mat) - 1)
        min_col = max(col - 1, 0)
        max_col = min(col + 1, len(mat[0]) - 1)

        nodes = set()
        for i in range(min_row, max_row + 1):
            for j in range(min_col, max_col + 1):
                if mat[i][j].data == 1 and self.distance(mat[i][j]) <= sqrt(2):
                    nodes.add(mat[i][j])
        return nodes

    def __str__(self):
        return 'Node[{0}, {1}]'.format(str(self.data), str(self.coords))

def largest_region(mat):
    regions = []

    for row in mat:
        for node in row:
            if node.data == 1:
                nodes = node.get_connected_nodes(mat)

                region_found = False
                for region in regions:
                    if len(nodes & region) != 0:
                        region.update(nodes)
                        region_found = True

                if not region_found:
                    regions.append(nodes)

    max_region = 0
    for region in regions:
        max_region = max(len(region), max_region)

    return max_region

if __name__ == '__main__':
    rows = int(input())
    cols = int(input())

    mat = []

    for row in range(rows):
        mat.append([int(col) for col in input().strip().split(' ')])

    for row in range(rows):
        for col in range(cols):
            mat[row][col] = Node(mat[row][col], (row, col))

    print(largest_region(mat))