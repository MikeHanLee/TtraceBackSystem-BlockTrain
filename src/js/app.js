var accounts;
var account;
var AscendContract;
var AscendCode;
var roles = {
	PRODUCER: "Producer",
	TRADESMAN: "Tradesman",
	CONSUMER: "Consumer",
	NONE: "none"
};
var abi;
var address;
var deployedAscend;
window.App = {
	start: function() {
		var self = this;
		web3.eth.getAccounts(function(err, accs) {
			console.log(accs);
			if(err != null) {
				alert("Error in fetching accounts!");
				return;
			}
			if(accs.length == 0) {
				alert("Can not get any accounts!");
				return;
			}
			accounts = accs;
			account = accounts[0];
			web3.eth.defaultAccount = account;
			BrowserSolc.loadVersion('soljson-v0.4.24+commit.e67f0147.js', function(compiler) {
				abi = [{
						"constant": true,
						"inputs": [],
						"name": "DisplayProduct",
						"outputs": [{
								"name": "",
								"type": "uint256[]"
							},
							{
								"name": "",
								"type": "bytes32[]"
							},
							{
								"name": "",
								"type": "bytes32[]"
							},
							{
								"name": "",
								"type": "bytes32[]"
							},
							{
								"name": "",
								"type": "address[]"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "GetAllObjectInfo",
						"outputs": [{
								"name": "",
								"type": "uint256[]"
							},
							{
								"name": "",
								"type": "address[]"
							},
							{
								"name": "",
								"type": "bytes32[]"
							},
							{
								"name": "",
								"type": "bytes32[]"
							},
							{
								"name": "",
								"type": "uint8[]"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [{
								"name": "_product_id",
								"type": "bytes32"
							},
							{
								"name": "_product_name",
								"type": "bytes32"
							}
						],
						"name": "ProducerSetProductInfo",
						"outputs": [{
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [{
								"name": "_email",
								"type": "bytes32"
							},
							{
								"name": "_password",
								"type": "bytes32"
							}
						],
						"name": "loginroot",
						"outputs": [{
							"name": "",
							"type": "uint8"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [{
							"name": "_need_role",
							"type": "uint8"
						}],
						"name": "SetRole",
						"outputs": [{
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [{
							"name": "_address",
							"type": "address"
						}],
						"name": "GetRole",
						"outputs": [{
								"name": "",
								"type": "uint8"
							},
							{
								"name": "",
								"type": "bytes32"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [{
							"name": "_product_count",
							"type": "uint256"
						}],
						"name": "TradesmanSetProductInfo",
						"outputs": [{
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [{
								"name": "_email",
								"type": "bytes32"
							},
							{
								"name": "_password",
								"type": "bytes32"
							}
						],
						"name": "login",
						"outputs": [{
							"name": "",
							"type": "uint8"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [{
							"name": "_product_id",
							"type": "bytes32"
						}],
						"name": "FindById",
						"outputs": [{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "bytes32"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [{
								"name": "i",
								"type": "uint256"
							},
							{
								"name": "_product_name",
								"type": "bytes32"
							}
						],
						"name": "FindByName",
						"outputs": [{
								"name": "",
								"type": "uint256"
							},
							{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "uint256"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "GetProductCount",
						"outputs": [{
							"name": "",
							"type": "uint256"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "GetObjectInfo",
						"outputs": [{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "address"
							},
							{
								"name": "",
								"type": "uint8"
							},
							{
								"name": "",
								"type": "uint8"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [],
						"name": "theperson",
						"outputs": [{
							"name": "",
							"type": "address"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [{
								"name": "_name",
								"type": "bytes32"
							},
							{
								"name": "_password",
								"type": "bytes32"
							},
							{
								"name": "_email",
								"type": "bytes32"
							},
							{
								"name": "_object_role",
								"type": "uint8"
							}
						],
						"name": "SetObjectInfo",
						"outputs": [{
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"constant": true,
						"inputs": [{
							"name": "_product_id",
							"type": "bytes32"
						}],
						"name": "GetMoreInfo",
						"outputs": [{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "bytes32"
							},
							{
								"name": "",
								"type": "address"
							},
							{
								"name": "",
								"type": "bytes32[]"
							},
							{
								"name": "",
								"type": "uint8[]"
							},
							{
								"name": "",
								"type": "address[]"
							},
							{
								"name": "",
								"type": "uint256"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"inputs": [],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "constructor"
					},
					{
						"anonymous": false,
						"inputs": [{
								"indexed": false,
								"name": "Product_id",
								"type": "bytes32"
							},
							{
								"indexed": false,
								"name": "Product_name",
								"type": "bytes32"
							},
							{
								"indexed": false,
								"name": "Producer_address",
								"type": "address"
							}
						],
						"name": "SetProductInfoByProducer",
						"type": "event"
					},
					{
						"anonymous": false,
						"inputs": [{
								"indexed": false,
								"name": "Product_id",
								"type": "bytes32"
							},
							{
								"indexed": false,
								"name": "Product_name",
								"type": "bytes32"
							},
							{
								"indexed": false,
								"name": "Tradesman_address",
								"type": "address"
							}
						],
						"name": "SetProductInfoByTradesman",
						"type": "event"
					},
					{
						"anonymous": false,
						"inputs": [{
								"indexed": false,
								"name": "Name",
								"type": "bytes32"
							},
							{
								"indexed": false,
								"name": "Email",
								"type": "bytes32"
							},
							{
								"indexed": false,
								"name": "Object_Role",
								"type": "uint8"
							},
							{
								"indexed": false,
								"name": "Object_Need_Role",
								"type": "uint8"
							}
						],
						"name": "LoginSetInfo",
						"type": "event"
					},
					{
						"anonymous": false,
						"inputs": [{
								"indexed": false,
								"name": "Name",
								"type": "bytes32"
							},
							{
								"indexed": false,
								"name": "Address",
								"type": "address"
							},
							{
								"indexed": false,
								"name": "Object_Need_Role",
								"type": "uint8"
							}
						],
						"name": "LoginSetRole",
						"type": "event"
					}
				]
				address = '0x3fa4a4bf88efaf15ded82c6afcef1d1144c79eac';
				deployedAscend = web3.eth.contract(abi).at(address);
			});
		});
	},
	initialFunc: function() {
		document.getElementById("header").style.display = "block";
		document.getElementById("chief").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("container").style.display = "block";
		document.getElementById("login").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("product").style.display = "none";
		document.getElementById("thePerson").style.display = "none";
		document.getElementById("producer").style.display = "none";
		document.getElementById("tradesman").style.display = "none";
		document.getElementById("consumer").style.display = "none";
		document.getElementById("setting").style.display = "none";
	},
	displayLogin: function() {
		document.getElementById("header").style.display = "block";
		document.getElementById("chief").style.display = "block";
		document.getElementById("login").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("btn").onclick = function() {
			App.login();
		}
		document.getElementById("btnroot").style.display = "block";
		document.getElementById("container").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("product").style.display = "none";
		document.getElementById("thePerson").style.display = "none";
		document.getElementById("producer").style.display = "none";
		document.getElementById("tradesman").style.display = "none";
		document.getElementById("consumer").style.display = "none";
		document.getElementById("setting").style.display = "none";
	},
	displayLoginRoot: function() {
		document.getElementById("header").style.display = "block";
		document.getElementById("chief").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("login").style.display = "block";
		document.getElementById("btn").onclick = function() {
			App.loginroot();
		}
		document.getElementById("btnroot").style.display = "none";
		document.getElementById("container").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("product").style.display = "none";
		document.getElementById("thePerson").style.display = "none";
		document.getElementById("producer").style.display = "none";
		document.getElementById("tradesman").style.display = "none";
		document.getElementById("consumer").style.display = "none";
		document.getElementById("setting").style.display = "none";
	},
	displayRegister: function() {
		document.getElementById("header").style.display = "block";
		document.getElementById("chief").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("register").style.display = "block";
		document.getElementById("container").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("product").style.display = "none";
		document.getElementById("thePerson").style.display = "none";
		document.getElementById("producer").style.display = "none";
		document.getElementById("tradesman").style.display = "none";
		document.getElementById("consumer").style.display = "none";
		document.getElementById("setting").style.display = "none";
	},
	displayProduct: function() {
		document.getElementById("header").style.display = "block";
		document.getElementById("chief").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("product").style.display = "block";
		document.getElementById("container").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("thePerson").style.display = "none";
		document.getElementById("producer").style.display = "none";
		document.getElementById("tradesman").style.display = "none";
		document.getElementById("consumer").style.display = "none";
		document.getElementById("setting").style.display = "none";
	},
	displayTheperson: function() {
		document.getElementById("header").style.display = "block";
		document.getElementById("chief").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("thePerson").style.display = "block";
		document.getElementById("container").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("product").style.display = "none";
		document.getElementById("producer").style.display = "none";
		document.getElementById("tradesman").style.display = "none";
		document.getElementById("consumer").style.display = "none";
		document.getElementById("setting").style.display = "none";
	},
	displayProducer: function() {
		document.getElementById("header").style.display = "block";
		document.getElementById("chief").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("producer").style.display = "block";
		document.getElementById("container").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("product").style.display = "none";
		document.getElementById("thePerson").style.display = "none";
		document.getElementById("tradesman").style.display = "none";
		document.getElementById("consumer").style.display = "none";
		document.getElementById("setting").style.display = "none";
	},
	displayTradesman: function() {
		document.getElementById("header").style.display = "block";
		document.getElementById("chief").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("tradesman").style.display = "block";
		document.getElementById("container").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("product").style.display = "none";
		document.getElementById("thePerson").style.display = "none";
		document.getElementById("producer").style.display = "none";
		document.getElementById("consumer").style.display = "none";
		document.getElementById("setting").style.display = "none";
	},
	displayConsumer: function() {
		document.getElementById("header").style.display = "block";
		document.getElementById("chief").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("consumer").style.display = "block";
		document.getElementById("container").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("product").style.display = "none";
		document.getElementById("thePerson").style.display = "none";
		document.getElementById("producer").style.display = "none";
		document.getElementById("tradesman").style.display = "none";
		document.getElementById("setting").style.display = "none";
	},
	displaySetting: function() {
		document.getElementById("chief").style.display = "block";
		document.getElementById("setting").style.display = "block";
		document.getElementById("footer").style.display = "block";
		document.getElementById("header").style.display = "block";
		document.getElementById("container").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("product").style.display = "none";
		document.getElementById("thePerson").style.display = "none";
		document.getElementById("producer").style.display = "none";
		document.getElementById("tradesman").style.display = "none";
		document.getElementById("consumer").style.display = "none";
	},
	displayObject_Info: function() {
		App.displaySetting();
		document.getElementById("object_info").style.display = "block";
		document.getElementById("object_info").innerHTML = "";
		document.getElementById("setrole").style.display = "none";
		document.getElementById("getrole").style.display = "none";
		document.getElementById("roleinfo").style.display = "none";
		document.getElementById("setproduct").style.display = "none";
		document.getElementById("buyproduct").style.display = "none";
	},
	displaySetRole: function() {
		App.displaySetting();
		document.getElementById("setrole").style.display = "block";
		document.getElementById("object_info").style.display = "none";
		document.getElementById("getrole").style.display = "none";
		document.getElementById("roleinfo").style.display = "none";
		document.getElementById("setproduct").style.display = "none";
		document.getElementById("buyproduct").style.display = "none";
	},
	displayGetRole: function() {
		App.displaySetting();
		document.getElementById("getrole").style.display = "block";
		document.getElementById("setrole").style.display = "none";
		document.getElementById("object_info").style.display = "none";
		document.getElementById("roleinfo").style.display = "none";
		document.getElementById("setproduct").style.display = "none";
		document.getElementById("buyproduct").style.display = "none";
	},
	displayRoleInfo: function() {
		App.displaySetting();
		document.getElementById("roleinfo").style.display = "block";
		document.getElementById("roleinfo").innerHTML = "";
		document.getElementById("setrole").style.display = "none";
		document.getElementById("object_info").style.display = "none";
		document.getElementById("getrole").style.display = "none";
		document.getElementById("setproduct").style.display = "none";
		document.getElementById("buyproduct").style.display = "none";
	},
	displaySetProductInfo: function() {
		App.displaySetting();
		document.getElementById("setproduct").style.display = "block";
		document.getElementById("setrole").style.display = "none";
		document.getElementById("object_info").style.display = "none";
		document.getElementById("getrole").style.display = "none";
		document.getElementById("roleinfo").style.display = "none";
		document.getElementById("buyproduct").style.display = "none";
	},
	displayBuyProduct: function() {
		App.displaySetting();
		document.getElementById("buyproduct").style.display = "block";
		document.getElementById("setrole").style.display = "none";
		document.getElementById("object_info").style.display = "none";
		document.getElementById("getrole").style.display = "none";
		document.getElementById("roleinfo").style.display = "none";
		document.getElementById("setproduct").style.display = "none";
	},
	displayProduct_Info: function() {
		App.displayProduct();
		document.getElementById("product_info").style.display = "block";
		document.getElementById("product_info").innerHTML = "";
		document.getElementById("productsearch").style.display = "none";
	},
	displayProduct_Search: function() {
		App.displayProduct();
		document.getElementById("productsearch").style.display = "block";
		document.getElementById("productsearch").innerHTML = "";
		document.getElementById("product_info").style.display = "none";
	},
	checkRole: function(value) {
		switch(value) {
			case '0':
				{
					var role = roles.PRODUCER;
					break;
				}
			case '1':
				{
					var role = roles.TRADESMAN;
					break;
				}
			case '2':
				{
					var role = roles.CONSUMER;
					break;
				}
			default:
				{
					var role = roles.NONE;
					break;
				}
		}
		return role;
	},
	setObjectInfo: function() {
		App.displayLogin();
		var _email = document.getElementById("emailinput_register").value;
		var _password = document.getElementById("passwordinput_register").value;
		var _name = document.getElementById("nameinput_register").value;
		var _role = document.getElementById("roleselect_register").value;
		deployedAscend = web3.eth.contract(abi).at(address);
		deployedAscend.SetObjectInfo(_name, _password, _email, _role, function(error) {
			if(error) {
				console.error(error);
				return;
			}
			var LoginSetInfo = deployedAscend.LoginSetInfo();
			LoginSetInfo.watch(function(error, result) {
				if(!error) {
					//console.log(web3.toAscii(result.args.Name));
					//console.log(web3.toAscii(result.args.Object_Role));
					console.log(result);
				}
			});
		});
	},
	loginroot: function() {
		var _email = document.getElementById("emailinput_login").value;
		var _password = document.getElementById("passwordinput_login").value;
		deployedAscend.loginroot(_email, _password, function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			console.log(App.checkRole(returnvalue.toString()));
			switch(returnvalue.toString()) {
				case '0':
					var btn = document.getElementById("person");
					btn.onclick = function() {
						App.displayProducer();
					};
					App.displayProducer();
					break;
				case '1':
					var btn = document.getElementById("person");
					btn.onclick = function() {
						App.displayTradesman();
					};
					App.displayTradesman();
					break;
				case '2':
					var btn = document.getElementById("person");
					btn.onclick = function() {
						App.displayConsumer();
					};
					App.displayConsumer();
					break;
				default:
					var btn = document.getElementById("person");
					btn.onclick = function() {
						App.displayTheperson();
					};
					App.displayTheperson();
					break;
			}
			App.setPersonRoot();
		});
	},
	login: function() {
		var _email = document.getElementById("emailinput_login").value;
		var _password = document.getElementById("passwordinput_login").value;
		deployedAscend.login(_email, _password, function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			console.log(App.checkRole(returnvalue.toString()));
			switch(returnvalue.toString()) {
				case '0':
					var btn = document.getElementById("person");
					btn.onclick = function() {
						App.displayProducer();
					};
					App.displayProducer();
					break;
				case '1':
					var btn = document.getElementById("person");
					btn.onclick = function() {
						App.displayTradesman();
					};
					App.displayTradesman();
					break;
				case '2':
					var btn = document.getElementById("person");
					btn.onclick = function() {
						App.displayConsumer();
					};
					App.displayConsumer();
					break;
				default:
					var btn = document.getElementById("person");
					btn.onclick = function() {
						App.displayTheperson();
					};
					App.displayTheperson();
					break;
			}
			App.setPerson();
		});
	},
	setPerson: function() {
		deployedAscend.GetObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			console.log(returnvalue);
			var btn = document.getElementById("person");
			btn.innerText = web3.toAscii(returnvalue[0]).replace(/\0/g, '');
		});
	},
	setPersonRoot: function() {
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			console.log(returnvalue);
			var btn = document.getElementById("person");
			btn.innerText = web3.toAscii(returnvalue[2][0]).replace(/\0/g, '');
		});
	},
	dropout: function() {
		App.displayLogin();
		var btn = document.getElementById("person");
		btn.innerText = "登录";
		btn.onclick = function() {
			App.displayLogin();
		};
	},
	getObjectInfo: function() {
		App.displayObject_Info();
		deployedAscend.GetObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			console.log(returnvalue);
			var div = document.getElementById("object_info");
			var table = document.createElement('table');
			var tr1 = document.createElement('tr');
			var tr2 = document.createElement('tr');
			var tr3 = document.createElement('tr');
			var tr4 = document.createElement('tr');
			var tr5 = document.createElement('tr');
			var th1 = document.createElement('th');
			var th2 = document.createElement('th');
			var th3 = document.createElement('th');
			var th4 = document.createElement('th');
			var th5 = document.createElement('th');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');
			var td4 = document.createElement('td');
			var td5 = document.createElement('td');
			var _email = document.createTextNode(web3.toAscii(returnvalue[1]).replace(/\0/g, ''));
			var _name = document.createTextNode(web3.toAscii(returnvalue[0]).replace(/\0/g, ''));
			var _role = document.createTextNode(App.checkRole(returnvalue[3].toString()));
			var _address = document.createTextNode(returnvalue[2]);
			var _need_role = document.createTextNode(App.checkRole(returnvalue[4].toString()));
			var th1_info = document.createTextNode("姓名：");
			var th2_info = document.createTextNode("邮箱：");
			var th3_info = document.createTextNode("身份：");
			var th4_info = document.createTextNode("地址：");
			var th5_info = document.createTextNode("指定身份：");
			td1.appendChild(_name);
			td2.appendChild(_email);
			td3.appendChild(_role);
			td4.appendChild(_address);
			td5.appendChild(_need_role);
			th1.appendChild(th1_info);
			th2.appendChild(th2_info);
			th3.appendChild(th3_info);
			th4.appendChild(th4_info);
			th5.appendChild(th5_info);
			tr1.appendChild(th1);
			tr2.appendChild(th2);
			tr3.appendChild(th3);
			tr4.appendChild(th4);
			tr5.appendChild(th5);
			tr1.appendChild(td1);
			tr2.appendChild(td2);
			tr3.appendChild(td3);
			tr4.appendChild(td4);
			tr5.appendChild(td5);
			table.appendChild(tr1);
			table.appendChild(tr2);
			table.appendChild(tr3);
			table.appendChild(tr4);
			table.appendChild(tr5);
			div.appendChild(table);
		});
	},
	getAllObjectInfo: function() {
		App.displayObject_Info();
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			console.log(returnvalue);
			var div = document.getElementById("object_info");
			for(var i = 0; i < returnvalue[0].length; i++) {
				var table = document.createElement('table');
				var tr1 = document.createElement('tr');
				var tr2 = document.createElement('tr');
				var tr3 = document.createElement('tr');
				var tr4 = document.createElement('tr');
				var tr5 = document.createElement('tr');
				var th1 = document.createElement('th');
				var th2 = document.createElement('th');
				var th3 = document.createElement('th');
				var th4 = document.createElement('th');
				var th5 = document.createElement('th');
				var td1 = document.createElement('td');
				var td2 = document.createElement('td');
				var td3 = document.createElement('td');
				var td4 = document.createElement('td');
				var td5 = document.createElement('td');
				var _id = document.createTextNode(returnvalue[0][i]);
				var _name = document.createTextNode(web3.toAscii(returnvalue[2][i]).replace(/\0/g, ''));
				var _role = document.createTextNode(App.checkRole(returnvalue[3][i].toString()));
				var _address = document.createTextNode(returnvalue[1][i]);
				var th1_info = document.createTextNode("序号：");
				var th2_info = document.createTextNode("姓名：");
				var th3_info = document.createTextNode("身份：");
				var th4_info = document.createTextNode("地址：");
				td1.appendChild(_id);
				td2.appendChild(_name);
				td3.appendChild(_role);
				td4.appendChild(_address);
				th1.appendChild(th1_info);
				th2.appendChild(th2_info);
				th3.appendChild(th3_info);
				th4.appendChild(th4_info);
				tr1.appendChild(th1);
				tr2.appendChild(th2);
				tr3.appendChild(th3);
				tr4.appendChild(th4);
				tr1.appendChild(td1);
				tr2.appendChild(td2);
				tr3.appendChild(td3);
				tr4.appendChild(td4);
				table.appendChild(tr1);
				table.appendChild(tr2);
				table.appendChild(tr3);
				table.appendChild(tr4);
				div.appendChild(table);
			}
		});
	},
	setRole: function() {
		var _need_role = document.getElementById("roleselect_setrole").value;
		deployedAscend.SetRole(_need_role, function(error) {
			if(error) {
				console.error(error);
				return;
			}
			var LoginSetRole = deployedAscend.LoginSetRole();
			LoginSetRole.watch(function(error, result) {
				if(!result) {
					console.log(result);
				} else {
					console.log(error);
				}
			});
		});
	},
	getRole: function() {
		App.displayRoleInfo();
		var _address = document.getElementById("addressinput_getrole").value;
		deployedAscend.GetRole.call(_address, function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			console.log(returnvalue);
			var div = document.getElementById("roleinfo");
			var table = document.createElement('table');
			var tr1 = document.createElement('tr');
			var tr2 = document.createElement('tr');
			var th1 = document.createElement('th');
			var th2 = document.createElement('th');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var _name = document.createTextNode(web3.toAscii(returnvalue[1]).replace(/\0/g, ''));
			var _need_role = document.createTextNode(App.checkRole(returnvalue[0].toString()));
			var th1_info = document.createTextNode("姓名：");
			var th2_info = document.createTextNode("指定身份：");
			th1.appendChild(th1_info);
			th2.appendChild(th2_info);
			td1.appendChild(_name);
			td2.appendChild(_need_role);
			tr1.appendChild(th1);
			tr2.appendChild(th2);
			tr1.appendChild(td1);
			tr2.appendChild(td2);
			table.appendChild(tr1);
			table.appendChild(tr2);
			div.appendChild(table);
		});
	},
	producerSetProductInfo: function() {
		App.displayProducer();
		var _product_id = document.getElementById("productidinput_setproduct").value;
		var _product_name = document.getElementById("productnameinput_setproduct").value;
		_product_id = 'id' + _product_id;
		deployedAscend.ProducerSetProductInfo(_product_id, _product_name, function(error, result) {
			if(error) {
				console.error(error);
				return;
			}
			var SetProductInfoByProducer = deployedAscend.SetProductInfoByProducer();
			SetProductInfoByProducer.watch(function(error, result) {
				if(!result) {
					console.log(result);
				} else {
					console.log(error);
				}
			});
		});
	},
	displayAllProduct: function() {
		App.displayProduct_Info();
		var _id = new Array();
		deployedAscend.DisplayProduct.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			console.log(returnvalue);
			var div = document.getElementById("product_info");
			for(var i = 0; i < returnvalue[0].length; i++) {
				var table = document.createElement('table');
				var tr1 = document.createElement('tr');
				var tr2 = document.createElement('tr');
				var tr3 = document.createElement('tr');
				var tr4 = document.createElement('tr');
				var tr5 = document.createElement('tr');
				var tr6 = document.createElement('tr');
				var th1 = document.createElement('th');
				var th2 = document.createElement('th');
				var th3 = document.createElement('th');
				var th4 = document.createElement('th');
				var th5 = document.createElement('th');
				var th6 = document.createElement('th');
				var td1 = document.createElement('td');
				var td2 = document.createElement('td');
				var td3 = document.createElement('td');
				var td4 = document.createElement('td');
				var td5 = document.createElement('td');
				var _product_count = document.createTextNode(returnvalue[0][i]);
				var _product_id = document.createTextNode(web3.toAscii(returnvalue[1][i]).replace(/\0/g, ''));
				var _product_name = document.createTextNode(web3.toAscii(returnvalue[2][i]).replace(/\0/g, ''));
				var _producer_name = document.createTextNode(web3.toAscii(returnvalue[3][i]).replace(/\0/g, ''));
				var _producer_address = document.createTextNode(returnvalue[4][i]);
				var th1_info = document.createTextNode("产品序号：");
				var th2_info = document.createTextNode("产品ID：");
				var th3_info = document.createTextNode("产品名称：");
				var th4_info = document.createTextNode("生产者姓名：");
				var th5_info = document.createTextNode("生产者地址：");
				var th6_info = document.createTextNode("查询详情");
				th1.appendChild(th1_info);
				th2.appendChild(th2_info);
				th3.appendChild(th3_info);
				th4.appendChild(th4_info);
				th5.appendChild(th5_info);
				th6.appendChild(th6_info);
				th6.style.color = "#22FFFF";
				th6.id = 'id' + i;
				th6.onclick = function() {
					App.getMoreInfo(document.getElementById('id_' + this.id).innerHTML);
				}
				td1.appendChild(_product_count);
				td2.appendChild(_product_id);
				td3.appendChild(_product_name);
				td4.appendChild(_producer_name);
				td5.appendChild(_producer_address);
				td2.id = 'id_id' + i;
				tr1.appendChild(th1);
				tr2.appendChild(th2);
				tr3.appendChild(th3);
				tr4.appendChild(th4);
				tr5.appendChild(th5);
				tr6.appendChild(th6);
				tr1.appendChild(td1);
				tr2.appendChild(td2);
				tr3.appendChild(td3);
				tr4.appendChild(td4);
				tr5.appendChild(td5);
				table.appendChild(tr1);
				table.appendChild(tr2);
				table.appendChild(tr3);
				table.appendChild(tr4);
				table.appendChild(tr5);
				table.appendChild(tr6);
				table.style.float = 'left';
				table.style.margin = '5%';
				div.appendChild(table);
			}
		});
	},
	///???ALERT: Transaction Error. Exception thrown in contract code.
	tradesmanSetProductInfo: function() {
		App.displayTradesman();
		var _product_count = document.getElementById("productcountinput_setproducttradesman").value;
		deployedAscend.TradesmanSetProductInfo(_product_count, function(error, result) {
			if(error) {
				console.error(error);
				return;
			}
			var SetProductInfoByTradesman = deployedAscend.SetProductInfoByTradesman();
			SetProductInfoByTradesman.watch(function(error, result) {
				if(!result) {
					console.log(result);
				} else {
					console.log(error);
				}
			});
		});
	},
	chooseID: function() {
		var btn = document.getElementById("ascendproduct");
		var inp = document.getElementById("searchproduct");
		btn.onclick = function() {
			App.findById();
		};
		inp.placeholder = "请输入追溯码";
	},
	chooseNAME: function() {
		var btn = document.getElementById("ascendproduct");
		var inp = document.getElementById("searchproduct");
		btn.onclick = function() {
			App.findName(0);
		};
		inp.placeholder = "请输入产品名称";
	},
	chooseDIVID: function() {
		var btn = document.getElementById("ascendproduct");
		var inp = document.getElementById("searchproduct");
		btn.onclick = function() {
			App.findByDivid();
		};
		inp.placeholder = "请输入产品所属分类";
	},
	findById: function() {
		App.displayProduct_Search();
		var _product_id = document.getElementById("searchproduct").value;
		deployedAscend.FindById.call(_product_id, function(error, returnvalue) {
			var div = document.getElementById("productsearch");
			if(error) {
				console.error(error);
				alert("不存在该产品");
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			console.log(returnvalue);
			var table = document.createElement('table');
			var tr1 = document.createElement('tr');
			var tr2 = document.createElement('tr');
			var tr3 = document.createElement('tr');
			var tr4 = document.createElement('tr');
			var tr5 = document.createElement('tr');
			var th1 = document.createElement('th');
			var th2 = document.createElement('th');
			var th3 = document.createElement('th');
			var th4 = document.createElement('th');
			var th5 = document.createElement('th');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');
			var td4 = document.createElement('td');
			var td5 = document.createElement('td');
			var _product_id = document.createTextNode(web3.toAscii(returnvalue[0]).replace(/\0/g, ''));
			var _product_name = document.createTextNode(web3.toAscii(returnvalue[1]).replace(/\0/g, ''));
			var _producer_name = document.createTextNode(web3.toAscii(returnvalue[2]).replace(/\0/g, ''));
			var _producer_address = document.createTextNode(returnvalue[3]);
			var th1_info = document.createTextNode("产品ID：");
			var th2_info = document.createTextNode("产品名称：");
			var th3_info = document.createTextNode("生产者姓名：");
			var th4_info = document.createTextNode("生产者地址：");
			th1.appendChild(th1_info);
			th2.appendChild(th2_info);
			th3.appendChild(th3_info);
			th4.appendChild(th4_info);
			td1.appendChild(_product_id);
			td2.appendChild(_product_name);
			td3.appendChild(_producer_name);
			td4.appendChild(_producer_address);
			tr1.appendChild(th1);
			tr2.appendChild(th2);
			tr3.appendChild(th3);
			tr4.appendChild(th4);
			tr1.appendChild(td1);
			tr2.appendChild(td2);
			tr3.appendChild(td3);
			tr4.appendChild(td4);
			table.appendChild(tr1);
			table.appendChild(tr2);
			table.appendChild(tr3);
			table.appendChild(tr4);
			div.appendChild(table);
		});
	},
	findName: function(_count) {
		App.displayProduct_Search();
		var _product_name = document.getElementById("searchproduct").value;
		deployedAscend.GetProductCount.call(function(error, returnvalue) {
			if(error) {
				alert("搜索完毕");
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue; i++) {
				App.findByName(i, _product_name);
			}
		});
	},
	findByName: function(_count, _product_name) {
		deployedAscend.FindByName.call(_count, _product_name, function(error, returnvalue) {
			var div = document.getElementById("productsearch");
			if(error) {
				alert("搜索完毕");
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			console.log(returnvalue);
			var table = document.createElement('table');
			var tr1 = document.createElement('tr');
			var tr2 = document.createElement('tr');
			var tr3 = document.createElement('tr');
			var tr4 = document.createElement('tr');
			var tr5 = document.createElement('tr');
			var tr6 = document.createElement('tr');
			var th1 = document.createElement('th');
			var th2 = document.createElement('th');
			var th3 = document.createElement('th');
			var th4 = document.createElement('th');
			var th5 = document.createElement('th');
			var th6 = document.createElement('th');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');
			var td4 = document.createElement('td');
			var td5 = document.createElement('td');
			var _product_id = document.createTextNode(web3.toAscii(returnvalue[1]).replace(/\0/g, ''));
			var _product_name_node = document.createTextNode(web3.toAscii(returnvalue[2]).replace(/\0/g, ''));
			var _producer_name = document.createTextNode(web3.toAscii(returnvalue[3]).replace(/\0/g, ''));
			//var _producer_address = document.createTextNode(returnvalue[3][i]);
			var th1_info = document.createTextNode("产品ID：");
			var th2_info = document.createTextNode("产品名称：");
			var th3_info = document.createTextNode("生产者姓名：");
			///var th4_info = document.createTextNode("生产者地址：");
			th1.appendChild(th1_info);
			th2.appendChild(th2_info);
			th3.appendChild(th3_info);
			//th4.appendChild(th4_info);
			td1.appendChild(_product_id);
			td2.appendChild(_product_name_node);
			td3.appendChild(_producer_name);
			//td4.appendChild(_producer_address);
			tr1.appendChild(th1);
			tr2.appendChild(th2);
			tr3.appendChild(th3);
			//tr4.appendChild(th4);
			tr1.appendChild(td1);
			tr2.appendChild(td2);
			tr3.appendChild(td3);
			//tr4.appendChild(td4);
			table.appendChild(tr1);
			table.appendChild(tr2);
			table.appendChild(tr3);
			//table.appendChild(tr4);
			div.appendChild(table);
		});
	},
	findByDivid: function() {
		App.displayProduct_Search();
		var _product_divid = document.getElementById("searchproduct").value;
		var div = document.getElementById("productsearch");
	},
	getMoreInfo: function(_product_id) {
		App.displayProduct_Search();
		deployedAscend.GetMoreInfo.call(_product_id, function(error, returnvalue) {
			var div = document.getElementById("productsearch");
			if(error) {
				console.error(error);
				alert("不存在该产品");
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			console.log(returnvalue);
			var table = document.createElement('table');
			var tr1 = document.createElement('tr');
			var tr2 = document.createElement('tr');
			var tr3 = document.createElement('tr');
			var tr4 = document.createElement('tr');
			var tr5 = document.createElement('tr');
			var tr6 = document.createElement('tr');
			var tr7 = document.createElement('tr');
			var tr8 = document.createElement('tr');
			var th1 = document.createElement('th');
			var th2 = document.createElement('th');
			var th3 = document.createElement('th');
			var th4 = document.createElement('th');
			var th5 = document.createElement('th');
			var th6 = document.createElement('th');
			var th7 = document.createElement('th');
			var th8 = document.createElement('th');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');
			var td4 = document.createElement('td');
			var td5 = document.createElement('td');
			var td6 = document.createElement('td');
			var td7 = document.createElement('td');
			var td8 = document.createElement('td');
			var _product_id = document.createTextNode(web3.toAscii(returnvalue[0]).replace(/\0/g, ''));
			var _product_name = document.createTextNode(web3.toAscii(returnvalue[1]).replace(/\0/g, ''));
			var _producer_name = document.createTextNode(web3.toAscii(returnvalue[2]).replace(/\0/g, ''));
			var _producer_address = document.createTextNode(returnvalue[3]);
			var _owner_name = web3.toAscii(returnvalue[4][0]).toString().replace(/\0/g, '') + '(' + App.checkRole(returnvalue[5][0].toString()) + ')';
			for(var i = 1; i <= returnvalue[7]; i++) {
				_owner_name = _owner_name + '>>>' + web3.toAscii(returnvalue[4][i]).toString().replace(/\0/g, '') + '(' + App.checkRole(returnvalue[5][i].toString()) + ')';
			}
			var _owner_info = document.createTextNode(_owner_name);
			var _owner_address_info = returnvalue[6][0].toString() + '(' + App.checkRole(returnvalue[5][0].toString()) + ')';
			for(var i = 1; i <= returnvalue[7]; i++) {
				_owner_address_info = _owner_address_info + '\r\n' + '>>>' + returnvalue[6][i].toString() + '(' + App.checkRole(returnvalue[5][i].toString()) + ')';
			}
			var _owner_address = document.createTextNode(_owner_address_info);
			var _owner_count = document.createTextNode(returnvalue[7]);
			var backup = document.createTextNode("返回");
			var th1_info = document.createTextNode("产品ID：");
			var th2_info = document.createTextNode("产品名称：");
			var th3_info = document.createTextNode("生产者姓名：");
			var th4_info = document.createTextNode("生产者地址：");
			var th5_info = document.createTextNode("交易者信息：");
			var th6_info = document.createTextNode("交易者地址：");
			var th7_info = document.createTextNode("交易次数：");
			var th8_info = document.createTextNode("购买");
			th1.appendChild(th1_info);
			th2.appendChild(th2_info);
			th3.appendChild(th3_info);
			th4.appendChild(th4_info);
			th5.appendChild(th5_info);
			th6.appendChild(th6_info);
			th7.appendChild(th7_info);
			th8.appendChild(th8_info);
			th8.onclick = function() {
				App.displayBuyProduct();
			}
			td1.appendChild(_product_id);
			td2.appendChild(_product_name);
			td3.appendChild(_producer_name);
			td4.appendChild(_producer_address);
			td5.appendChild(_owner_info);
			td6.appendChild(_owner_address);
			td7.appendChild(_owner_count);
			td8.appendChild(backup);
			tr1.appendChild(th1);
			tr2.appendChild(th2);
			tr3.appendChild(th3);
			tr4.appendChild(th4);
			tr5.appendChild(th5);
			tr6.appendChild(th6);
			tr7.appendChild(th7);
			tr8.appendChild(th8);
			tr1.appendChild(td1);
			tr2.appendChild(td2);
			tr3.appendChild(td3);
			tr4.appendChild(td4);
			tr5.appendChild(td5);
			tr6.appendChild(td6);
			tr7.appendChild(td7);
			tr8.appendChild(td8);
			table.appendChild(tr1);
			table.appendChild(tr2);
			table.appendChild(tr3);
			table.appendChild(tr4);
			table.appendChild(tr5);
			table.appendChild(tr6);
			table.appendChild(tr7);
			table.appendChild(tr8);
			div.appendChild(table);
		});
	}
};

window.addEventListener('load', function() {
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if(typeof web3 !== 'undefined') {
		console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
		// Use Mist/MetaMask's provider
		window.web3 = new Web3(web3.currentProvider);
	} else {
		console.warn("No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
	}
	App.start();
});