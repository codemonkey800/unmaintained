#### Generating Primes
On the other side of the spectrum, we can also generate primes. Generating primes are typically done
using prime number sieves. The [Sieve of Eratosthenes](http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)
is the easiest to implement. The algorithm is goes as follows:

- 1) Initalize a list of numbers \\( \left\\{ i : 2 \leq i \leq n \right\\} \\)
- 2) Let \\( p = 2 \\), the first prime
- 3) Mark each multiple of \\( p \\) less than \\( n \\)
- 4) Let \\( p \\) be the first number not marked by the last iteration. This new number will be a prime number. Repeat steps 2-4

To understand how the sieve works, take a look at this video by Ron Barrow: