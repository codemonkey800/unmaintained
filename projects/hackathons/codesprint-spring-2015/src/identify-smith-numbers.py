def digits(n):
    digits = []
    while n:
        digits.append(n % 10)
        n //= 10
    return list(reversed(digits))

def flat_list(l):
    return [item for sublist in l for item in sublist]

def is_smith_number(n):
    prime_factors = flat_list([digits(factor) for factor in factors(n)])
    n_digits = digits(n)

    return sum(prime_factors) == sum(n_digits)

    return True 
def factors(n):
    primes = []
    p = 2
    while p**2 <= n:
        while n % p == 0:
            primes.append(p)
            n //= p
        p += 1
    if n > 1:
        primes.append(n)
    return primes

if __name__ == '__main__':
    num = int(input())
    print(1) if is_smith_number(num) else print(0)