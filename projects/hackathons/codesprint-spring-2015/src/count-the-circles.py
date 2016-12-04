import numpy as np
from scipy import ndimage

if __name__ == '__main__':
    rows, cols = (int(val) for val in input().strip().split(' '))
    pixels = np.zeros(rows, cols, dtype=np.uint8)

    for row in range(rows):
        column = [[int(num) for num in val.split(',')] for val in input().strip().split(' ')]
        for col in range(cols):
            data[row, col] = column[col]

    print(pixels)

