#pragma once

#include "XInputNative.h"

namespace Wrapper{

	public ref class XInputWrapper{

	private:
		XInputNative* native;

		int id;

	public:
		//Use this if you want bruh
		//enum XboxButtons{
		//	DPAD_UP = 0x0001,
		//	DPAD_DOWN = 0x0002,
		//	DPAD_LEFT = 0x0004,
		//	DPAD_RIGHT = 0x0008,
		//	START = 0x0010,
		//	BACK = 0x0020,
		//	LEFT_THUMB = 0x0040,
		//	RIGHT_THUMB = 0x0080,
		//	LEFT_SHOULDER = 0x0100,
		//	RIGHT_SHOULDER = 0x0200,
		//	A = 0x1000,
		//	B = 0x2000,
		//	X = 0x4000,
		//	Y = 0x8000
		//};

		enum class PlaystationButtons{
			DPAD_UP = 0x0001,
			DPAD_DOWN = 0x0002,
			DPAD_LEFT = 0x0004,
			DPAD_RIGHT = 0x0008,
			START = 0x0010,
			Select = 0x0020,
			L3 = 0x0040,
			R3 = 0x0080,
			L1 = 0x0100,
			R1 = 0x0200,
			X = 0x1000,
			Circle = 0x2000,
			Square = 0x4000,
			Triangle = 0x8000
		};

	public:
		XInputWrapper(int id);

		~XInputWrapper();

		!XInputWrapper();

		bool isConnected();

		PlaystationButtons getPlaystationButtonState();

		int getR2Value();

		int getL2Value();

		int getLeftAnalogX();

		int getLeftAnalogY();

		int getRightAnalogX();

		int getRightAnalogY();

		void vibrate(int leftMotor, int rightMotor);

		
	};

}
