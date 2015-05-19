package codemonkey800.org.baseconverter;

import android.test.InstrumentationTestCase;

import codemonkey800.org.baseconverter.models.BaseConverter;

public class BaseConverterTest extends InstrumentationTestCase {

    public void testDecimalToBinary() {
        assertEquals( "0b1000101", BaseConverter.decimalToBinary( 69 ) );
        assertEquals( "0b1000101", BaseConverter.decimalToBinary( "69" ) );

        assertEquals( null, BaseConverter.decimalToBinary( "0b101" ) );
        assertEquals( null, BaseConverter.decimalToBinary( "0x45" ) );
        assertEquals( null, BaseConverter.decimalToBinary( "0xFFF" ) );
    }

    public void testDecimalToHexadecimal() {
        assertEquals( "0x45", BaseConverter.decimalToHexadecimal( 69 ) );
        assertEquals( "0x45", BaseConverter.decimalToHexadecimal( "69" ) );

        assertEquals( null, BaseConverter.decimalToHexadecimal( "0b101" ) );
        assertEquals( null, BaseConverter.decimalToHexadecimal( "0x45" ) );
        assertEquals( null, BaseConverter.decimalToHexadecimal( "0xFFF" ) );
    }

    public void testBinaryToDecimal() {
        assertEquals( "69", BaseConverter.binaryToDecimal( "0b1000101" ) );
        assertEquals( "69", BaseConverter.binaryToDecimal( "1000101" ) );

        assertEquals( null, BaseConverter.binaryToDecimal( "69" ) );
        assertEquals( null, BaseConverter.binaryToDecimal( "0x69" ) );
        assertEquals( null, BaseConverter.binaryToDecimal( "0xFFF" ) );
    }

    public void testBinaryToHexadecimal() {
        assertEquals( "0x45", BaseConverter.binaryToHexadecimal( "0b1000101" ) );
        assertEquals( "0x45", BaseConverter.binaryToHexadecimal( "1000101" ) );

        assertEquals( null, BaseConverter.binaryToHexadecimal( "69" ) );
        assertEquals( null, BaseConverter.binaryToHexadecimal( "0x69" ) );
        assertEquals( null, BaseConverter.binaryToHexadecimal( "0xFFF" ) );
    }

    public void testHexadecimalToDecimal() {
        assertEquals( "69", BaseConverter.hexadecimalToDecimal( "0x45" ) );
        assertEquals( "69", BaseConverter.hexadecimalToDecimal( "45" ) );

        assertEquals( null, BaseConverter.hexadecimalToDecimal( "ghz" ) );
        assertEquals( null, BaseConverter.hexadecimalToDecimal( "0b101011" ) );
    }

    public void testHexadecimalToBinary() {
        assertEquals( "0b1000101", BaseConverter.hexadecimalToBinary( "0x45" ) );
        assertEquals( "0b1000101", BaseConverter.hexadecimalToBinary( "45" ) );

        assertEquals( null, BaseConverter.hexadecimalToBinary( "ghz" ) );
        assertEquals( null, BaseConverter.hexadecimalToBinary( "0b101011" ) );
    }

    String[] sixtyNineInBases = {
            "1000101", "2120", "1011", "234", "153", "126", "105", "76",
            "69", "63", "59", "54", "4D", "49", "45", "41", "3F", "3C",
            "39", "36", "33", "30", "2L", "2J", "2H", "2F", "2D", "2B",
            "29", "27", "25", "23", "21", "1Y", "1X"
    };

    public void testArbitraryBaseConverter() {
        // Test 36 bases
        for( int i = 0; i < sixtyNineInBases.length; i++ ) {
            assertEquals( "69", BaseConverter.convertBase( sixtyNineInBases[ i ], i + 2, 10 ) );
        }
    }
}
