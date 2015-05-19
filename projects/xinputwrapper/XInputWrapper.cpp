#include "XInputWrapper.h"

using namespace Wrapper;


XInputWrapper::XInputWrapper(int id){
	this->id = id;
	native = new XInputNative(id);
}

XInputWrapper::~XInputWrapper(){
	this->!XInputWrapper();
}

XInputWrapper::!XInputWrapper(){
	delete native;
}

bool XInputWrapper::isConnected(){
	return native->isConnected();
}

XInputWrapper::PlaystationButtons XInputWrapper::getPlaystationButtonState(){
	switch(native->getState().Gamepad.wButtons){
	case XInputWrapper::PlaystationButtons::DPAD_UP:
		return XInputWrapper::PlaystationButtons::DPAD_DOWN;

	case XInputWrapper::PlaystationButtons::DPAD_DOWN:
		return XInputWrapper::PlaystationButtons::DPAD_DOWN;

	case XInputWrapper::PlaystationButtons::DPAD_LEFT:
		return XInputWrapper::PlaystationButtons::DPAD_LEFT;

	case XInputWrapper::PlaystationButtons::DPAD_RIGHT:
		return XInputWrapper::PlaystationButtons::DPAD_RIGHT;

	case XInputWrapper::PlaystationButtons::L3:
		return XInputWrapper::PlaystationButtons::L3;

	case XInputWrapper::PlaystationButtons::R3:
		return XInputWrapper::PlaystationButtons::L3;

	case XInputWrapper::PlaystationButtons::L1:
		return XInputWrapper::PlaystationButtons::L1;

	case XInputWrapper::PlaystationButtons::R1:
		return XInputWrapper::PlaystationButtons::R1;

	case XInputWrapper::PlaystationButtons::Circle:
		return XInputWrapper::PlaystationButtons::Circle;

	case XInputWrapper::PlaystationButtons::Triangle:
		return XInputWrapper::PlaystationButtons::Triangle;

	case XInputWrapper::PlaystationButtons::Square:
		return XInputWrapper::PlaystationButtons::Square;

	case XInputWrapper::PlaystationButtons::X:
		return XInputWrapper::PlaystationButtons::X;

	case XInputWrapper::PlaystationButtons::Select:
		return XInputWrapper::PlaystationButtons::Select;

	case XInputWrapper::PlaystationButtons::START:
		return XInputWrapper::PlaystationButtons::START;
	}
}

int XInputWrapper::getL2Value(){
	return native->getState().Gamepad.bRightTrigger;
}

int XInputWrapper::getLeftAnalogX(){
	return native->getState().Gamepad.sThumbLX;
}

int XInputWrapper::getLeftAnalogY(){
	return native->getState().Gamepad.sThumbLY;
}

int XInputWrapper::getR2Value(){
	return native->getState().Gamepad.bLeftTrigger;
}

int XInputWrapper::getRightAnalogX(){
	return native->getState().Gamepad.sThumbRX;
}

int XInputWrapper::getRightAnalogY(){
	return native->getState().Gamepad.sThumbRY;
}

void XInputWrapper::vibrate(int leftMotor, int rightMotor){
	native->vibrate(leftMotor, rightMotor);
}