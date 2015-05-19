#include<iostream>

//Function pointer for a general function f(x)
typedef double (*function_t)(double x);
  
//Returns 64-bit calculation of nth Fibonacci Number.
//The limit of this function is 2^64 - 1 = 1.845e19
unsigned long long fib(unsigned long long n){
  
    if(n <= 0){
        return 1;
    }else{
        return n * fib(n - 1);
    }
  
}

//Returns the square of x = x^2
double square(double x){
    return x * x;
}

//Returns the derivative of a function pointer f with respect to x for the value x
//The limit of the derivative approaches deltaX, so the accuracy of the
//value of the derivative is dependent on the caller.
double derivative(function_t f, double x, double deltaX){
    
    double dx = (f(x + deltaX) - f(x))/deltaX;
    
    return dx;
}

//Calculates the integral of a function pointer f with respect to x
//on the closed interval [a, b] using an n amount of rectangles
//to approximate the value.
//The accuracy of the integral is dependent on the caller.
double integral(function_t f, double a, double b, int n_rects){

    double deltaX = (b - a)/n_rects;
    
    double sum = 0;
    
    while(a <= b){
        
        sum += f(a) * deltaX;
        
        a += deltaX;
    }
    
    return sum;
}
  
int main(){
  
    //Prints the 4nth Fibonacci Number for the first 6 terms
    std::cout << "fib(0) = " << fib(0) << std::endl;
    std::cout << "fib(4) = " << fib(4) << std::endl;
    std::cout << "fib(8) = " << fib(8) << std::endl;
    std::cout << "fib(16) = " << fib(16) << std::endl;
    std::cout << "fib(20) = " << fib(20) << std::endl;
    std::cout << "fib(24) = " << fib(24) << std::endl;
    
    //Assigns the address of the square(double) function to the function_t function pointer
    function_t f = &square; 
    
    //Prints out the function declaration
    std::cout << "f(x) = x^2\n";  
    
    //Prints out the value of f(4)
    std::cout << "f(4) = " << f(4) << std::endl; 
    
    //Prints out the value of the derivative of f(x) at x = 4, or f'(4)
    //with a deltaX value of 0.000000001.
    //Being this value is pretty small, the value of the derivative
    //should be accurate enough.
    std::cout << "f`(4) = " << derivative(f, 4, 0.000000001) << std::endl; 
    
    //Prints out the integral of f(x) from the closed interval [0, 4]
    //using 200 rectangles to approximate the area.
    //200 rectangles is accurate enough.
    std::cout << " ∫{_0^4}f(x)dx = " << integral(f, 0, 4, 200) << std::endl;
  
    return 0;
}

