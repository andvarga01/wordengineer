// Card component: handle user interface for dialects in Word Engineering project.
// Author: Varga András, 2020.08.03. 
// Copyright: 2020,  Common ....
// we_04_25.js - 2 tables with diff. styles.
//
"use strict";
var Card = {
	context : {
		ajaxTimeout : 8000,
		reloadPage  : false
	}, 
	component : {},
	variables : {}
};

	Card.variables.version        = '0.1.1';

(function() {
    var a = null;
    Card.component.Main = {
		version : '0.4.1',
		
        init: function() {
        },
		getVersion: function() {
			return (a.version);
		},
	};
	a = Card.component.Main;
})(jQuery);
jQuery(document).ready(function() {
    Card.component.Main.init()
});


////////////////////////////////////////////////////////////////////
(function() {
    var a = null;
    Card.component.GUI = {
		version			: '0.4.4',
		idx             : 0,

        init: function(index) {
			a.idx = index;
        },
		getVersion: function() {
			return (a.version);
		},
		addCard: function() {
			var table = document.createElement('table');

			table.id = "card" + a.idx;
			table.className = "card";
			
			table.appendChild( a.addHeader() );
			table.appendChild( document.createElement( 'hr'                     ) );
			table.appendChild( a.addRemoveButton( table.id                      ) );
			table.appendChild( a.addSubTable(     table.id + "tbl", "Ez a hang:") );
			
			table.style.backgroundColor = 'white';
			
			return table;
		},
		addRemoveButton: function( tableId ) {
			var remTbl = document.createElement('table');
			var remDiv = document.createElement('div');
			var remBtn = document.createElement('button');
				
				remDiv.className = "bottomRight";
				remBtn.id        = 'btn_refresh';
				remBtn.className = 'btn-link'
				remBtn.innerHTML = 'Törlés';
				remBtn.onclick   = function() {
					document.getElementById( tableId ).remove();
				};
				
			remDiv.appendChild( remBtn );
			remTbl.appendChild( remDiv );
			
			return remTbl;
		},
		addHeader: function() {
			var dv = document.createElement('div');
			var tx = document.createTextNode('Hang módosulása (' + a.idx + ')');
				dv.style.textAlign = "center";
				//dv.style.fontWeight = "900";

			dv.appendChild( tx );
			
			return dv;
		},
		addSubTable: function(ti, txt) {
			// CREATE SUBTABLE FOR SHOWING USER ENTERED LETTER.
			var subTbl = document.createElement('table');
			var tr1    = document.createElement('tr');
			var td1    = document.createElement('td');
			var td2    = document.createElement('td');
			var tx1    = document.createTextNode(txt);
			var in1    = document.createElement('input');
			
				//subTbl.style.border = "1px solid";
				subTbl.id           = ti;
				td1.id              = ti + "text";
				td1.style.textAlign = "right";
				td1.style.width     = "80%";
				td2.id              = ti + "r";
				td2.style.width     = "20%";
				
				in1.id              = ti + "letteru";
				in1.type			= "text";
				in1.name            = in1.id;
				in1.value           = "";
				in1.size            = 1;	// müxik, de ?
				in1.onkeydown       = function() {a.onLetter(  ti );}
				in1.onblur          = function() {a.onLetter_( ti );}
				
			td1.appendChild( tx1 );
			td2.appendChild( in1 );
			tr1.appendChild( td1 );
			tr1.appendChild( td2 );
			
			subTbl.appendChild( tr1 );
			subTbl.appendChild( a.addBigLetterRow( ti ) );
			
			return subTbl;
		},
		onLetter: function(ti) {
			if(event.key === 'Enter') {
				a.onLetter_( ti );
			}
		},
		onLetter_: function(ti) {
				var s = ti + 'letteru';
				var x = document.getElementById(s);
				if ( !x.value ) return;
				x.value = x.value.toUpperCase();
				s = ti + 'bigletter';
				document.getElementById(s).innerHTML = x.value;

				var tb = ti.substring(0, ti.length-3);			// "cardN" <- "cardNtab"
				var y = document.getElementById( tb + "sel" );
				if ( y === null || y === undefined) {
					var t = document.getElementById( tb );
					try {
						t.appendChild( a.addActions(tb) );
						a.onChooseAction(ti, 1);
					} catch {
					}
				}
		},
		addBigLetterRow: function(ti) {
			var tr    = document.createElement('tr');
			var td1   = document.createElement('td');
			var td2   = document.createElement('td');
				td1.id              = ti + "bigletter";
				td1.style.textAlign = "center";
				td1.style.fontSize  = "x-large";
				
			tr.appendChild( td1 );
			tr.appendChild( td2 );
			
			return tr;
		},
		addActionList: function(ti) {
			var lbl = document.createElement('label');
			var sel = document.createElement("select");
			var opList = ["lecserélődik", "törölve", "új jelentése"];
			var vaList = ["change", "remove", "meaning"];

			lbl.htmlFor  = "actions";
			sel.id       = ti + "selected";
			sel.onchange = function() {a.onChooseAction( ti, this );}
			
			for (var x in opList) {
				var op = document.createElement("option");
				op.text  = opList[x];
				op.value = vaList[x];
				sel.add( op );
			}
			lbl.appendChild( sel );
			
			return lbl;
		},
		addActions: function(ti) {
			var objId = ti + "sel"; 
			if ($(objId).length == 0) {
				var dv = document.createElement('div');
					dv.id               = ti + "sel";
					dv.style.textAlign  = "center";

				dv.appendChild( a.addActionList(ti) );

				return dv;
			}
			return null;
		},
		addMeaning: function(ti) {
			var dv = document.createElement('div');
				dv.id              = ti + "meaning";
				dv.style.textAlign = "center";
				dv.style.paddingTop = "20px";

			dv.appendChild( a.addMeaningUser(ti) );

			return dv;
		},
		addCheckbox: function(ti) {			// new meaning
			var dv = document.createElement('div');
			var cb = document.createElement('input');
			var lb = document.createElement('label');
				dv.id               = ti + "divCheckbox";
				dv.className        = 'checkboxMiddle';
				cb.type             = 'checkbox';
				cb.id               = ti + "checkbox";
				cb.onclick          = function() {a.setBgColor( ti );}
				lb.innerHTML        = "Érvényesül";
			dv.appendChild( cb );
			dv.appendChild( lb );

			return dv;
		},
		addMeaningUser: function(ti) {
			var ta = document.createElement('textarea');
				ta.id   = ti + "means";
				ta.rows = "3";
				ta.cols = "16";
			return ta;
		},
		onChooseAction: function(ti, sel) {
		  var uAction = '';
		  try {
			uAction = sel.options[sel.selectedIndex].value;
		  }
		  catch(err) {
			uAction = 'change';
		  }
			a.clearCommonPlace(ti);
			if (uAction=="change") {
				a.showSecondLetter(ti);
			}
			if (uAction=="remove") {
				//NOTHING TO SHOW
			}
			if (uAction=="meaning") {
				a.showMeaning(ti);
			}
			a.showCheckbox(ti);
		},
		showSecondLetter: function (ti) {
			var mainId = ti;
			if (mainId.endsWith('tbl')) {
				mainId = mainId.substring(0, mainId.length-3);					// "cardN" <- "cardNtab"
			}
			var t = document.getElementById( mainId );
			t.appendChild( a.addSubTable( mainId + "tbl2", "erre a hangra:") );

		},
		showMeaning: function(ti) {
			var y = document.getElementById( ti + "meaning" );
			if ( y === null || y === undefined ) {
				var t = document.getElementById( ti );
				t.appendChild( a.addMeaning( ti) );
			}
		},
		//--------------------------------------------------
		showCheckbox: function(ti) {
			var mainId = ti;
			if (mainId.endsWith('tbl')) {
				mainId = mainId.substring(0, mainId.length-3);					// "cardN" <- "cardNtab"
			}

			var y = document.getElementById( mainId + "divCheckbox" );
			if ( y === null || y === undefined ) {
				var t = document.getElementById( mainId );
				t.appendChild( a.addCheckbox( mainId ) );
			}
		},
		clearCommonPlace: function(ti) {
			var elems = ["meaning", "tbl2"];
			for (var i = 0; i < elems.length; i++) {
				try {
					document.getElementById( ti + elems[i] ).remove();
				} catch {
				}
			}
		},
		setBgColor: function(ti) {
			var checkBox = document.getElementById(ti + "checkbox");
			if (checkBox.checked == true){
				document.getElementById(ti).style.backgroundColor = '#ddeedd';
			} else {
				document.getElementById(ti).style.backgroundColor = 'white';
			}
		},
		
		//////////////////////////////////////////////////////////////////////
		getCardValues: function(i) {
			var values = {
				'card'   : '',
				'letter1': '',
				'letter2': '',
				'toDo'   : '',
				'meaning': '',
				'isValid': null
			};
			var ti = 'card' + i;
			
			values.card         = i;
			try {values.letter1 = document.getElementById( ti + 'tblletteru').value;  } catch{}
			try {values.letter2 = document.getElementById( ti + 'tbl2letteru').value; } catch{}
			try {		var   e = document.getElementById( ti + 'selected');
				 values.toDo    = e.options[e.selectedIndex].value;                   } catch{}
			try {values.meaning = document.getElementById( ti + 'means').value;       } catch{}
			try {values.isValid = document.getElementById( ti + 'checkbox').checked;  } catch{}
			
			return values;			//let jsonString = JSON.stringify(values);alert();
		},
		getCardsData: function(maxIndex) {
			var arr = [];
			for (var i = 0; i < maxIndex; i++) {
				arr.push( a.getCardValues( i+1 ) );
			}
			
			return arr;
		},
	};
	a = Card.component.GUI;
})(jQuery);
jQuery(document).ready(function() {
    Card.component.GUI.init()
});

//document.body.insertBefore(label, newInput);
//style.visibility='visible', 'hidden'
// https://stackoverflow.com/questions/52322006/insert-javascript-variable-into-json-object
