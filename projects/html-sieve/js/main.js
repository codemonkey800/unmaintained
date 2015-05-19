function generateTable( columns, rows ) {
    var tableBody = $( '#numbers' );
    tableBody.html( '' );

    var n = 1;
    for( var col = 0; col < columns; col++ ) {
        tableBody.append( '<tr>' );
        for( var row = 1; row <= rows; row++ ) {
            tableBody.append( '<td>' );
            tableBody.append( '<p class="number">' + n.toString() + '</p>' );
            tableBody.append( '</td>' );
            n++
        }
        tableBody.append( '</tr>' );
    }
}

function addToLegend( multiple, color ) {
    var tableHead = $( '#legend');
    tableHead.append( '<th style="background-color: ' + color + '">' + 'Multiple of ' + multiple.toString() + '</th>'  )
}

function colorNumber( tableNumbers, tableNumber, color ) {


    for( var i = 1; i < tableNumbers.length; i++ ) {
        if( tableNumbers.eq( i ).text() === tableNumber.toString() ) {
            console.log( 'Shit' );
            tableNumbers.eq( i ).css( 'background-color', color );
        }
    }
}

function randomColor() {
    return 'rgb(' + Math.floor( Math.random() * 255 ).toString()  + ', '
                  + Math.floor( Math.random() * 255 ).toString()  + ', '
                  + Math.floor( Math.random() * 255 ).toString()  + ')';
}

function colorSieve( n ) {
	if( n <= 1 ) {
		return null;
	}
	var numbers = new Array();
	var primes  = new Array();

	for( var i = 2; i <= n; i++ ) {
		numbers.push( i );
	}

    var primeColor   = 'rgb(25, 103, 228)';
    var tableNumbers = $( '.number' );
    if( tableNumbers.eq( 0 ).text() === '1' ) {
        tableNumbers.eq( 0 ).css( 'background-color', 'red' );
        //$( '#legend' ).append( '<th style="background-color: red">#1</th>'  );
    }

    $( '#legend' ).append( '<th style="background-color: ' + primeColor + '">Primes</th>'  );

	while( numbers.length > 0 ) {
		var p = numbers[ 0 ];
		numbers.splice( 0, 1 );
		primes.push( p );
        colorNumber( tableNumbers, p, primeColor );

        var color = randomColor();

		for( var k = 2; p * k <= n; k++ ) {
			var index = numbers.indexOf( p * k );
			if( index >= 0 ) {
                colorNumber( tableNumbers, numbers[ index ], color );
				numbers.splice( index, 1 );
			}
		}
	}
	return primes;
}
