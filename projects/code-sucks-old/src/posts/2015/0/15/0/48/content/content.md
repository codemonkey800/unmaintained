#### Introduction
We all know from elementary school that prime numbers are special from their basic property that
they're only divisible by themselves and \\(1\\). More formally, a prime number \\(p\\) is prime
iff \\( p \bmod{n} = 0 \\) for some \\( n = 1 \vee n = p \\). Because of that shitty little fact,
prime numbers have been extensively studied in both mathematics and computer science. 

#### Why It Matters In Mathematics
> Prime numbers are the basic building blocks of mathematics.
> - ~ Charlie Eppes from Numb3rs

Before we go into the fun involving prime numbers and computer science, we need to discuss its importance
in mathematics (Especially since the fun in computer science *requires* the mathematical theory).

To begin, we need to recognize that a lot of branches of mathematics actually don't give a shit about
prime numbers. To most branches, it's simply just another number. However, in the branch of Number Theory,
numbers, especially primes, are the core focus.

#### There Are Infinite Primes I Tell Ya!

In mathematics, there are two core numbers: composites and primes. Primes are, well, primes, and composites
are numbers that are *composed of primes*. The interesting property of primacy has raised a whole lot of 
questions and proofs in the mathematical community. For instance, an interesting question is whether the
set of prime numbers is infinite, or \\( \left|\mathbb{P}\right| = \aleph_0 \\)( \\( \aleph_0 \\) 
means *infinite set* ). The proof is simple:

> **Theorem** *There are infinite prime numbers*
>
> **Proof** Assume that the set of prime numbers are finite and are defined to be the
> set \\( \mathbb{P} = \left\\{ p : p \text{ is prime} \\right\\} \\). Let 
> \\( p\_n \\) be the \\( n \\)-th prime number in \\( \mathbb{P} \\). Let the number
> \\[ \displaystyle P = \prod\_{i=1}^n p\_i + 1 = p\_1 p\_2 p\_3 \cdots p\_n + 1. \\] 
> Obviously, \\( P \not\in \mathbb{P} \\), so it's composite. It follows that for
> any \\( p \in \mathbb{P} \\), \\( P \not\mid p \\) since \\( P \bmod{p} = 1 \\),
> contradicting the assumption that the set of primes is finite.

Another interesting tidbit of mathematical history is this proof by Euclid was one of the first instances
of using proofs by contradiction. Here's a nice [Numberphile](https://www.youtube.com/user/numberphile)
video for the proof above:
