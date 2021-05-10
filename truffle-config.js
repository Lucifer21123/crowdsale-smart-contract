module.exports = {
	
	networks: {
		development: {
			host: "127.0.0.1",
    		port: 8545,	// ganache-cli
    		network_id: "*",
			gasLimit: 8500000,
			gasPrice: 20000000000
    	}
  	},

  	mocha: {
    	// timeout: 100000
  	},

  	compilers: {
    	solc: {
    		version: "0.6.12", 
    		settings: {
				optimizer: {
    				enabled: false,
    				runs: 200
    			}
    		}
    	}
	}
};
