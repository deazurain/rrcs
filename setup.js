/*
Project the (left) part of your computer screen to a beamer using xrandr. 
Useful when you have a fullscreen pdf with notes on the side and only want
to show one halve of the presentation. 
Sources 
	http://zeekish.wordpress.com/2011/03/18/latex-beamer-presentation-on-dual-display-laptop-projector/
	http://www.tug.org/pracjourn/2010-1/dohmen/dohmen.pdf
*/
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
function puts(error, stdout, stderr) { sys.puts(stdout) }

var screen = {
	id: 'LVDS1'
	width: 1366,
	height: 768,
};

var beamer = {
	id: 'VGA1',
	width: 1024,
	height: 768,
	primary: false,
	source: {
		id: 'LVDS1',
		pos: {x:0, y:0},
		dim: {width:0, height:0},
		scale: {x:0, y:0},
	}
};

/*
var beamer = {
	width: 1920,
	height: 1080,
	id: 'HDMI1'
};
*/


var round = Math.round;

var x = 0;
var y = round(screen.height/2 - 3/16*screen.width);

var s = round(1000*(screen.width/2/beamer.width))/1000;

var xrandr = {
	mode: function(device) { return '--mode ' + device.width + 'x' + device.height; },
	output:  function(device) { return '--output' + device.id; }
};

var cmd = 'xrandr ' + xrandr.output(screen) + ' ' + xrandr.mode(screen) + ' --primary' + 
	xrandr.output(beamer) + ' ' + xrandr.mode(beamer) +  ' --scale ' + s + 'x' + s +  ' --pos ' + x + 'x' + y;

sys.puts(cmd);
exec(cmd, puts);

//fs.writeFileSync('output.sh', cmd);

