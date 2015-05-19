package codemonkey800.org.baseconverter.models;

/**
 * A conversion class that takes numbers of various common bases and returns them as Strings.
 * Conversion of an arbitrary base can also be done using one of the supported methods.
 */
public class BaseConverter {

    /**
     * * Convenience method to convert a number of type {@code String} into a different base.
     * Converts an integral number in base 10 to base 2.
     * The value returned has the "0b" prefix to denote its binary nature.
     *
     * @param number The number, in {@code String} form, to convert into binary
     * @return The number in binary. If the number is not a valid decimal {@code String}, {@code null} is returned.
     * @throws java.lang.NumberFormatException
     * @see codemonkey800.org.baseconverter.models.BaseConverter#decimalToBinary(int)
     */
    public static String decimalToBinary( String number ) throws NumberFormatException {
        if ( !isValidDecimalString( number ) ) {
            return null;
        }
        return decimalToBinary( Integer.parseInt( number ) );
    }

    /**
     * The value returned has the "0b" prefix to denote its binary nature.
     *
     * @param number The number, of type int, to convert into binary
     * @return The number in binary
     * @see codemonkey800.org.baseconverter.models.BaseConverter#decimalToBinary(String)
     */
    public static String decimalToBinary( int number ) {
        return "0b" + Integer.toBinaryString( number );
    }

    /**
     * * Convenience method to convert a number of type {@code String} into a different base.
     * Converts a decimal number into hexadecimal form as a {@code String}.
     * The value returned has the "0x" prefix to denote its hexadecimal nature.
     *
     * @param number The number, in {@code String} form, to convert into hexadecimal
     * @return The number in hexadecimal form, or {@code null} if the {@code String} is invalid
     * @throws java.lang.NumberFormatException
     * @see codemonkey800.org.baseconverter.models.BaseConverter#decimalToHexadecimal(int)
     */
    public static String decimalToHexadecimal( String number ) throws NumberFormatException {
        if ( !isValidDecimalString( number ) ) {
            return null;
        }
        return decimalToHexadecimal( Integer.parseInt( number ) );
    }

    /**
     * Converts a decimal number into hexadecimal form as a {@code String}.
     * The value returned has the "0x" prefix to denote its hexadecimal nature.
     *
     * @param number The number, in {@code int} form, to convert into hexadecimal
     * @return The hexadecimal number in {@code String} form
     */
    public static String decimalToHexadecimal( int number ) {
        return "0x" + Integer.toHexString( number );
    }

    /**
     * Converts a binary {@code String} into a decimal {@code String}.
     * @param number The binary number to convert into decimal
     * @return The number in decimal form, or {@code null} if invalid
     * @throws NumberFormatException
     */
    public static String binaryToDecimal( String number ) throws NumberFormatException {
        if ( !isValidBinaryString( number ) ) return null;
        if( number.contains( "0b" ) ) {
            number = number.replace( "0b", "" );
        }
        return Integer.valueOf( number, 2 ).toString();
    }

    /**
     * Converts a binary {@code String} into a hexadecimal {@code String}.
     * @param number The binary number to convert into hexadecimal
     * @return The number in hexadecimal form, or {@code null} if invalid
     * @throws NumberFormatException
     */
    public static String binaryToHexadecimal( String number ) throws NumberFormatException {
        if ( !isValidBinaryString( number ) ) return null;
        if( number.contains( "0b" ) ) {
            number = number.replace( "0b", "" );
        }
        return "0x" + Integer.toHexString( Integer.parseInt( number, 2 ) );
    }

    /**
     * Converts a hexadecimal {@code String} into a decimal {@code String}.
     * @param number The hexadecimal number to convert into decimal
     * @return The number in decimal form, or {@code null} if invalid
     * @throws NumberFormatException
     */
    public static String hexadecimalToDecimal( String number ) throws NumberFormatException {
        if ( !isValidHexadecimalString( number ) ) return null;
        if ( number.contains( "0x" ) ) {
            number = number.replace( "0x", "" );
        }
        return Integer.valueOf( number, 16 ).toString();
    }

    /**
     * Converts a hexadecimal {@code String} into a binary {@code String}.
     * @param number The hexadecimal number to convert into binary
     * @return
     * @throws NumberFormatException
     */
    public static String hexadecimalToBinary( String number ) throws NumberFormatException {
        if ( !isValidHexadecimalString( number ) ) return null;
        if ( number.contains( "0x" ) ) {
            number = number.replace( "0x", "" );
        }
        return "0b" + Integer.toBinaryString( Integer.parseInt( number, 16 ) );
    }

    /**
     * Converts numbers of arbitrary bases into a different base.
     * Parses {@code number} using base {@code inputBase} and then outputs
     * it into a {@code String} of base {@code outputBase}.
     * Unlike the other conversion methods, there are no prefixes appended to the output String,
     * so use with caution.
     * @param number The number to convert
     * @param inputBase The base of the inital number
     * @param outputBase The output base of the number
     * @return The number converted into {@code outputBase}
     * @throws java.lang.NumberFormatException
     */
    public static String convertBase( String number, int inputBase, int outputBase ) throws NumberFormatException {
        return Integer.toString( Integer.parseInt( number, inputBase ), outputBase );
    }

    /**
     * Checks if {@code number} is a valid decimal {@code String}.
     *
     * @param number The number to verify for decimal-ness
     * @return True or false if valid decimal {@code String}
     */
    private static boolean isValidDecimalString( String number ) {
        return !number.contains( "0b" ) && !number.contains( "0x" ) && !number.matches( "[a-zA-Z]+" );
    }

    /**
     * Checks if {@code number} is a valid hexadecimal {@code String}.
     *
     * @param number The number to verify for hexadecimal-ness
     * @return True or false if valid hexadecimal {@code String}
     */
    private static boolean isValidHexadecimalString( String number ) {
        return !number.contains( "b" ) && !number.matches( "[g-zG-Z]+" );
    }

    /**
     * Checks if {@code number} is a valid binary {@code String}.
     *
     * @param number The number to verify for binary-ness
     * @return True or false if valid binary {@code String}
     */
    private static boolean isValidBinaryString( String number ) {
        return !number.contains( "0x" ) && !number.matches( "[a-zA-Z2-9]+" );
    }

}
