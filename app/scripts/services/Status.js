'use strict';

var Status = function() {
  	var status = false;
    return {
    	getStatus: function() {
    		return status;
    	},
    	setStatus: function(val) {
    		status = val;
    	}
    };
};

module.exports = Status;