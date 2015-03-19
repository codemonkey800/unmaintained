#### Introduction
Matrices are mathematical objects that represent B grid of numbers (or other objects). For example,
a typical \\(m \times n\\) matrix can be represented as:
\\[
    \mathbf{A} = 
    \begin{pmatrix}
        A\_{11} & A\_{12} & A\_{13} & \cdots & A\_{1n} \\\
        A\_{21} & A\_{22} & A\_{23} & \cdots & A\_{2n} \\\
        \vdots  & \vdots  & \vdots  & \ddots & \vdots \\\
        A\_{m1} & A\_{m2} & A\_{m3} & \cdots & A\_{mn} \\\
    \end{pmatrix},
\\]
where \\(m\\) denotes the amount of rows and \\(n\\) denotes the amount of columns. Typically,
matrices are represented with uppercase, bold letters like \\(\mathbf{A}\\).

However, we'll be focusing on square matrices, matrices where \\(m = n\\). These apparently
show up a lot in computer science, and thus our attention will be on them. Multiplying matrices
is a simple operation. 

> **Defintion 1**
> 
> Given two matrices \\(\mathbf{A}\_{n \times n}\\) and \\(\mathbf{B}\_{n \times n}\\), 
> their product is denoted as \\(\mathbf{A} \cdot \mathbf{B}\\),
> and the \\(C\_{ij}\\)-th value is given by
>
> \\[
>     C\_{ij} = \sum\_{k=1}^n A\_{ik} B\_{kj}.
> \\]
>
> Essentially, the \\(C\_{ij}\\)-th value is calculated from the dot product of the 
> \\(i\\)-th row and \\(j\\)-th column of matrices \\(\mathbf{A}\\) and \\(\mathbf{B}\\), respectively.

So you can probably already imagine how matrix multiplication works. You iterate through index
\\(i\\), and then iterate through index \\(j\\), and then finally iterate through index \\(k\\),
and then assign the \\(C\_{ij}\\)-th value. Well you're right. And here's the implementation:

```py
def naive_matrix_mul(A, B):
    # Make sure both matrices are n x n
    assert len(A) == len(B) and len(A[0]) == len(B[0])

    n = len(A)
    C = Matrix(n, n)

    for i in range(n):
        for j in range(n):
            C[i][j] = 0
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]

    return C
```

Let's avoid the complexities of variable naming and stick to typical mathematical variable names.
Of course, the running time of this algorithm is \\(O\left(n^3\right)\\), which is alright. But
then came along some guy named [Volker Strassen](http://en.wikipedia.org/wiki/Volker_Strassen)
who just had to improve the square matrix multiplication with his algorithm incidentally
named *Strassen's algorithm.*

#### Strassen's Algorithm
> *Strassen’s method is not at all obvious. (This might be the biggest understatement in this book.)*
>
> ~ CLRS on Strassen’s algorithm

It's true, the algorithm is pretty complicated. But it can be done. The algorithm is divided into four parts:


- 1) Divide matrices \\(\mathbf{A}\\), \\(\mathbf{B}\\), and \\(\mathbf{C}\\) into \\(\frac{n}{2} \times \frac{n}{2}\\)
     matrices. Doing so will take \\(O\left(n^2\\right)\\) time since we have to copy elements from each matrix
     into the submatrices.  

     Creating the submatrices works as follows. Consider a matrix of size \\(4 \times 4\\):

\\[
   \mathbf{A} = 
   \begin{pmatrix}
       \mathbf{A}\_{11} & \mathbf{A}\_{12} & \mathbf{A}\_{13} & \mathbf{A}\_{14} \\\
       \mathbf{A}\_{21} & \mathbf{A}\_{22} & \mathbf{A}\_{23} & \mathbf{A}\_{24} \\\
       \mathbf{A}\_{31} & \mathbf{A}\_{32} & \mathbf{A}\_{33} & \mathbf{A}\_{34} \\\
       \mathbf{A}\_{41} & \mathbf{A}\_{42} & \mathbf{A}\_{43} & \mathbf{A}\_{44}
   \end{pmatrix}.
\\]

Splitting the matrix \\(\mathbf{A}\\) into \\(\frac{n}{2} \times \frac{n}{2}\\) submatrices creates a
\\(2 \times 2\\) matrix of matrices, resulting in the following:

\\[
   \mathbf{A} =
   \begin{pmatrix}
       \mathbf{A}\_{11} & \mathbf{A}\_{12} \\\
       \mathbf{A}\_{21} & \mathbf{A}\_{22}
   \end{pmatrix} =
   \begin{pmatrix}
       \begin{pmatrix} \mathbf{A}\_{11} & \mathbf{A}\_{12} \\\ \mathbf{A}\_{21} & \mathbf{A}\_{22} \end{pmatrix} & \begin{pmatrix} \mathbf{A}\_{13} & \mathbf{A}\_{14} \\\ \mathbf{A}\_{23} & \mathbf{A}\_{24} \end{pmatrix} \\\
       \begin{pmatrix} \mathbf{A}\_{31} & \mathbf{A}\_{32} \\\ \mathbf{A}\_{41} & \mathbf{A}\_{42} \end{pmatrix} & \begin{pmatrix} \mathbf{A}\_{33} & \mathbf{A}\_{34} \\\ \mathbf{A}\_{43} & \mathbf{A}\_{44} \end{pmatrix}
   \end{pmatrix}.
\\]

- 2) Create 10 different matrices, \\(\mathbf{S}\_1, \mathbf{S}\_2, \dots, \mathbf{S}\_{10}\\), 
     each being \\(\frac{n}{2} \times \frac{n}{2}\\) as well. This also takes \\(O\left(n^2\\right)\\) time.

The equations for producing the matrices are given below:

\\[
    \mathbf{S}\_1 = \mathbf{B}\_{12} - \mathbf{B}\_{22}
\\]
\\[
    \mathbf{S}\_2 = \mathbf{A}\_{11} + \mathbf{A}\_{12}
\\]
\\[
    \mathbf{S}\_3 = \mathbf{A}\_{21} + \mathbf{A}\_{22}
\\]
\\[
    \mathbf{S}\_4 = \mathbf{B}\_{21} - \mathbf{B}\_{11}
\\]
\\[
    \mathbf{S}\_5 = \mathbf{A}\_{11} + \mathbf{A}\_{22}
\\]
\\[
    \mathbf{S}\_6 = \mathbf{B}\_{11} + \mathbf{B}\_{22}
\\]
\\[
    \mathbf{S}\_7 = \mathbf{A}\_{12} - \mathbf{A}\_{22}
\\]
\\[
    \mathbf{S}\_8 = \mathbf{B}\_{21} + \mathbf{B}\_{22}
\\]
\\[
    \mathbf{S}\_9 = \mathbf{A}\_{11} - \mathbf{A}\_{21}
\\]
\\[
    \mathbf{S}\_{10} = \mathbf{B}\_{11} + \mathbf{B}\_{12}
\\]

- 3) Next, create 7 matrix products, \\(\mathbf{P}\_1, \mathbf{P}\_2, \dots, \mathbf{P}\_7\\), 
     using the the 10 previously created matrices.

The equations for the matrix products are given below:

\\[
    \mathbf{P}\_1 = \mathbf{A}\_{11} \mathbf{S}\_1
\\]
\\[
    \mathbf{P}\_2 = \mathbf{S}\_2 \mathbf{B}\_{22}
\\]
\\[
    \mathbf{P}\_3 = \mathbf{S}\_3 \mathbf{B}\_{11}
\\]
\\[
    \mathbf{P}\_4 = \mathbf{A}\_{11} \mathbf{S}\_4
\\]
\\[
    \mathbf{P}\_5 = \mathbf{S}\_5 \mathbf{S}\_6
\\]
\\[
    \mathbf{P}\_6 = \mathbf{S}\_7 \mathbf{S}\_8
\\]
\\[
    \mathbf{P}\_7 = \mathbf{S}\_9 \mathbf{S}\_{10}
\\]

- 4) Finally, compute the submatrices of \\(\mathbf{C}\\), 
     \\(\mathbf{C}\_{11}, \mathbf{C}\_{12}, \mathbf{C}\_{21}, \mathbf{C}\_{22}\\), using the 
     the previously computed matrices.

The equations for the submatrices of \\(\mathbf{C}\\) are given below as components of \\(\mathbf{C}\\)

\\[
    \begin{matrix}
        \mathbf{C} & = &
        \begin{pmatrix}
            \mathbf{C}\_{11} & \mathbf{C}\_{12} \\\
            \mathbf{C}\_{21} & \mathbf{C}\_{22}
        \end{pmatrix} \\\
        & = &
        \begin{pmatrix}
            \mathbf{P}\_5 + \mathbf{P}\_4 - \mathbf{P}\_2 + \mathbf{P}\_6 & \mathbf{P}\_1 + \mathbf{P}\_2 \\\
            \mathbf{P}\_3 + \mathbf{P}\_4                                 & \mathbf{P}\_5 + \mathbf{P}\_1 - \mathbf{P}\_3 - \mathbf{P}\_7
        \end{pmatrix}
    \end{matrix}
\\]


I know what you're thinking. Doing all of this is complete bullshit and unnecessary. And I absolutely agree with you.
But notice an interesting property about this solution. It's a **divide and conquer** problem. Take a look at 
step 3. We create *seven matrix products*. At this step, we recursively call Strassen’s algorithm to compute those
products, thus dividing the problem into 7 subproblems.

Since we're working with a recursive algorithm, the base case occurs when the matrices 
\\(\mathbf{A}\\) and \\(\mathbf{B}\\) are of \\(n \times n = 1 \times 1\\), and we compute 
\\[
    C\_{11} = A\_{11} B\_{11},
\\]
where \\(\mathbf{C}\\) in the base case is a \\(1 \times 1\\) matrix.

This takes \\(\theta\left(1\right)\\) time. The largest running time other than the main algorithm itself
is \\(\theta\left(n^2\right)\\) (From splitting, adding, and subtracting our matrices). And our algorithm 
splits itself into 7 main problem. Thus, we have the following recurrence:
\\[
    T\left(n\right) =
    \begin{cases}
        \theta\left(1\right)                        & \text{if } n = 1 \\\
        7T\left(n/2\right) + \theta\left(n^2\right) & \text{if } n > 1
    \end{cases}
\\]

From the master method, the recurrence has the following solution:
\\[
    f\left(n\right) = \theta\left(n^{\log\_2 7}\right) = \theta\left(n^{\lg 7}\right)
    \approx \theta\left(n^{2.80736}\right).
\\]

#### Implementation
Now that we've gone over the nitty gritty of the algorithm, it's finally time to implement it. Now trust me
on this when I tell you the algorithm is shitty. Because it really is. Also, I'll be using variable names like
`A`, `B`, `C`, and `A_11` for the various matrices I'll be using. You may rename it to whatever you want.

First off, we start with a function, `strassen_recursive(A, B)`, where `A` and `B` are both matrices presumably
of size \\(n \times n\\). 

We start the algorithm by checking if the both matrices are \\(n \times n\\), then initializing 
a matrix \\(\mathbf{C}\\):

```py
assert A.rows == B.rows and A.cols == B.cols
n = A.rows
C = Matrix(n, n)
```

We then start with the base case, where \\(n = 1\\):

```py
if n == 1:
    C[0][0] = A[0][0] * B[0][0]
```

Next, we handle the general case. We start by creating submatrices of size \\(\frac{n}{2} \times \frac{n}{2}\\)
and then copying over the matrix values to the submatrices:

```py
else:
    n_half = n // 2

    A_11 = Matrix(n_half, n_half)
    A_12 = Matrix(n_half, n_half)
    A_21 = Matrix(n_half, n_half)
    A_22 = Matrix(n_half, n_half)

    B_11 = Matrix(n_half, n_half)
    B_12 = Matrix(n_half, n_half)
    B_21 = Matrix(n_half, n_half)
    B_22 = Matrix(n_half, n_half)

    for i in range(n_half):
        for j in range(n_half):
            A_11[i][j] = A[i][j]
            A_12[i][j] = A[i][j + n_half]
            A_21[i][j] = A[i + n_half][j]
            A_22[i][j] = A[i + n_half][j + n_half]

            B_11[i][j] = B[i][j]
            B_12[i][j] = B[i][j + n_half]
            B_21[i][j] = B[i + n_half][j]
            B_22[i][j] = B[i + n_half][j + n_half]
```

Next, we compute all \\(\mathbf{S}\_i\\) equations:

```py
    S_1  = B_12 - B_22
    S_2  = A_11 + A_12
    S_3  = A_21 + A_22
    S_4  = B_21 - B_11
    S_5  = A_11 + A_22
    S_6  = B_11 + B_22
    S_7  = A_12 - A_22
    S_8  = B_21 + B_22
    S_9  = A_11 - A_21
    S_10 = B_11 + B_12
```

Here's the important part. We'll now compute the matrix products \\(\mathbf{P}\_i)
using a recursive call to `strassen_recursive()`:

```py
    P_1 = strassen_recursive(A_11, S_1)
    P_2 = strassen_recursive(S_2, B_22)
    P_3 = strassen_recursive(S_3, B_11)
    P_4 = strassen_recursive(A_22, S_4)
    P_5 = strassen_recursive(S_5, S_6)
    P_6 = strassen_recursive(S_7, S_8)
    P_7 = strassen_recursive(S_9, S_10)
```

And finally, we'll compute the submatrices of \\(\mathbf{C}\\) and then copy them back over to
\\(\mathbf{C}\\):

```py
    C_11 = P_5 + P_4 - P_2 + P_6
    C_12 = P_1 + P_2
    C_21 = P_3 + P_4
    C_22 = P_5 + P_1 - P_3 - P_7

    for i in range(n_half):
        for j in range(n_half):
            C[i][j] = C_11[i][j]
            C[i][j + n_half] = C_12[i][j]
            C[i + n_half][j] = C_21[i][j]
            C[i + n_half][j + n_half] = C_22[i][j]
```

And here's the complete source code:

```py
def strassen_recursive(A, B): 
    assert A.rows == B.rows and A.cols == B.cols
    n = A.rows
    C = Matrix(n, n)

    if n == 1:
        C[0][0] = A[0][0] * B[0][0]
    else:
        n_half = n // 2

        A_11 = Matrix(n_half, n_half)
        A_12 = Matrix(n_half, n_half)
        A_21 = Matrix(n_half, n_half)
        A_22 = Matrix(n_half, n_half)

        B_11 = Matrix(n_half, n_half)
        B_12 = Matrix(n_half, n_half)
        B_21 = Matrix(n_half, n_half)
        B_22 = Matrix(n_half, n_half)

        for i in range(n_half):
            for j in range(n_half):
                A_11[i][j] = A[i][j]
                A_12[i][j] = A[i][j + n_half]
                A_21[i][j] = A[i + n_half][j]
                A_22[i][j] = A[i + n_half][j + n_half]

                B_11[i][j] = B[i][j]
                B_12[i][j] = B[i][j + n_half]
                B_21[i][j] = B[i + n_half][j]
                B_22[i][j] = B[i + n_half][j + n_half]

        S_1  = B_12 - B_22
        S_2  = A_11 + A_12
        S_3  = A_21 + A_22
        S_4  = B_21 - B_11
        S_5  = A_11 + A_22
        S_6  = B_11 + B_22
        S_7  = A_12 - A_22
        S_8  = B_21 + B_22
        S_9  = A_11 - A_21
        S_10 = B_11 + B_12

        P_1 = strassen_recursive(A_11, S_1)
        P_2 = strassen_recursive(S_2, B_22)
        P_3 = strassen_recursive(S_3, B_11)
        P_4 = strassen_recursive(A_22, S_4)
        P_5 = strassen_recursive(S_5, S_6)
        P_6 = strassen_recursive(S_7, S_8)
        P_7 = strassen_recursive(S_9, S_10)

        C_11 = P_5 + P_4 - P_2 + P_6
        C_12 = P_1 + P_2
        C_21 = P_3 + P_4
        C_22 = P_5 + P_1 - P_3 - P_7

        for i in range(n_half):
            for j in range(n_half):
                C[i][j] = C_11[i][j]
                C[i][j + n_half] = C_12[i][j]
                C[i + n_half][j] = C_21[i][j]
                C[i + n_half][j + n_half] = C_22[i][j]

    return C
```

#### Conclusion
I know this post is a lot to take, but I hope this gives a quick overview of Strassen’s algorithm.
There are, however, limitations in my implementation. The algorithm only works on matrix sizes
of power 2. So a \\(3 \times 3\\) call will result in an incorrect product.

Hopefully this post gives you a better understanding of the algorithm. But please **do not use my
implementation.** There are *better* libraries out there for matrix calculations, so use them.

And finally, **DAMN YOU STRASSEN FOR THIS HARD ALGORITHM TO IMPLEMENT!**