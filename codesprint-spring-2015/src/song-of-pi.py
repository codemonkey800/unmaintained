PI = [int(digit) for digit in list('31415926535897932384626433833')]

def is_pi_song(s):
    lengths = [len(word) for word in s.split(' ')]
    for i in range(len(lengths)):
        if lengths[i] != PI[i]:
            return False
    return True

if __name__ == '__main__':
    cases = int(input())
    for case in range(cases):
        if is_pi_song(input()):
            print('It\'s a pi song.')
        else:
            print('It\'s not a pi song.')