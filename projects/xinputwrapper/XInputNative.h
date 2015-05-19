#include <windows.h>
#include <Xinput.h>

#pragma comment(lib, "xinput9_1_0.lib")

class XInputNative{
private:
	XINPUT_STATE state;
	int id;

public:
	XInputNative(int id);

	bool isConnected();

	XINPUT_STATE getState();


	void vibrate(int leftMotor = 65535, int rightMotor = 65535);


};