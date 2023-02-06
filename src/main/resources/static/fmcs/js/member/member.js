var dsMerge = function(src, target) {
	var resultDs = [];
	var srcDs = [];
	var targetDs = [];
	
	try {
		srcDs = src.items();
	} catch(e) {
		if (src) {
			srcDs = src;
		}
	}
	
	try {
		targetDs = target.items();
	} catch(e) {
		if (target) {
			targetDs = target;
		}
	}	
	
	if (targetDs) {
		targetDs.push(...srcDs);	
		resultDs = targetDs;
	} else {
		resultDs = srcDs;
	}
	
    return resultDs;
}

var dsRemove = function(src, target, key) {
	var resultDs = [];
	var srcDs = [];
	var targetDs = [];
	
	try {
		srcDs = src.items();
	} catch(e) {
		if (src) {
			srcDs = src;
		}
	}
	
	try {
		targetDs = target.items();
	} catch(e) {
		if (target) {
			targetDs = target;
		}
	}	
	
	resultDs = srcDs;
	targetDs.forEach(row => {
		const iFind = resultDs.findIndex((item) => item[key] === row[key]);
		
		if (iFind > -1) {
			resultDs.splice(iFind, 1);
		}		
	});
	
	
    return resultDs;
}