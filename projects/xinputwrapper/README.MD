# XInputWrapper

XInputWrapper is a simple .NET wrapper for a native C++ class that represents a controller object that is connected to the system via the XInput library. The native C++ class is wrapped using C++/CLI, a managed, .NET version of the C++ langauge.

## XInputWrapper provides:

1. Abstraction of controller object connected via the XInput library
2. Mechanism to get certain button states
3. Compatibility with any .NET language

##Here are some examples of the library in C++, C++/CLI and CSharp

###C++

```cpp
#include "XInputNative.h"
#include <thread>
#include <chrono>
#define RIGHT_SHOULDER 0x0200 // For Xbox 360 controllers
#define R1_BUTTON 0x0200      // For PS3 controllers emulated as Xbox 360 controllers

int main(){

    XInputNative native(0); // Creates a controller object that is the first controller connected to the system
    
    if(!native.isConnected()) // Checks if the controller is connected
        return -1;
        
    native.vibrate(); // Vibrates controller with default value 65535 
    
    std::this_thread::sleep_for(std::chrono::seconds(2)); // Makes main thread sleep for 2 seconds

    return 0;
}
```

### C++/CLI
```cpp
#using <mscorlib.dll>
#include "XinputWrapper.h"

using namespace System;
using namespace Wrapper;

int main(cli::array<String^> ^args){

    XInputWrapper^ wrap = gcnew XInputWrapper(0);

    if(!wrap->isConnected())
        return -1;
        
    wrap->vibrate();

    System::Threading::Thread::Sleep(2000);

    return 0;
}
```

### CSharp
```csharp
using System;
using Wrapper;

public class ControllerTest{

    public static void Main(String[] args){
        XInputWrapper wrap = new XInputWrapper(0);
        
        if(
        wrap.vibrate();
        
        System.Threading.Thread.Sleep(2000);
        
        return 0;
    
    }
}
```
        
## How to use

The XInputWrapper and Native class represents a controller object connected to the system through the XInput library. When using the underlying Win32 APIs, you first have to get acquire the state of a controller using a certain id. This id is a integer that represents controllers connected to the system with a maximum number of 4 controllers being connected to the system.

The id is 0 indexed, meaning controller 1 is 0, controller 2 is 1, and so on. When creating a controller object, you must supply the id number. The .NET wrapper of the controller object provides higher abstractions when getting the button states, such as getting the current X or Y values of either the left or right analog stick, getting the value of a trigger, or getting the button state. When using the Native class, you must know the bit flag for the button states. You can get the trigger and analog stick values by accessing the values of XINPUT_STATE structure.

You can get the bitflag value for the button states at [MSDN](http://goo.gl/A0V3Fs).

## Excelsior!

![There was an image here. It's not here now.](http://goo.gl/74J7Qc)
