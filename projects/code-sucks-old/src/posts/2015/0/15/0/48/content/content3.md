The search for prime numbers consists primarily on two key features: tests for primacy and prime number 
generators. While I won't go over every test for primacy nor prime generator, I will go over tests and
generators that are significant and easy to understand.

#### Tests For Primacy
Testing for primacy is actually quite easy (Well at least for computers. There are two main tests I'd like to go
over: [The naive method](http://en.wikipedia.org/wiki/Primality_test#Naive_methods) 
and the [AKS test](http://en.wikipedia.org/wiki/AKS_primality_test).

The Naive method is actually quite simple. So simple that I won't provide a formal proof for it. Given a number
\\( n \\), we test for primacy by iterating the first numbers \\( i \leq \sqrt{n} \\). You may be wondering
why we only check up to \\( \sqrt{n} \\). The reasoning is that assuming \\( n \\) wasn't prime, it'd have
two factors \\( a \\) and \\( b \\). If \\( a > \sqrt{n} \\) or \\( b > \sqrt{n} \\), we'd have a product 
\\( a \cdot b > n \\). This proves to be advantageous because we reduce the time complexity from
\\( O\left( n \right) \\) to \\( O\left( \sqrt{n} \right) \\).

The AKS test for primacy is a bit more complicated. So complicated I won't provide a formal proof for it
(You can read the paper [here](http://www.cse.iitk.ac.in/users/manindra/algebra/primality_v6.pdf/)). 
Even though it's more complicated than the naive method, it's simple to explain. Consider a binomial 
\\[ \left( x + a \right)^n \\]
for some constant \\( a \in \mathbb{Z} \\). We have the following modulo congruence:
\\[ \left( x + a \right)^n \equiv x^n + a \bmod{n}. \\] 
For the uninitiated, a modulo congruence of the form \\( a \equiv b \bmod{n} \\) is true
iff \\( a - b \mid n \\) or \\( a - b \bmod{n} = 0 \\).

So by this defintion, it follows that \\( n \\) is prime iff the coffecients of the binomial
\\( \left( x + a \right)^n \\) are also divisible by \\( n \\). For instance, consider 
\\( n = 5, a = 1 \\). We have 
\\[ 
    \begin{matrix}
        \left( x + 1 \right)^5 - x^5 - 1 & = & x^5 + 5x^4 + 10x^3 + 10x^2 + 5x + 1 - x^5 - 1 \\\
                                         & = & 5x^4 + 10x^3 + 10x^2 + 5x.
    \end{matrix}
\\]
Notice that all the coffecients of the result are divisible by \\( 5 \\), implying that \\( n = 5 \\)
is prime. The great thing about the AKS primaility test is that *it works every time.* The problem?
**It's fucking slow.** The running time of this particular algorithm was determined to be
\\[ f\left( n \right) = O\left( \log^6 n \log^k \left( \log^6 n \right) \right). \\] 
But from a theoretical standpoint, it's great that AKS can test for primacy with 100% accuracy. 
As an added bonus, Numberphile also did a video for the AKS test: