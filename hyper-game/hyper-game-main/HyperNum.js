//v0.2.2
//Handles numbers up to 1ex#^^#x (1e1#^#^#2 for base 3)
//Original by Demonin, Improved by solarzone

function toHyperNum(input, base=10, coloured=false) {
	effectiveBase = new Decimal(base).sub(1)
	input = new Decimal(input).floor()
	if (input.eq(Infinity)) return "Infinity"
	if (input.div(effectiveBase).gt(effectiveBase.tetrate(effectiveBase.add(1)))) {
		if (coloured) {return (effectiveBase.toString() + "E" + effectiveBase.toString() + "<span style='color: red'>#^^#</span>" + effectiveBase.toString())}
		else {return (effectiveBase.toString() + "E" + effectiveBase.toString() + "#^^#" + effectiveBase.toString())}
	}
	if (input.gt(effectiveBase.pow(effectiveBase.add(1)))) {finalString = "0E" + toHyperNumSection(input, effectiveBase, coloured)}
	else {finalString = modulo(input, effectiveBase).floor() + "E" + toHyperNumSection(input, effectiveBase, coloured)}
	finalString = increaseNumbersByOne(finalString)
	return finalString
}

function modulo(x,y) {
	return x.sub(x.div(y).floor().mul(y)).floor() //Normally wouldn't be floored but it's okay here
}

let hashtagColours = ["#77d", "#a7d", "#d7d", "#d77", "#da7", "#dd7", "#7d7", "#7dd", "#7ad"]

function toHyperNumSection(input, base=10, coloured=false, recursionLimit=new Decimal(13)) {
    if (recursionLimit.eq(0)) {return '...'}
    input = new Decimal(input).round()
    base = new Decimal(base)
    if (input.lt(base.pow(2))) {return input.div(base).floor();}
    let input_=input.div(base);
    level = input_.log(base).log(base).floor();
    //if (level.eq(1) && input.eq(new Decimal(base).pow(input.log(base).div(base).floor().mul(base).add(1)).floor())) {level=level.sub(1);}
    let threshold = base.pow(base.pow(level)).floor();
    let delimiter = hashtags_pow(level.add(1), base.add(1))
		//Simplify the number beyond x#^#*#^#x
    //let truncate = input.gte(base.pow(base.pow(base.add(1).mul(2).sub(1))))
    let truncate = false
    if (level.eq(0)) {
        if (coloured) {return modulo(input.div(base), base) + "<span style='color: #77d'>#</span>" + toHyperNumSection(input.div(base).add(1e-8).floor(), base, coloured, recursionLimit.sub(1))}
        else {return modulo(input.div(base), base) + "#" + toHyperNumSection(input.div(base).add(1e-8).floor(), base, coloured, recursionLimit.sub(1))}
    }
    else {
        //Start should say "0" for 1E1##2, or base.sub(1) for 1eX##2 where X is the base
        if (coloured) {return base.sub(1) + "<span style='color: " + hashtagColours[level%9] + "'>" + delimiter + "</span>" + (truncate?base.sub(1).toString():toHyperNumSection(input.div(threshold).add(1e-8).floor(), base, coloured, recursionLimit.sub(1)))}
        else {return base.sub(1) + delimiter + (truncate?base.sub(1).toString():toHyperNumSection(input.div(threshold).add(1e-8).floor(), base, coloured, recursionLimit.sub(1)))}
    }
}

function hashtags_pow(x, base, recursionLimit=new Decimal(7)){
    if (recursionLimit.eq(0)) {return '...'}
    if (x.eq(0)) {return '1';}
    base = new Decimal(base);
    let threshold = base.pow(x);
    let level = x
    let k = undefined;
    let fixedLevel = base.pow(level.log(base).floor());
    let flag = false;
    if (level.div(fixedLevel).gte(5)&&x.lt(base.pow(base.pow(base.pow(2))))) {k = `#<sup>${hashtags(fixedLevel.mul(level.div(fixedLevel).add(1e-8).sub(1).floor()), base)}</sup>`; flag = true;}
    else {k = `#<sup>${hashtags(fixedLevel,base)}</sup>`;}
    if (x.lt(base.pow(base.pow(2)))) {
        let rem = flag?(level.sub(fixedLevel.mul(level.div(fixedLevel).floor()))):(level.sub(fixedLevel));
        if (rem.gt(0)) {k += (!hashtags_pow(fixedLevel,base).match(/\.(<\/sup>)*$/))?('*'.repeat(fixedLevel.gt(1))+hashtags_pow(rem,base,recursionLimit.sub(1))):'';}
    }
    return k.replaceAll('<sup>1</sup>','');
}

function hashtags(x, base=10, recursionLimit=new Decimal(7)) {
    if (recursionLimit.eq(0)) {return '...'}
    x = new Decimal(x).round();
    base = new Decimal(base);
    if (x.lt(base)) {return x.toString();}
    let threshold = base.pow(x.log(base).floor());
    let level = x.log(base).add(1e-8).floor()
    let copies = x.div(base.pow(level)).add(1e-8).floor();
    let rem = undefined;
    let k = hashtags_pow(level,base,recursionLimit);
    if (x.lt(base.pow(base.pow(base.pow(2))))) {
        if (copies.gte(5)&&!k.match(/\.(<\/sup>)*$/)) {k += copies.floor().toString(); rem = x.sub(base.pow(level).mul(copies));}
        else {rem = x.sub(base.pow(level));}
        if (rem.floor().gt(0)&&!k.match(/\.(<\/sup>)*$/)){k += '+' + hashtags(rem,base,recursionLimit.sub(1));}
    }
    return k.replaceAll('<sup>1</sup>','');
}

function increaseNumbersByOne(str) {
	return str.replace(/\d+\#/g, function(match) {
		return parseInt(match, 10) + 1 + '#'
	}).replace(/\d+E/g, function(match) {
		return parseInt(match, 10) + 1 + 'E'
	}).replace(/\d+</g, function(match) {
		return parseInt(match, 10) + 1 + '<'
	}).replace(/\d+$/g, function(match) {
		return parseInt(match, 10) + 1
	})
}