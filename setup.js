var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
function puts(error, stdout, stderr) { sys.puts(stdout) }

var screen = {
	width: 1366,
	height: 768,
	id: 'LVDS1'
};

var beamer = {
	width: 1024,
	height: 768,
	id: 'HDMI1'
};

var round = Math.round;

var x = 0;
var y = round(screen.height/2 - 3/16*screen.width);

var s = round(1000*(screen.width/2/beamer.width))/1000;

var cmd = 'xrandr --output ' + screen.id + ' --mode ' + screen.width + 'x' + screen.height +  ' --primary' + 
	' --output ' + beamer.id + ' --mode ' + beamer.width + 'x' + beamer.height +  ' --scale ' + s + 'x' + x +  ' --pos ' + x + 'x' + y;

sys.puts(cmd);
exec(cmd, puts);

//fs.writeFileSync('output.sh', cmd);

