The time complexity of the Sieve is
\\[
    f\left( n \right ) = O\left( n\ln\left( \ln n \right) \right).
\\]

The analysis for the time complexity is a bit difficult, but the general idea is quite simple. Consider
the set \\( P = \left\\{ p \in \mathbb{P} : p \leq n \right\\} \\). Informally, the sieve makes at most
\\[
    \begin{matrix}
        \sum\_{p \in P} \frac{n}{p} & = &\frac{n}{2} + \frac{n}{3} + \frac{n}{5} + \cdots + \frac{n}{p'} \\\
                                    & = & n\left(\frac{1}{2} + \frac{1}{3} + \frac{1}{5} + \cdots + \frac{1}{p'} \right) \\\
                                    & = & n\ln\left( \ln n \right)
    \end{matrix}
\\]
iterations. The sum of reciprocal prime numbers is
\\[
    \sum\_{p \in \mathbb{P}} = \ln\left( \ln n \right)
\\]
which was proved by Euler (Euler's proof is summarized [here](http://www.math.uga.edu/~pollack/eulerprime.pdf)).
The sieve makes \\( \frac{n}{p} \\) iterations for some \\( p \in P \\) because for each iteration of the algorithm,
we mark the multiples of \\( p \\) less than \\( n \\) and assign \\( p \\) to the next unmarked number.

#### Why It's Important In Computer Science
Now that we're done with the mathematics portion of prime numbers, we can now explore its importance in computer science.
Sadly, we'll only go over a subset of algorithms involving prime numbers. Particuarly, we'll explore implementations
of the naive primacy test and Sieve of Eratosthenes. Finally, we'll explore an application of prime numbers in 
RSA encryption.

#### Naive Primacy Test 
We've pretty much described the algorithm for determining the primacy of numbers using the naive approach. Now it's time
to implement it. I'll have implementations for Python; however, the basic algorithm should be applicable to any
language.

```py
import math

def is_prime( n ):
    if n <= 1:
        return False
    for i in range( 2, math.floor( math.sqrt( n ) ) ):
        if n % i == 0:
            return False
    return True
    
def main():
    print( is_prime( 2 ) ) # True
    print( is_prime( 3 ) ) # True
    print( is_prime( 4 ) ) # False

if __name__ == '__main__':
    main()
```

#### Sieve of Eratosthenes
The Sieve of Eratosthenes is simple to implement as well. We start by initializing a list of numbers
\\( \text{list} = \left\\{ i: 2 \leq i \leq n \right\\} \\), setting \\( p = \text{list}[ 0 ] \\) for each iteration.
For each iteration, \\( \text{list}[ 0 ] \\) will always be a prime number because we'll remove each multiple of
\\( p \\) from the list of numbers if it still exists, leaving the next prime number as the first number in the list.

```py
def generate_primes( n ):
    primes = set()
    numbers = set( range( 2, n + 1 ) )

    while len( numbers ) > 0:
        p = numbers.pop()
        primes.add( p )

        multiple = p
        while multiple <= n:
            multiple += p
            if multiple in numbers:
                numbers.remove( multiple )



    return primes

def main():
    primes = generate_primes( 50 )
    print( primes )
    # {2, 3, 5, 37, 7, 41, 11, 43, 13, 47, 17, 19, 23, 29, 31} 

if __name__ == '__main__':
    main()
```

Using `set` in Python has its advantages. For one, the `in`, `add()` method, `pop()` method, and `remove()` method 
have an average running time of \\( O\left( 1 \right) \\). The worst case running time is \\( O\left( n \right) \\),
but it rarely happens assuming the set object has a robust hashing function. Since we use numbers, it's safe to assume
that the hashing function is robust enough to give constant time.

#### RSA Encryption
Prime numbers shine when it comes to cryptography and computer security. The 
[RSA](http://goo.gl/mPvP4F) encryption system is a 
gleaming example of why prime numbers are awesome. It's a public-key cryptographic system developed by
Ron Rivest, Adi Shamir, and Leonard Adleman, hence RSA. Public-key systems depend on the distribution of
public keys served to users to encrypt their messages to be decrypted by a server. 

The basis of the RSA encryption system relies primarily on
the nature of prime numbers and composite numbers. Specifically, factoring large composite numbers.
As of right now, there are currently *no* efficient algorithms for large integer factorization. This is perfect for
encryption systems due to impracticality of current integer factorization algorithms. In fact, the best
algorithm for factoring large integers 
(According to [Wikipedia](http://en.wikipedia.org/wiki/Integer_factorization#Current_state_of_the_art) :])
has a time complexity of
\\[
    O\left( \text{exp}\left( \left( \frac{64}{9}b \right)^\frac{1}{3} \log^\frac{2}{3} b \right)  \right).
\\]

The RSA encryption system has three main processes: Key Generation, Encryption, and Decryption. Key Generation
is the process of generating public and secret keys. The public key is essentially the product of two
large prime numbers. These numbers are kept secret while the public key is public. Users requesting the public
key can use it to encrypt their information, otherwise known as *plaintext*. They then use the public key
along with the RSA cipher to produce ciphertext. The *cipher* is an algorithm for encrypting the plaintext
into *ciphertext*, or the encrypted information. The secret key is another unknown number that is used in
the decryption stage.

I won't go into much detail about how the whole process works, but the basics of it goes as follows:

- 1) Server generates public and private keys
- 2) A person requests the public key, uses it to encrypt their plaintext and sends it to the server
- 3) The server uses the private key to decrypt the information

You can read about how the RSA three processes works [here](http://goo.gl/eFHkG4). One piece of advice I can recommend
is to *never implement the protocol yourself*. This is probably one of the golden rules of crytography. Never 
roll out your own implementation because more often than not, it'll have bugs that may compromise your 
security. People have worked on RSA, as well as many other crytographic systems, for many, many years. You're 
better off using something that has been thoroughly tested.

#### Conclusion
Prime numbers are truely awesome. We've looked over merely a subset of what we can accomplish with prime numbers 
in mathematics and computer science. While you may never have to do deal with prime numbers in your line of work,
just know that they have a huge influence on our daily lives more than what you think.