/**
 * @authors: Önder Ceylan <onderceylan@gmail.com>, PPKRAUSS https://github.com/ppKrauss
 * @license Licensed under the terms of GPL, LGPL and MPL licenses.
 * @version 1.1
 * @history v1.0 at 2013-05-09 by onderceylan, v1.1 at 2013-08-27 by ppkrauss.
 */

CKEDITOR.plugins.add('texttransform', {

	// define lang codes for available lang files here
	lang: 'en,tr,ru',

	// plugin initialise
	init: function (editor) {


		function parseHtml(input, callbackText) {

			var re = /(<(style|xml|head|script|object|textarea)\s*[^>]*>[\s\S]*?<\/\2>)|(<(?:[^'"<>]+|'[^']*'|"[^"]*")*>)|(&(?:\w+|#x[\da-f]+|#\d+);)|([a-zёа-я\w]+)|(.)/ig;

			var output = '';

			var match;

			while ((match = re.exec(input))) {

				// Case 1: HTML tags: style, xml, head, script, object, textarea
				if (match[1]) {
					output += match[1];

				// Case 3: HTML open/close tag
				}	else if (match[3]) {
					output += match[3];

				// Case 4: HTML entity
				}	else if (match[4]) {
					output += match[4];

				// Case 5: Any words
				}	else if (match[5]) {
					if (typeof callbackText === "function") {
						output += callbackText(match[5]);
					} else {
						output += match[5];
					}

				// Case 6: Any other single character.
				}	else if (match[6]) {
					output += match[6];
				}

			}

			return output;

		}



		// add transformTextToUppercase command to be used with buttons and 'execCommand' method
		editor.addCommand('transformTextToUppercase', {
			exec: function () {
				var bookmark = editor.getSelection().createBookmarks(true); // Save selection
				var selection = editor.getSelectedHtml().getHtml();
				editor.insertHtml(
					parseHtml(selection, function (input) {
						return String(input).toLocaleUpperCase();
					})
				);
				editor.getSelection().selectBookmarks(bookmark); // Restore selection
			}
		});


		// add transformTextToUppercase command to be used with buttons and 'execCommand' method
		editor.addCommand('transformTextToLowercase', {
			exec: function () {
				var bookmark = editor.getSelection().createBookmarks(true); // Save selection
				var selection = editor.getSelectedHtml().getHtml();
				editor.insertHtml(
					parseHtml(selection, function (input) {
						return String(input).toLocaleLowerCase();
					})
				);
				editor.getSelection().selectBookmarks(bookmark); // Restore selection
			}
		});




		var capitalize = function(s) {
			//console.log(s);//debug
			return s.toLocaleLowerCase().replace(/[a-zёа-я\w]/, function (c) {
				return c.toLocaleUpperCase();
			});
		};




		// add transformTextSwitch command to be used with buttons and 'execCommand' method
		editor.addCommand('transformTextCapitalize', {
			exec: function () {
				var bookmark = editor.getSelection().createBookmarks(true); // Save selection
				var selection = editor.getSelectedHtml().getHtml();
				editor.insertHtml(
					parseHtml(selection, function (input) {
						return capitalize(input);
					})
				);
				editor.getSelection().selectBookmarks(bookmark); // Restore selection
			}
		});



		// add TransformTextToUppercase button to editor
		editor.ui.addButton('TransformTextToUppercase', {
			label: editor.lang.texttransform.transformTextToUppercaseLabel,
			command: 'transformTextToUppercase',
			icon: this.path + 'images/transformToUpper.png'
		});


		// add TransformTextCapitalize button to editor
		editor.ui.addButton('TransformTextCapitalize', {
			label: editor.lang.texttransform.transformTextCapitalizeLabel,
			command: 'transformTextCapitalize',
			icon: this.path + 'images/transformCapitalize.png'
		});

		// add TransformTextToLowercase button to editor
		editor.ui.addButton('TransformTextToLowercase', {
			label: editor.lang.texttransform.transformTextToLowercaseLabel,
			command: 'transformTextToLowercase',
			icon: this.path + 'images/transformToLower.png'
		});



	}
});
