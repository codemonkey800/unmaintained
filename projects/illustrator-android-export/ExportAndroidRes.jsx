/******************************************************************

Exports current document into 4 Android resource files: MDPI, HDPI,
XHDPI, and XXHDPI. Optionally, the user can specify if he/she wants
to also export XXXHDPI and Web.

The document width and height will be the baseline height of the 
resource, i.e., MDPI. 

The scaling factors for HDPI, XHDPI, and XXHPDI are from
the Android Iconography page: http://goo.gl/E70Ez.

MDPI    = 1.0
HDPI    = 1.5
XHDPI   = 2.0
XXHDPI  = 3.0
XXXHDPI = 4.0
WEB     = 512x512

Author: Jeremy Asuncion
Date:   August 8th, 2014
License: OPEN SOURCE BREH

******************************************************************/

/******************************************************************

ResourceBaseFilenameDialog Class

A simple class with one static function that instantiates a dialog
that requests the user to enter a base filename for the resource
file. 

If the user provides a filename, then the filename is returned.
However, if the user provides an empty string or cancels, 
then null is returned.

******************************************************************/

var ResourceBaseFilenameDialog = {

	instantiateDialog: function() {
		var ui = 
		"dialog { \
			filename: Group { orientation: 'row', \
				s: StaticText { text: 'Filename' }, \
				e: EditText { characters: 30 } \
			}, \
			buttons: Group { orientation: 'row', alignment: 'center', \
				okButton:     Button { text: 'Ok',     properties: { name: 'ok'     } }, \
				cancelButton: Button { text: 'Cancel', properties: { name: 'cancel' } } \
			} \
		}";
	
		  var dialog = new Window( ui, 'Enter the base filename for the resource' );
		  dialog.center();
		  var result = dialog.show();

		  if( result === 1 ) {
		  	var filename = dialog.filename.e.text;;
		  	if( filename.length === 0 ) {
		  		return null;
		  	} else {
		  		return dialog.filename.e.text;
		  	}
		  } else {
		  	return null;
		  }
	}

};

/******************************************************************

ResourceSizesChooserDialog class

A dialog class with one static function that instantiate the dialog.

The dialog vertically lists the available sizes the user can scale 
a document to. MDPI, HDPI, XDPI, XXDPI, XXXDPI, and Web are all 
available sizes.

Preserve Artboard is used to preserve the bounding box in Illustrator when 
exporting the resource files to PNGs.

So if a document has an artboard size of 512x512, but the drawing is only
256x256, checking "Preserve Artboard" would keep the the drawing 
at 256x256 and the bounding box 512x512. Preserving the artboard
is particular useful for exporting resources with padding. For instance,
according to the Android Iconography Design page, an Action Bar
image should be 32x32 dp in size, but the icon should be 24x24 dp,
or 75% of the full asset.

The scaling factors for each size is listed at the top. 
If the user cancels this dialog, it returns null. Otherwise,
the dialog returns an object containing boolean values
corresponding to the user's selection of sizes. For instance,
if the user selects Web, then the web property of the returned 
object will be true.

By default, MDPI, HDPI, XDPI, and XXDPI are all selected.

******************************************************************/
var ResourceSizesChooserDialog = {

	instantiateDialog: function() {
		var ui = 
		"dialog {  \
			sizeCheckBoxes: Group { orientation: 'column', alignment: 'left', alignChildren: 'left', \
				mdpi:    Checkbox { text: 'MDPI',   value: true }, \
				hdpi:    Checkbox { text: 'HDPI',   value: true }, \
				xhdpi:   Checkbox { text: 'XHDPI',  value: true }, \
				xxhdpi:  Checkbox { text: 'XXHDPI', value: true }, \
				xxxhdpi: Checkbox { text: 'XXXHDPI'             }, \
				web:     Checkbox { text: 'Web'                 }, \
				art:     Checkbox { text: 'Preserve Artboard'   }  \
			}, \
			buttons: Group { orientation: 'row', alignment: 'center', \
				okButton:     Button { text: 'Ok',     properties: { name: 'ok'     } },  \
				cancelButton: Button { text: 'Cancel', properties: { name: 'cancel' } }  \
			} \
		}";
		var dialog = new Window( ui, 'Select your desired resource sizes' );
		dialog.center();
		var result = dialog.show();

		if( result === 1 ) {
			var checkBoxes = dialog.sizeCheckBoxes;
			return {   
				mdpi:    checkBoxes.mdpi.value,
				hdpi:    checkBoxes.hdpi.value,
				xhdpi:   checkBoxes.xhdpi.value,
				xxhdpi:  checkBoxes.xxhdpi.value,
				xxxhdpi: checkBoxes.xxxhdpi.value,
				web:     checkBoxes.web.value,
				art:     checkBoxes.art.value
			};
			
		} else {
			return null;
		}
	}

};

/******************************************************************

AndroidScalingFactors object

All scaling factors for Android according to Iconography Design page.
Web, however, is not a factor and is an actual size.
Each scaling factor( or size ) is mapped to its corresponding 
DPI size.

******************************************************************/
var AndroidScalingFactors = {
	mdpi:    1.0,
	hdpi:    1.5,
	xhdpi:   2.0,
	xxhdpi:  3.0,
	xxxhdpi: 4.0,
	web:     512
};

/******************************************************************

ResourceExporter class

A class consisting of all static functions used
to export the current document into resources. Both the 
exportByScalingFactor and exportWeb functions are very similar
( Actually they're pretty much copy and paste. I should probably
rewrite it or something ). The exportSelectedSizes functions
takes an object of boolean values in the form:

{
	mdpi:    boolean,
	hdpi:    boolean,
	xhdpi:   boolean,
	xxhdpi:  boolean,
	xxxhdpi: boolean,
	web:     boolean,
	art:     boolean
}.

The function exports the corresponding DPI size if and only if
it's mapped value is true. Also, the art value is passed
to the exportByScalingFactor function to determine
whether or not the artboard is preserved.

******************************************************************/
var ResourceExporter = {

	exportByScalingFactor: function( document, exportDir, baseFilename, preserveArtboard, scalingFactor ) {
		var docWidth  = document.width;
		var docHeight = document.height;

		document.selectObjectsOnActiveArtboard();
		var selectedObjects = document.selection;

		if( selectedObjects.length > 0 ) {

			var exportOptions = new ExportOptionsPNG24();
			exportOptions.antiAliasing    = true;
			exportOptions.transparency    = true;
			exportOptions.artBoardClipping = preserveArtboard;
			exportOptions.horizontalScale = 100 * scalingFactor;
			exportOptions.verticalScale   = 100 * scalingFactor;

			var resDir = new Folder( exportDir );
			if( !resDir.exists ) {
				resDir.create();
			}

			var resFile;
			if( baseFilename.indexOf( 'ic_' ) == -1 ) {
				resFile = new File( exportDir + '/ic_' + baseFilename.toLowerCase() + '.png' );
			} else {
				resFile = new File( exportDir + baseFilename.toLowerCase() + '.png' );
			}

			document.exportFile( resFile, ExportType.PNG24, exportOptions );
			return true;

		} else {
			document.selection = null;
			return false;
		}
	},

	exportWeb: function( document, exportDir, baseFilename ) {
		var newDocSize = ( document.width > document.height ? document.width : document.height );

		document.selectObjectsOnActiveArtboard();
		var selectedObjects = document.selection;

		if( selectedObjects.length > 0 ) {
			var newDoc = app.documents.add( document.documentColorSpace, newDocSize, newDocSize );
			for( var i = 0; i < selectedObjects.length; i++ ) {
				selectedObjects[ i ].selected = false;	
				selectedObjects[ i ].duplicate( newDoc, ElementPlacement.PLACEATEND );
			}

			var exportOptions = new ExportOptionsPNG24();
			exportOptions.antiAliasing    = true;
			exportOptions.transparency    = true;
			exportOptions.artBoardClipping = true;
			exportOptions.horizontalScale = exportOptions.verticalScale = 100 * AndroidScalingFactors.web / newDocSize;

			var webResDir = new Folder( exportDir + '/res/' );
			if( !webResDir.exists ) {
				webResDir.create();
			}

			var webResFile;

			if( baseFilename.indexOf( 'ic_' ) == -1 ) {
				webResFile = new File( exportDir + '/res/ic_' + baseFilename.toLowerCase() + '.png' );
			} else {
				webResFile = new File( exportDir + '/res/' + baseFilename.toLowerCase() + '.png' );
			}

			newDoc.exportFile( webResFile, ExportType.PNG24, exportOptions );
			newDoc.close( SaveOptions.DONOTSAVECHANGES )
			return true;

		} else {
			document.selection = null;
			return false;
		}
	},

	exportSelectedSizes: function( document, selectedSizes, exportDir, baseFilename ) {
		if( selectedSizes.mdpi ) {
			ResourceExporter.exportByScalingFactor( document, exportDir + '/res/drawable-mdpi', baseFilename, selectedSizes.art, AndroidScalingFactors.mdpi );
		}
		if( selectedSizes.hdpi ) {
			ResourceExporter.exportByScalingFactor( document, exportDir + '/res/drawable-hdpi', baseFilename, selectedSizes.art, AndroidScalingFactors.hdpi );
		}
		if( selectedSizes.xhdpi ) {
			ResourceExporter.exportByScalingFactor( document, exportDir + '/res/drawable-xhdpi', baseFilename, selectedSizes.art, AndroidScalingFactors.xhdpi );
		}
		if( selectedSizes.xxhdpi ) {
			ResourceExporter.exportByScalingFactor( document, exportDir + '/res/drawable-xxhdpi', baseFilename, selectedSizes.art, AndroidScalingFactors.xxhdpi );
		}
		if( selectedSizes.xxxhdpi ) {
			ResourceExporter.exportByScalingFactor( document, exportDir + '/res/drawable-xxxhdpi', baseFilename, selectedSizes.art, AndroidScalingFactors.xxxhdpi );
		}
		if( selectedSizes.web ) {
			ResourceExporter.exportWeb( document,  exportDir, baseFilename );
		}
	}

};

// Main Code
// Code put in function so that we can return if errors arise.
function main() {
	// Main Code
	var exportDir = Folder.selectDialog( 'Select a folder to save the resource files to.' );
	
	if( exportDir != null ) {
	
		var document = app.activeDocument;

		var baseFilename = ResourceBaseFilenameDialog.instantiateDialog();
		if( baseFilename === null ) {
			alert( 'No base filename specified' );
			return;
		}

		var selectedSizes = ResourceSizesChooserDialog.instantiateDialog();
		if( selectedSizes === null ) {
			alert( 'Sizes not selected!' );
			return;
		}
	
		try {
			ResourceExporter.exportSelectedSizes( document, selectedSizes, exportDir, baseFilename );
		} catch( e ) {
			alert( e );
		}
	
	} else {
		alert( 'No export directory selected!' );
		return;
	}
}

// Call main yo
main();

alert( 'Finished Export!' );