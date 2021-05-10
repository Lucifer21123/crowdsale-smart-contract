module.exports = {


  networks: {
	development: {
	host: "127.0.0.1",     // Localhost (default: none)
    	port: 7545,            // Standard Ethereum port (default: none)
    	network_id: "*",       // Any network (default: none)
	gas: 8500000,
	gasPrice: 20000000000
    	}
  },

  // Set default mocha options here, use special reporters etc.
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
