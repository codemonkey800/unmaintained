def is_kaprekar_number(n):
    digits = list(str(n**2))
    left = ''.join(digits[:len(digits) // 2])
    right = int(''.join(digits[len(digits) // 2:]))

    if len(left) == 0:
        left = 0
    else:
        left = int(left)

    return n == left + right

if __name__ == '__main__':
    low = int(input())
    high = int(input())

    kaperkar_numbers = []
    for i in range(low, high + 1):
        if(is_kaprekar_number(i)):
            kaperkar_numbers.append(i)

    if(len(kaperkar_numbers) == 0):
        print('INVALID RANGE')
    else:
        out_str = ''
        for num in kaperkar_numbers:
            out_str += str(num) + ' '
        print(out_str)