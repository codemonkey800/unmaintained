#include <windows.h>
#include <Xinput.h>

#pragma comment(lib, "xinput9_1_0.lib")

#include "XInputNative.h"

XInputNative::XInputNative(int id) :id(id){}

bool XInputNative::isConnected(){
	ZeroMemory(&state, sizeof(XINPUT_STATE));

	if(XInputGetState(id, &state) == ERROR_SUCCESS){
		return true;
	}else{
		return false;
	}
}

XINPUT_STATE XInputNative::getState(){
	ZeroMemory(&state, sizeof(XINPUT_STATE));

	XInputGetState(id, &state);

	return state;
}

void XInputNative::vibrate(int leftMotor /* = 65535 */, int rightMotor /* = 65535 */){
	XINPUT_VIBRATION v;

	ZeroMemory(&v, sizeof(XINPUT_VIBRATION));

	v.wLeftMotorSpeed = leftMotor;
	v.wRightMotorSpeed = rightMotor;

	XInputSetState(id, &v);
}
