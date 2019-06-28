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
var classes = {
	JEWELLERY: "Jewellery",
	JADE: "Jade",
	CRAFT: "Craft",
	NONE: "none"
};
var grades = {
	FIRST_GRADE: "FirstGrade",
	SECOND_GRADE: "SecondGrade",
	THIRD_GRADE: "ThirdGrade",
	NONE: "none"
};
var abi;
var address;
var deployedAscend;
var deployedAs;
var abipy;
window.App = {
	web3Provider: null,
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
			$.getJSON('../build/contracts/Ascend.json', function(data) {
				// 用Ascend.json数据创建一个可交互的TruffleContract合约实例。
				//address = '0xea3f088b76aa2d513e9c9396ac35aa9c3f0418c3';
				//deployedAscend = web3.eth.contract(data.abi).at(address);
				deployedAs = TruffleContract(data);
				deployedAs.setProvider(App.web3Provider);
				console.log(deployedAs);
				console.log(App.web3Provider);
				deployedAs.deployed().then(function(instance) {
					deployedAscend = web3.eth.contract(data.abi).at(instance.address);
					//console.log(deployedAscend);
				}).catch(function(err) {
					console.log(err.message);
				});
				//App.contracts.Ascend = TruffleContract(abipy);
				// Set the provider for our contract
				//App.contracts.Ascend.setProvider(App.web3Provider);
				// Use our contract to retrieve and mark the adopted pets
			});
		});
	},
	initialFunc: function() {
		$("header").show();
		$("#chief").show();
		$("footer").show();
		$("#container").show();
		$("#all").hide();
		$("#login").hide();
		$("#register").hide();
		$("#product").hide();
		$("#connection").hide();
		$(document).click(function() {
			if($(".right:visible").height()) {
				if($(".right:visible").height() < 550) {
					$(".left:visible").height('550px');
				} else {
					$(".left:visible").height(($("#allparent").height() - 11.85).toString() + 'px');
				}
			} else {
				$(".left").height('550px');
			}
		});
	},
	displayLogin: function() {
		$("header").show();
		$("#chief").show();
		$("#login").show();
		$("footer").show();
		$("#all").hide();
		$("#container").hide();
		$("#register").hide();
		$("#product").hide();
		$("#connection").hide();
	},
	displayRegister: function() {
		$("header").show();
		$("#chief").show();
		$("footer").show();
		$("#register").show();
		$("#all").hide();
		$("#container").hide();
		$("#login").hide();
		$("#product").hide();
		$("#connection").hide();
	},
	displayProduct: function() {
		$("header").show();
		$("#chief").show();
		$("footer").show();
		$("#product").show();
		$("#all").hide();
		$("#container").hide();
		$("#login").hide();
		$("#register").hide();
		$("#connection").hide();
	},
	displayAll: function() {
		$("header").show();
		$("#chief").show();
		$("footer").show();
		$("#all").show();
		$("#product").hide();
		$("#container").hide();
		$("#login").hide();
		$("#register").hide();
		$("#connection").hide();
	},
	displayConnection: function() {
		$("#chief").show();
		$("#connection").show();
		$("footer").show();
		$("header").show();
		$("#container").hide();
		$("#login").hide();
		$("#register").hide();
		$("#product").hide();
	},
	displayTheperson: function() {
		App.displayAll();
		$("#thePerson").show();
		$("#producer").hide();
		$("#others").hide();
		$("#objectInfoDIV").hide();
		$("#getRole").hide();
		$("#realName").hide();
		$("#setProduct").hide();
		$("#buyProduct").hide();
		$("#personProductInfo").hide();
	},
	displayProducer: function() {
		App.displayAll();
		$("#producer").show();
		$("#thePerson").hide();
		$("#others").hide();
		$("#objectInfoDIV").hide();
		$("#getRole").hide();
		$("#realName").hide();
		$("#setProduct").hide();
		$("#buyProduct").hide();
		$("#personProductInfo").hide();
	},
	displayOthers: function() {
		App.displayAll();
		$("#others").show();
		$("#thePerson").hide();
		$("#producer").hide();
		$("#objectInfoDIV").hide();
		$("#getRole").hide();
		$("#realName").hide();
		$("#setProduct").hide();
		$("#buyProduct").hide();
		$("#personProductInfo").hide();
	},

	displayObject_Info: function() {
		App.displayAll();
		$("#objectInfo").html("");
		$("#objectInfoDIV").show();
		$("#getRole").hide();
		$("#realName").hide();
		$("#setProduct").hide();
		$("#buyProduct").hide();
		$("#personProductInfo").hide();
	},
	displayRealName: function() {
		App.displayAll();
		$("#realName").show();
		$("#getRole").hide();
		$("#objectInfoDIV").hide();
		$("#setProduct").hide();
		$("#buyProduct").hide();
		$("#personProductInfo").hide();
		var Address = $("#addressSelect");
		for(var i = 0; i < 92; i++) {
			if(vcity[i] != undefined) {
				var provinceName = vcity[i];
				Address.append(new Option(provinceName, provinceName));
			}
		}
	},
	displayGetRole: function() {
		App.displayAll();
		$("#getRole").show();
		$("#realName").hide();
		$("#objectInfoDIV").hide();
		$("#setProduct").hide();
		$("#buyProduct").hide();
		$("#personProductInfo").hide();
	},
	displayPersonProductInfo: function() {
		App.displayAll();
		$("#personProductInfo").html("");
		$("#personProductInfo").show();
		$("#realName").hide();
		$("#objectInfoDIV").hide();
		$("#setProduct").hide();
		$("#buyProduct").hide();
		$("#getRole").hide();
	},
	displaySetProductInfo: function() {
		App.displayAll();
		$("#setProduct").show();
		$("#realName").hide();
		$("#objectInfoDIV").hide();
		$("#personProductInfo").hide();
		$("#buyProduct").hide();
		$("#getRole").hide();
	},
	displayBuyProduct: function(e) {
		if($("#person").html() == "登录") {
			alert("请先登录！");
		} else {
			App.displayAll();
			$("#buyProduct").show();
			$("#others").hide();
			$("#thePerson").hide();
			$("#producer").hide();
			$("#realName").hide();
			$("#objectInfoDIV").hide();
			$("#personProductInfo").hide();
			$("#setProduct").hide();
			$("#getRole").hide();
			$("#modifyInfo").attr("onclick", "App.othersSetProductInfoBefore(" + e + ");");
		}
	},
	displayProduct_Info: function() {
		App.displayProduct();
		$("#productInfo").show();
		$("#productMoreInfo").hide();
	},
	displayProduct_MoreInfo: function() {
		App.displayProduct();
		$("#productMoreInfo").show();
		$("#productInfo").hide();
		$("#productMoreInfo").html("");
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
	checkClass: function(value) {
		switch(value) {
			case '0':
				{
					var classe = classes.JEWELLERY;
					break;
				}
			case '1':
				{
					var classe = classes.JADE;
					break;
				}
			case '2':
				{
					var classe = classes.CRAFT;
					break;
				}
			default:
				{
					var classe = classes.NONE;
					break;
				}
		}
		return classe;
	},
	checkGrade: function(value) {
		switch(value) {
			case '0':
				{
					var grade = grades.FIRST_GRADE;
					break;
				}
			case '1':
				{
					var grade = grades.SECOND_GRADE;
					break;
				}
			case '2':
				{
					var grade = grades.THIRD_GRADE;
					break;
				}
			default:
				{
					var grade = grades.NONE;
					break;
				}
		}
		return grade;
	},
	checkInfo: function(e, flag) {
		App.getMoreInfo('id' + $(e).parent().parent().parent().children().eq(1).children().eq(1).html(), flag);
	},
	setObjectInfoBefore: function() {
		var _email, _password, _name;
		if($("#emailInputRegister").val() == '') {
			$("#emailspinfo").text("*邮箱不能为空");
			$("#emailInputRegister").focus();
			_email = false;
		} else {
			if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($("#emailInputRegister").val()) == false) {
				$("#emailspinfo").text("*邮箱格式不正确，请重新填写");
				$("#emailInputRegister").focus();
				_email = false;
			} else {
				$("#emailspinfo").text("");
				_email = true;
			}
		}
		if($("#passwordInputRegister").val() == '') {
			$("#passwordspinfo").text("*密码不能为空");
			$("#passwordInputRegister").focus();
			_password = false;
		} else {
			if($("#passwordInputRegister").val().length < 8) {
				$("#passwordspinfo").text("*密码不能少于8个字符");
				$("#passwordInputRegister").focus();
				_password = false;
			} else {
				$("#passwordspinfo").text("");
				_password = true;
			}
		}
		if($("#nameInputRegister").val() == '') {
			$("#namespinfo").text("*姓名不能为空");
			$("#nameInputRegister").focus();
			_name = false;
		} else {
			if($("#nameInputRegister").val().length < 5) {
				$("#namespinfo").text("*姓名不能少于5个字符");
				$("#nameInputRegister").focus();
				_password = false;
			} else {
				$("#namespinfo").text("");
				_name = true;
			}
		}
		if(_email & _password & _name) {
			App.setObjectInfo();
		}
	},
	setObjectInfo: function() {
		var _emailjudge = true,
			_namejudge = true;
		var _email = $("#emailInputRegister").val();
		var _password = $("#passwordInputRegister").val();
		var _name = $("#nameInputRegister").val();
		var _role = $("#roleSelectRegister").val();
		console.log(deployedAscend);
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if(web3.toAscii(returnvalue[2][i]).replace(/\0/g, '') == _name) {
					_namejudge = false;
					break;
				}
				_namejudge = true;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if(web3.toAscii(returnvalue[3][i]).replace(/\0/g, '') == _email) {
					_emailjudge = false;
					break;
				}
				_emailjudge = true;
			}
			if(_emailjudge & _namejudge) {
				deployedAscend.SetObjectInfo(_name, _password, _email, _role, function(error) {
					if(error) {
						console.error(error);
						return;
					} else {
						App.displayLogin();
					}
					$("#emailspinfo").text("");
					$("#namespinfo").text("");
					var LoginSetInfo = deployedAscend.LoginSetInfo();
					LoginSetInfo.watch(function(error, result) {
						if(!result) {
							console.log(error);
						} else {
							console.log(result);
						}
					});
				});
			} else if(!(_emailjudge | _namejudge)) {
				$("#emailspinfo").text("*该邮箱已注册，请填写其他邮箱");
				$("#namespinfo").text("*该名称已被使用，请使用其他姓名或在该姓名之后添加其他字符以区分");
				$("#emailInputRegister").focus();
			} else if(_emailjudge) {
				$("#namespinfo").text("*该名称已被使用，请使用其他姓名或在该姓名之后添加其他字符以区分");
				$("#nameInputRegister").focus();
			} else {
				$("#emailspinfo").text("*该邮箱已注册，请填写其他邮箱");
				$("#emailInputRegister").focus();
			}
		});
	},
	isRealNameNull: function() {
		var _count;
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
					_count = i;
					break;
				}
			}

		});
	},
	judgeRealNameNull: function() {
		var _count;
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
					_count = i;
					break;
				}
			}
			deployedAscend.GetRealName.call(_count, function(error, returnvalue) {
				if(error) {
					console.error(error);
					return;
				}
				var index = returnvalue[0] - 1;
				if(index < 0) {
					App.displayRealName();
					$(realName).children().eq(0).show();
					$(realName).children().eq(1).hide();
				} else {
					App.displayRealIDinfo();
				}
			});
		});
	},
	realNameAuthenticateBefore: function() {
		if(checkCard()) {
			var _count;
			deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
				if(error) {
					console.error(error);
					return;
				}
				var index = returnvalue - 1;
				if(index < 0) {
					return;
				}
				for(var i = 0; i < returnvalue[0].length; i++) {
					if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
						_count = returnvalue[0][i];
						break;
					}
				}
				App.realNameAuthenticate(_count);
				switch(returnvalue[3].toString()) {
					case '0':
						$("#person").attr("onclick", "App.displayProducer();");
						App.displayProducer();
						App.getObjectInfo();
						break;
					case '1':
						$("#person").attr("onclick", "App.displayOthers();");
						App.displayOthers();
						App.getObjectInfo();
						break;
					case '2':
						$("#person").attr("onclick", "App.displayOthers();");
						App.displayOthers();
						App.getObjectInfo();
						break;
					case '3':
						$("#person").attr("onclick", "App.displayTheperson();");
						App.displayTheperson();
						App.getObjectInfo();
						break;
					default:
						break;
				}
			});
		}
	},
	realNameAuthenticate: function(_count) {
		var _IDnumber = 'id' + $("#realIDInput").val();
		var _realName = $("#realNameInput").val();
		var _gender = $("#genderSelect").val();
		var _addressSelect = $("#addressSelect").val();
		deployedAscend.RealNameAuthenticate(_count, _IDnumber, _realName, _gender, _addressSelect, function(error, result) {
			if(error) {
				console.error(error);
				return;
			}
			var realNameInfo = deployedAscend.RealAuthenticate();
			realNameInfo.watch(function(error, result) {
				if(!result) {
					console.log(error);
				} else {
					console.log(result);
				}
			});
			if(result) {
				App.displayRealIDinfo();
			}
		});
	},
	displayRealIDinfo: function() {
		App.displayRealName();
		$(realName).children().eq(0).hide();
		$(realName).children().eq(1).show();
		var _count;
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
					_count = i;
					break;
				}
			}
			deployedAscend.GetRealName.call(_count, function(error, returnvalue) {
				if(error) {
					console.error(error);
					return;
				}
				var index = returnvalue - 1;
				if(index < 0) {
					return;
				}
				$("#realIDInfo").text(web3.toAscii(returnvalue[0]).toString().replace(/\0/g, '').replace('id', ''));
				$("#realNameInfo").text(returnvalue[1]);
				$("#genderInfo").text(returnvalue[2]);
				$("#addressInfo").text(returnvalue[3]);
			});
		});
	},
	loginBefore: function() {
		var _email, _password;
		if($("#emailInputLogin").val() == '') {
			$("#emailspinfoLogin").text("*邮箱不正确，请重新填写");
			$("#emailInputLogin").focus();
			_email = false;
		} else {
			if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($("#emailInputLogin").val()) == false) {
				$("#emailspinfoLogin").text("*邮箱格式不正确，请重新填写");
				$("#emailInputLogin").focus();
				_email = false;
			} else {
				$("#emailspinfoLogin").text("");
				_email = true;
			}
		}
		if($("#passwordInputLogin").val() == '') {
			$("#passwordspinfoLogin").text("*密码不正确，请重新填写");
			$("#passwordInputLogin").focus();
			_password = false;
		} else {
			if($("#passwordInputLogin").val().length < 8) {
				$("#passwordspinfoLogin").text("*密码不正确");
				$("#passwordInputLogin").focus();
				_password = false;
			} else {
				$("#passwordspinfoLogin").text("");
				_password = true;
			}
		}
		if(_email & _password) {
			App.login();
		}
	},
	login: function() {
		var _email = $("#emailInputLogin").val();
		var _password = $("#passwordInputLogin").val();
		deployedAscend.login(_email, _password, function(error, returnvalue) {
			if(error) {
				console.error(error);
				alert("你的账户不存在或者密码不正确！");
				return;
			}
			var _count = returnvalue[1];
			App.setPerson(_count);
			$(":input").val("");
			switch(returnvalue[0].toString()) {
				case '0':
					$("#person").attr("onclick", "App.displayProducer();");
					App.displayProducer();
					App.getObjectInfo();
					break;
				case '1':
					$("#person").attr("onclick", "App.displayOthers();");
					App.displayOthers();
					App.getObjectInfo();
					break;
				case '2':
					$("#person").attr("onclick", "App.displayOthers();");
					App.displayOthers();
					App.getObjectInfo();
					break;
				case '3':
					$("#person").attr("onclick", "App.displayTheperson();");
					App.displayTheperson();
					App.getObjectInfo();
					break;
				default:
					break;
			}
		});
	},
	setPerson: function(_count) {
		deployedAscend.GetObjectInfo.call(_count, function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			$("#person").html(web3.toAscii(returnvalue[0]).replace(/\0/g, ''));
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
			$("#person").html(web3.toAscii(returnvalue[2][0]).replace(/\0/g, ''));
		});
	},
	dropout: function() {
		App.displayLogin();
		$("#person").attr("onclick", "App.displayLogin();");
		$("#person").html("登录");
	},
	getObjectInfo: function() {
		var _count = -1;
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			} else {
				App.displayObject_Info();
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
					_count = i;
					break;
				}
			}
			deployedAscend.GetObjectInfo(_count, function(error, returnvalue) {
				if(error) {
					console.error(error);
					return;
				}
				var index = returnvalue - 1;
				if(index < 0) {
					return;
				}
				var table = $("<table class='center-block' style='white-space:nowrap;padding:1%;overflow:auto;border:0.5rem solid #00FF00;color:#00FF00;;margin:1%;border-radius:10px' float='left'></table>");
				var tr = new Array();
				var td = new Array();
				for(var i = 0; i < 4; i++) {
					tr[i] = $("<tr></tr>");
				}
				for(var i = 0; i < 4; i++) {
					td[i] = $("<td></td>");
				}
				var _email = web3.toAscii(returnvalue[1]).replace(/\0/g, '');
				var _name = web3.toAscii(returnvalue[0]).replace(/\0/g, '');
				var _role = returnvalue[3].toString();
				var _address = returnvalue[2];
				var selector = $("<select id='roleSelect' onchange='App.setRole()'><option value='0'>Producer</option><option value='1'>Tradesman</option><option value='2'>Consumer</option></select>");
				selector.find("option[value=" + _role + "]").attr("selected", true);
				td[0].append(_name);
				td[1].append(_email);
				td[2].append(selector);
				td[3].append(_address);
				tr[0].append($("<th>姓名：</th>"));
				tr[1].append($("<th>邮箱：</th>"));
				tr[2].append($("<th>身份：</th>"));
				tr[3].append($("<th>地址：</th>"));
				for(var i = 0; i < 4; i++) {
					tr[i].append(td[i]);
				}
				for(var i = 0; i < 4; i++) {
					table.append(tr[i]);
				}
				var div = $("<div class='col-md-6'></div>");
				div.append(table);
				$("#objectInfo").append(div);
			});
		});
	},
	getAllObjectInfo: function() {
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			} else {
				App.displayObject_Info();
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				var table = $("<table class='center-block' style='white-space:nowrap;padding:1%;overflow:auto;border:0.5rem solid #00FF00;color:#00FF00;;margin:1%;border-radius:10px' float='left'></table>");
				var tr = new Array();
				var td = new Array();
				for(var j = 0; j < 5; j++) {
					tr[j] = $("<tr></tr>");
				}
				for(var j = 0; j < 5; j++) {
					td[j] = $("<td></td>");
				}
				console.log(returnvalue[3][i].toString());
				var _id = returnvalue[0][i].toString();
				var _name = web3.toAscii(returnvalue[2][i]).replace(/\0/g, '');
				var _email = web3.toAscii(returnvalue[3][i]).replace(/\0/g, '');
				var _role = App.checkRole(returnvalue[4][i].toString());
				var _address = returnvalue[1][i];
				td[0].append(_id);
				td[1].append(_name);
				td[2].append(_email);
				td[3].append(_role);
				td[4].append(_address);
				tr[0].append($("<th>序号：</th>"));
				tr[1].append($("<th>姓名：</th>"));
				tr[2].append($("<th>邮箱：</th>"));
				tr[3].append($("<th>身份：</th>"));
				tr[4].append($("<th>地址：</th>"));
				for(var j = 0; j < 5; j++) {
					tr[j].append(td[j]);
				}
				for(var j = 0; j < 5; j++) {
					table.append(tr[j]);
				}
				var div = $("<div class='col-md-6'></div>");
				div.append(table);
				$("#objectInfo").append(div);
			}
		});
	},
	setRole: function() {
		var _role = $("#roleSelect").val();
		var _count = -1;
		switch(_role) {
			case '0':
				$("#person").attr("onclick", "App.displayProducer();");
				App.displayProducer();
				break;
			case '1':
				$("#person").attr("onclick", "App.displayOthers();");
				App.displayOthers();
				break;
			case '2':
				$("#person").attr("onclick", "App.displayOthers();");
				App.displayOthers();
				break;
			case '3':
				$("#person").attr("onclick", "App.displayTheperson();");
				App.displayTheperson();
				break;
			default:
				break;
		}
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
					_count = i;
					break;
				}
			}
			deployedAscend.SetRole(_count, _role, function(error) {
				if(error) {
					console.error(error);
					return;
				}
				var LoginSetRole = deployedAscend.LoginSetRole();
				LoginSetRole.watch(function(error, result) {
					if(!result) {
						console.log(error);
					} else {
						console.log(result);
					}
				});
				App.getObjectInfo();
			});
		});
	},
	addInput: function(e) {
		$(e).parent().parent().parent().append("<div class='row'><div class='col-md-8'><input class='form-control' type='text'></input></div><div class='col-md-2'><a class='btn btn-info' href='#' onclick='App.addInput(this)'>添加</a></div><div class='col-md-2'><a class='btn btn-info' href='#' onclick='App.deleteInput(this)'>删除</a></div></div>");
	},
	deleteInput: function(e) {
		$(e).parent().parent().remove();
	},
	producerSetProductInfoBefore: function() {
		var _productId, _productName, _password, _status, _productWeight, _certificateName, _certificateWeight, _certificateSource, _appraiserDiv, _identifyInfoDiv;
		if($("#productIdInputSetProduct").val() == '') {
			$("#productIdspinfo").text("*产品ID不能为空");
			$("#productIdInputSetProduct").focus();
			_productId = false;
		} else {
			$("#productIdspinfo").text("");
			_productId = true;
		}
		if($("#productNameInputSetProduct").val() == '') {
			$("#productNamespinfo").text("*产品名称不能为空");
			$("#productNameInputSetProduct").focus();
			_productName = false;
		} else {
			$("#productNamespinfo").text("");
			_productName = true;
		}
		if($("#passwordInputSetProduct").val() == '') {
			$("#passwordInputspinfo").text("*产品修改信息密码不能为空");
			$("#passwordInputSetProduct").focus();
			_password = false;
		} else {
			$("#passwordInputspinfo").text("");
			_password = true;
		}
		if($("#statusInputSetProduct").val() == '') {
			$("#statusspinfo").text("*产品状况不能为空");
			$("#statusInputSetProduct").focus();
			_status = false;
		} else {
			$("#statusspinfo").text("");
			_status = true;
		}
		if($("#productWeightSetProduct").val() == '') {
			$("#productWeightspinfo").text("*产品重量不能为空");
			$("#productWeightSetProduct").focus();
			_productWeight = false;
		} else {
			$("#productWeightspinfo").text("");
			_productWeight = true;
		}
		if($("#certificateNameSetProduct").val() == '') {
			$("#certificateNamespinfo").text("*鉴定证书名称不能为空");
			$("#certificateNameSetProduct").focus();
			_certificateName = false;
		} else {
			$("#certificateNamespinfo").text("");
			_certificateName = true;
		}
		if($("#certificateWeightSetProduct").val() == '') {
			$("#certificateWeightspinfo").text("*鉴定证书重量不能为空");
			$("#certificateWeightSetProduct").focus();
			_certificateWeight = false;
		} else {
			$("#certificateWeightspinfo").text("");
			_certificateWeight = true;
		}
		if($("#certificateSourceSetProduct").val() == '') {
			$("#certificateSourcespinfo").text("*鉴定证书颁布机构不能为空");
			$("#certificateSourceSetProduct").focus();
			_certificateSource = false;
		} else {
			$("#certificateSourcespinfo").text("");
			_certificateSource = true;
		}
		if($("#appraiserDivSetProduct input:eq(0)").val() == '') {
			$("#appraiserDivspinfo").text("*鉴定人不能为空且鉴定人不少于两人");
			$("#appraiserDivSetProduct input:eq(0)").focus();
			_appraiserDiv = false;
		} else if($("#appraiserDivSetProduct input:eq(1)").val() == '') {
			$("#appraiserDivspinfo").text("*鉴定人不能为空且鉴定人不少于两人");
			$("#appraiserDivSetProduct input:eq(1)").focus();
			_appraiserDiv = false;
		} else {
			$("#appraiserDivspinfo").text("");
			_appraiserDiv = true;
		}
		if($("#identifyInfoDivSetProduct input:eq(0)").val() == '') {
			$("#identifyInfoDivspinfo").text("*鉴定信息不能为空");
			$("#identifyInfoDivSetProduct").focus();
			_identifyInfoDiv = false;
		} else {
			$("#identifyInfoDivspinfo").text("");
			_identifyInfoDiv = true;
		}
		var flat = App.isRealNameNull();
		if(_productId & _productName & _password & _status & _productWeight & _certificateName & _certificateWeight & _certificateSource & _appraiserDiv & _identifyInfoDiv) {
			App.producerSetProductInfo();
		}
	},
	producerSetProductInfo: function() {
		var _product_id = $("#productIdInputSetProduct").val();
		var _product_name = $("#productNameInputSetProduct").val();
		var _product_password = 'password' + $("#passwordInputSetProduct").val();
		var _product_class = $("#classSelectSetProduct").val();
		var _product_status = $("#statusInputSetProduct").val();
		var _product_grade = $("#gradeSelectSetProduct").val();
		var _product_weight = 'weight' + $("#productWeightSetProduct").val();
		var _product_certificate_name = $("#certificateNameSetProduct").val();
		var _product_certificate_weight = 'weight' + $("#certificateWeightSetProduct").val();
		var _product_certificate_source = $("#certificateSourceSetProduct").val();
		var nowdate = new Date();
		var _product_appraiser = new Array();
		var _product_identify_info = new Array();
		var _product_time = nowdate.getFullYear() + "-" + (nowdate.getMonth() + 1) + "-" + nowdate.getDate() +
			" " + nowdate.getHours() + ":" + nowdate.getMinutes() + ":" + nowdate.getSeconds();
		_product_id = 'id' + _product_id;
		for(var i = 0; i < $("#appraiserDivSetProduct").children().length - 1; i++) {
			_product_appraiser[i] = $("#appraiserDivSetProduct input:eq(" + i + ")").val();
		}
		for(var i = 0; i < $("#identifyInfoDivSetProduct").children().length - 1; i++) {
			_product_identify_info[i] = $("#identifyInfoDivSetProduct input:eq(" + i + ")").val();
		}
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
					_count = i;
					break;
				}
			}
			deployedAscend.GetRealName.call(_count, function(error, returnvalue) {
				if(error) {
					console.error(error);
					return;
				}
				var index = returnvalue[0] - 1;
				if(index < 0) {
					alert("你还没实名认证，无法录入产品信息！请先进行实名认证！");
				} else {
					deployedAscend.ProducerSetProductInfo(_count, _product_id, _product_name, _product_password,
						_product_class, _product_status, _product_grade, _product_time,function(error, result) {
							if(error) {
								console.error(error);
								return;
							}
							var SetProductInfoByProducer = deployedAscend.SetProductInfoByProducer();
							SetProductInfoByProducer.watch(function(error, result) {
								if(!result) {
									console.log(error);
								} else {
									console.log(result);
								}
							});
							deployedAscend.ProducerSetProductInfoSecond(_product_weight, _product_certificate_name,
								_product_certificate_weight, _product_certificate_source, _product_appraiser, 
								_product_identify_info,function(error, result) {
									if(error) {
										console.error(error);
										return;
									} else {
										App.displayProducer();
										App.getObjectInfo();
									}
									var SetProductInfoByProducer = deployedAscend.SetProductInfoByProducerSecond();
									SetProductInfoByProducer.watch(function(error, result) {
										if(!result) {
											console.log(result);
										} else {
											console.log(error);
										}
									});
								});
						});
				}
			});
		});
	},
	displayAllProduct: function() {
		var _id = new Array();
		deployedAscend.DisplayProduct.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			} else {
				App.displayProduct_Info();
				$("#productInfo").html("");
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				var table = $("<table class='center-block' style='white-space:nowrap;padding:1%;overflow:auto;border:0.5rem solid #00FF00;color:#00FF00;;margin:1%;border-radius:10px' float='left'></table>");
				var tr = new Array();
				var td = new Array();
				for(var j = 0; j < 7; j++) {
					tr[j] = $("<tr></tr>");
				}
				for(var k = 0; k < 6; k++) {
					td[k] = $("<td></td>");
				}
				var _product_count = returnvalue[0][i].toString();
				var _product_id = web3.toAscii(returnvalue[1][i]).replace(/\0/g, '');
				_product_id = _product_id.replace('id', '');
				var _product_name = web3.toAscii(returnvalue[2][i]).replace(/\0/g, '');
				var _producer_time = web3.toAscii(returnvalue[4][i]).replace(/\0/g, '');
				var _producer_name = web3.toAscii(returnvalue[5][i]).replace(/\0/g, '');
				var _producer_address = returnvalue[6][i];
				td[0].append(_product_count);
				td[1].append(_product_id);
				td[2].append(_product_name);
				td[3].append(_producer_time);
				td[4].append(_producer_name);
				td[5].append(_producer_address);
				tr[0].append($("<th>产品序号：</th>"));
				tr[1].append($("<th>产品ID：</th>"));
				tr[2].append($("<th>产品名称：</th>"));
				tr[3].append($("<th>产品录入时间：</th>"));
				tr[4].append($("<th>生产者姓名：</th>"));
				tr[5].append($("<th>生产者地址：</th>"));
				tr[6].append($("<th><a class='btn btn-primary' onclick='App.checkInfo(this,false)' href='#'>查询详情</a></th>"));
				for(var j = 0; j < 6; j++) {
					tr[j].append(td[j]);
				}
				for(var k = 0; k < 7; k++) {
					table.append(tr[k]);
				}
				var div = $("<div class='col-md-6'></div>");
				div.append(table);
				$("#productInfo").append(div);
			}
		});
	},
	othersSetProductInfoBefore: function(e) {
		var _password, _newpassword;
		if($("#passwordInputSetInfoByOthers").val() == '') {
			$("#passwordOthersspinfo").text("*鉴定信息不能为空");
			$("#passwordInputSetInfoByOthers").focus();
			_password = false;
		} else {
			$("#passwordOthersspinfo").text("");
			_password = true;
		}
		if($("#newPasswordInputSetInfoByOthers").val() == '') {
			$("#newPasswordOthersspinfo").text("*鉴定信息不能为空");
			$("#newPasswordInputSetInfoByOthers").focus();
			_newpassword = false;
		} else {
			$("#newPasswordOthersspinfo").text("");
			_newpassword = true;
		}
		if(_password & _newpassword) {
			App.othersSetProductInfo(e);
		}
	},
	othersSetProductInfo: function(e) {
		var _product_count = e;
		var _product_password = 'password' + $("#passwordInputSetInfoByOthers").val();
		var _product_newpassword = 'password' + $("#newPasswordInputSetInfoByOthers").val();
		var nowdate = new Date();
		var _product_time = nowdate.getFullYear() + "-" + (nowdate.getMonth() + 1) + "-" + nowdate.getDate() +
			" " + nowdate.getHours() + ":" + nowdate.getMinutes() + ":" + nowdate.getSeconds();
		var _count;
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
					_count = i;
					break;
				}
			}
			deployedAscend.GetRealName.call(_count, function(error, returnvalue) {
				if(error) {
					console.error(error);
					return;
				}
				var index = returnvalue[0] - 1;
				if(index < 0) {
					alert("你还没实名认证，无法进行产品信息修改！请先进行实名认证！");
				} else {
					deployedAscend.GetObjectInfo.call(_count, function(error, result) {
						switch(result[3].toString()) {
							case '0':
								$("#person").attr("onclick", "App.displayProducer();");
								App.displayProducer();
								App.getObjectInfo();
								break;
							case '1':
								$("#person").attr("onclick", "App.displayOthers();");
								App.displayOthers();
								App.getObjectInfo();
								break;
							case '2':
								$("#person").attr("onclick", "App.displayOthers();");
								App.displayOthers();
								App.getObjectInfo();
								break;
							case '3':
								$("#person").attr("onclick", "App.displayTheperson();");
								App.displayTheperson();
								App.getObjectInfo();
								break;
							default:
								break;
						}
						deployedAscend.JudgeProduct.call(_count, _product_count, function(error, result) {
							if(error) {
								console.error(error);
								return;
							}
							var index = returnvalue - 1;
							if(index < 0) {
								return;
							}
							if(result == false) {
								console.log(_product_time);
								deployedAscend.OthersSetProductInfo(_count, _product_count, _product_time, _product_password, _product_newpassword, function(error, result) {
									if(error) {
										console.error(error);
										alert("你输入的密码不正确！");
										return;
									}
									var SetProductInfoByOthers = deployedAscend.SetProductInfoByOthers();
									SetProductInfoByOthers.watch(function(error, result) {
										if(!result) {
											console.log(result);
										} else {
											console.log(error);
										}
									});
								});
							} else {
								alert("您已拥有此产品！");
							}
						});
					});
				}
			});

		});
	},
	getOwnProduct: function() {
		App.displayPersonProductInfo();
		var _email;
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
					_email = returnvalue[3][i];
					break;
				}
			}
			deployedAscend.GetProductCount.call(function(error, returnvalue) {
				if(error) {
					console.error(error);
					return;
				}
				var index = returnvalue - 1;
				if(index < 0) {
					return;
				}
				for(var i = 0; i < returnvalue.toString(); i++) {
					App.getOwnProductLast(i, _email);
				}
				alert("搜索完毕");
			});
		});
	},
	getOwnProductLast: function(i, _email) {
		deployedAscend.GetOwnProduct.call(i, _email, function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			if(returnvalue == true) {
				deployedAscend.DisplayOwnProduct.call(i, function(error, returnvalue) {
					if(error) {
						console.error(error);
						return;
					}
					var index = returnvalue - 1;
					if(index < 0) {
						return;
					}
					var table = $("<table class='center-block' style='white-space:nowrap;padding:1%;overflow:auto;border:0.5rem solid #00FF00;color:#00FF00;;margin:1%;border-radius:10px' float='left'></table>");
					var tr = new Array();
					var td = new Array();
					for(var i = 0; i < 6; i++) {
						tr[i] = $("<tr></tr>");
					}
					for(var i = 0; i < 5; i++) {
						td[i] = $("<td></td>");
					}
					var _product_count = returnvalue[0].toString();
					var _product_id = web3.toAscii(returnvalue[1]).replace(/\0/g, '');
					_product_id = _product_id.replace('id', '');
					var _product_name = web3.toAscii(returnvalue[2]).replace(/\0/g, '');
					var _product_class = App.checkClass(returnvalue[3].toString());
					var _producer_name = web3.toAscii(returnvalue[4]).replace(/\0/g, '');
					td[0].append(_product_count);
					td[1].append(_product_id);
					td[2].append(_product_name);
					td[3].append(_product_class);
					td[4].append(_producer_name);
					tr[0].append($("<th>产品序号：</th>"));
					tr[1].append($("<th>产品ID：</th>"));
					tr[2].append($("<th>产品名称：</th>"));
					tr[3].append($("<th>产品类别：</th>"));
					tr[4].append($("<th>生产者姓名：</th>"));
					tr[5].append($("<th><a class='btn btn-primary' onclick='App.checkInfo(this,false)' href='#'>查询详情</a></th>"));
					for(var i = 0; i < 5; i++) {
						tr[i].append(td[i]);
					}
					for(var i = 0; i < 6; i++) {
						table.append(tr[i]);
					}
					var div = $("<div class='col-md-4'></div>");
					div.append(table);
					$("#personProductInfo").append(div);
				});
			}
		});
	},
	getOwnProductHaving: function() {
		App.displayPersonProductInfo();
		var _email;
		deployedAscend.GetAllObjectInfo.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue[0].length; i++) {
				if($("#person").html() == web3.toAscii(returnvalue[2][i]).replace(/\0/g, '')) {
					_email = returnvalue[3][i];
					break;
				}
			}
			deployedAscend.GetProductCount.call(function(error, returnvalue) {
				if(error) {
					console.error(error);
					return;
				}
				var index = returnvalue - 1;
				if(index < 0) {
					return;
				}
				for(var i = 0; i < returnvalue; i++) {
					App.getOwnProductHavingLast(i, _email);
				}
				alert("搜索完毕");
			});
		});
	},
	getOwnProductHavingLast: function(i, _email) {
		deployedAscend.GetOwnProductHaving.call(i, _email, function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			if(returnvalue == true) {
				deployedAscend.DisplayOwnProduct.call(i, function(error, returnvalue) {
					if(error) {
						console.error(error);
						return;
					}
					var index = returnvalue - 1;
					if(index < 0) {
						return;
					}
					var table = $("<table class='center-block' style='white-space:nowrap;padding:1%;overflow:auto;border:0.5rem solid #00FF00;color:#00FF00;;margin:1%;border-radius:10px' float='left'></table>");
					var tr = new Array();
					var td = new Array();
					for(var i = 0; i < 6; i++) {
						tr[i] = $("<tr></tr>");
					}
					for(var i = 0; i < 5; i++) {
						td[i] = $("<td></td>");
					}
					var _product_count = returnvalue[0].toString();
					var _product_id = web3.toAscii(returnvalue[1]).replace(/\0/g, '');
					_product_id = _product_id.replace('id', '');
					var _product_name = web3.toAscii(returnvalue[2]).replace(/\0/g, '');
					var _product_class = App.checkClass(returnvalue[3].toString());
					var _producer_name = web3.toAscii(returnvalue[4]).replace(/\0/g, '');
					td[0].append(_product_count);
					td[1].append(_product_id);
					td[2].append(_product_name);
					td[3].append(_product_class);
					td[4].append(_producer_name);
					tr[0].append($("<th>产品序号：</th>"));
					tr[1].append($("<th>产品ID：</th>"));
					tr[2].append($("<th>产品名称：</th>"));
					tr[3].append($("<th>产品类别：</th>"));
					tr[4].append($("<th>生产者姓名：</th>"));
					tr[5].append($("<th><a class='btn btn-primary' onclick='App.checkInfo(this,true)' href='#'>查询详情</a></th>"));
					for(var i = 0; i < 5; i++) {
						tr[i].append(td[i]);
					}
					for(var i = 0; i < 6; i++) {
						table.append(tr[i]);
					}
					var div = $("<div class='col-md-4'></div>");
					div.append(table);
					$("#personProductInfo").append(div);
				});
			}
		});
	},
	chooseID: function() {
		$("#ascendProduct").attr("onclick", "App.findById();");
		$("#searchProduct").attr("placeholder", "请输入追溯码");
	},
	chooseNAME: function() {
		$("#ascendProduct").attr("onclick", "App.findName();");
		$("#searchProduct").attr("placeholder", "请输入产品名称");
	},
	chooseCLASS: function() {
		$("#ascendProduct").attr("onclick", "App.findClass();");
		$("#searchProduct").attr("placeholder", "请输入产品所属分类");
	},
	findById: function() {
		var _product_id = 'id' + $("#searchProduct").val();
		deployedAscend.FindById.call(_product_id, function(error, returnvalue) {
			if(error) {
				console.error(error);
				alert("不存在该产品");
				return;
			} else {
				App.displayProduct_Info();
				$("#productInfo").html("");
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			var table = $("<table class='center-block' style='white-space:nowrap;padding:1%;overflow:auto;border:0.5rem solid #00FF00;color:#00FF00;;margin:1%;border-radius:10px' float='left'></table>");
			var tr = new Array();
			var td = new Array();
			for(var i = 0; i < 6; i++) {
				tr[i] = $("<tr></tr>");
			}
			for(var i = 0; i < 5; i++) {
				td[i] = $("<td></td>");
			}
			var _product_count = returnvalue[0].toString();
			var _product_id = web3.toAscii(returnvalue[1]).replace(/\0/g, '');
			_product_id = _product_id.replace('id', '');
			var _product_name = web3.toAscii(returnvalue[2]).replace(/\0/g, '');
			var _product_class = App.checkClass(returnvalue[3].toString());
			var _producer_name = web3.toAscii(returnvalue[4]).replace(/\0/g, '');
			td[0].append(_product_count);
			td[1].append(_product_id);
			td[2].append(_product_name);
			td[3].append(_product_class);
			td[4].append(_producer_name);
			tr[0].append($("<th>产品序号：</th>"));
			tr[1].append($("<th>产品ID：</th>"));
			tr[2].append($("<th>产品名称：</th>"));
			tr[3].append($("<th>产品类别：</th>"));
			tr[4].append($("<th>生产者姓名：</th>"));
			tr[5].append($("<th><a class='btn btn-primary' onclick='App.checkInfo(this)' href='#'>查询详情</a></th>"));
			for(var i = 0; i < 5; i++) {
				tr[i].append(td[i]);
			}
			for(var i = 0; i < 6; i++) {
				table.append(tr[i]);
			}
			var div = $("<div></div>");
			div.append(table);
			$("#productInfo").append(div);
		});
	},
	findName: function() {
		var _product_name = $("#searchProduct").val();
		deployedAscend.GetProductCount.call(function(error, returnvalue) {
			if(error) {
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
			if(error) {
				alert("不存在该产品");
				console.error(error);
				return;
			} else {
				App.displayProduct_Info();
				$("#productInfo").html("");
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			var table = $("<table class='center-block' style='white-space:nowrap;padding:1%;overflow:auto;border:0.5rem solid #00FF00;color:#00FF00;;margin:1%;border-radius:10px' float='left'></table>");
			var tr = new Array();
			var td = new Array();
			for(var i = 0; i < 6; i++) {
				tr[i] = $("<tr></tr>");
			}
			for(var i = 0; i < 5; i++) {
				td[i] = $("<td></td>");
			}
			var _product_count = returnvalue[0].toString();
			var _product_id = web3.toAscii(returnvalue[1]).replace(/\0/g, '');
			_product_id = _product_id.replace('id', '');
			var _product_name = web3.toAscii(returnvalue[2]).replace(/\0/g, '');
			var _product_class = App.checkClass(returnvalue[3].toString());
			var _producer_name = web3.toAscii(returnvalue[4]).replace(/\0/g, '');
			td[0].append(_product_count);
			td[1].append(_product_id);
			td[2].append(_product_name);
			td[3].append(_product_class);
			td[4].append(_producer_name);
			tr[0].append($("<th>产品序号：</th>"));
			tr[1].append($("<th>产品ID：</th>"));
			tr[2].append($("<th>产品名称：</th>"));
			tr[3].append($("<th>产品类别：</th>"));
			tr[4].append($("<th>生产者姓名：</th>"));
			tr[5].append($("<th><a class='btn btn-primary' onclick='App.checkInfo(this)' href='#'>查询详情</a></th>"));
			for(var i = 0; i < 5; i++) {
				tr[i].append(td[i]);
			}
			for(var i = 0; i < 6; i++) {
				table.append(tr[i]);
			}
			var div = $("<div></div>");
			div.append(table);
			$("#productInfo").append(div);
		});
	},
	findClass: function() {
		var _product_class = $("#searchProduct").val();
		deployedAscend.GetProductCount.call(function(error, returnvalue) {
			if(error) {
				console.error(error);
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < returnvalue; i++) {
				App.findByClass(i, _product_class);
			}
		});
	},
	findByClass: function(_count, _product_class) {
		deployedAscend.FindByClass.call(_count, _product_class, function(error, returnvalue) {
			if(error) {
				alert("不存在该产品");
				console.error(error);
				return;
			} else {
				App.displayProduct_Info();
				$("#productInfo").html("");
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			var table = $("<table class='center-block' style='white-space:nowrap;padding:1%;overflow:auto;border:0.5rem solid #00FF00;color:#00FF00;;margin:1%;border-radius:10px' float='left'></table>");
			var tr = new Array();
			var td = new Array();
			for(var i = 0; i < 6; i++) {
				tr[i] = $("<tr></tr>");
			}
			for(var i = 0; i < 5; i++) {
				td[i] = $("<td></td>");
			}
			var _product_count = returnvalue[0].toString();
			var _product_id = web3.toAscii(returnvalue[1]).replace(/\0/g, '');
			_product_id = _product_id.replace('id', '');
			var _product_name = web3.toAscii(returnvalue[2]).replace(/\0/g, '');
			var _product_class = App.checkClass(returnvalue[3].toString());
			var _producer_name = web3.toAscii(returnvalue[4]).replace(/\0/g, '');
			td[0].append(_product_count);
			td[1].append(_product_id);
			td[2].append(_product_name);
			td[3].append(_product_class);
			td[4].append(_producer_name);
			tr[0].append($("<th>产品序号：</th>"));
			tr[1].append($("<th>产品ID：</th>"));
			tr[2].append($("<th>产品名称：</th>"));
			tr[3].append($("<th>产品类别：</th>"));
			tr[4].append($("<th>生产者姓名：</th>"));
			tr[5].append($("<th><a class='btn btn-primary' onclick='App.checkInfo(this)' href='#'>查询详情</a></th>"));
			for(var i = 0; i < 5; i++) {
				tr[i].append(td[i]);
			}
			for(var i = 0; i < 6; i++) {
				table.append(tr[i]);
			}
			var div = $("<div></div>");
			div.append(table);
			$("#productInfo").append(div);
		});
	},
	getMoreInfo: function(_product_id, flag) {
		var ProductInfo = new Array();
		deployedAscend.GetMoreInfo.call(_product_id, function(error, returnvalue) {
			if(error) {
				console.error(error);
				alert("不存在该产品");
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			ProductInfo = returnvalue;
		});
		deployedAscend.GetMoreInfoSecond.call(_product_id, function(error, returnvalue) {
			if(error) {
				console.error(error);
				alert("不存在该产品");
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			for(var i = 0; i < 9; i++) {
				ProductInfo[13 + i] = returnvalue[i];
			}
		});
		deployedAscend.GetMoreInfoThird.call(_product_id, function(error, returnvalue) {
			if(error) {
				console.error(error);
				alert("不存在该产品");
				return;
			}
			var index = returnvalue - 1;
			if(index < 0) {
				return;
			}
			ProductInfo[22] = returnvalue;
			App.displayMoreInfo(ProductInfo, flag);
		});
	},
	displayMoreInfo: function(_ProductInfo, flag = false) {
		App.displayProduct_MoreInfo();
		var table1 = $("<table width='100%'><tr></tr></table>");
		var table2 = $("<table width='100%'><tr></tr></table>");
		var table3 = $("<table width='100%'><tr></tr></table>");
		var table4 = $("<table width='100%'><tr></tr></table>");
		var table5 = $("<table width='100%'><tr></tr></table>");
		var table6 = $("<table width='100%'><tr></tr></table>");
		var _product_count = _ProductInfo[0].toString();
		var _product_id = web3.toAscii(_ProductInfo[1]).replace(/\0/g, '');
		_product_id = _product_id.replace('id', '');
		var _product_name = web3.toAscii(_ProductInfo[2]).replace(/\0/g, '');
		var _product_class = App.checkClass(_ProductInfo[3].toString());
		var _producer_name = web3.toAscii(_ProductInfo[4]).replace(/\0/g, '');
		var _producer_address = _ProductInfo[5].toString();
		var _product_status = web3.toAscii(_ProductInfo[7]).replace(/\0/g, '');
		console.log(_ProductInfo[3].toString());
		console.log(_ProductInfo[8].toString());
		var _producer_grade = App.checkGrade(_ProductInfo[8].toString());
		var _product_weight = web3.toAscii(_ProductInfo[9]).replace(/\0/g, '');
		_product_weight = _product_weight.replace('weight', '');
		var _product_certificate_name = web3.toAscii(_ProductInfo[10]).replace(/\0/g, '');
		var _product_certificate_weight = web3.toAscii(_ProductInfo[11]).replace(/\0/g, '');
		_product_certificate_weight = _product_certificate_weight.replace('weight', '');
		var _product_certificate_source = web3.toAscii(_ProductInfo[12]).replace(/\0/g, '');
		var _producer_appraiser_count = _ProductInfo[13].toString();
		var _producer_identify_info_count = _ProductInfo[14].toString();
		var _product_appraiser = new Array();
		for(var i = 0; i < _ProductInfo[13]; i++) {
			var width = 100 / _ProductInfo[13] + '%';
			_product_appraiser[i] = web3.toAscii(_ProductInfo[15][i]).replace(/\0/g, '');
			table1.children().find("tr").append("<td width='" + width + "'>" + _product_appraiser[i] + "</td>");
		}
		var _product_identify_info = new Array();
		for(var i = 0; i < _ProductInfo[14]; i++) {
			var width = 100 / _ProductInfo[13] + '%';
			_product_identify_info[i] = web3.toAscii(_ProductInfo[16][i]).replace(/\0/g, '');
			table2.children().find("tr").append("<td width='" + width + "'>" + _product_identify_info[i] + "</td>");
		}
		var _owner_name = new Array();
		var _owner = new Array();
		for(var i = 0; i < _ProductInfo[21]; i++) {
			_owner[i] = App.checkRole(_ProductInfo[19][i].toString());
		}
		for(var i = 0; i < _ProductInfo[21]; i++) {
			var width = 100 / _ProductInfo[13] + '%';
			_owner_name[i] = web3.toAscii(_ProductInfo[17][i]).toString().replace(/\0/g, '') + '(' + _owner[i] + ')';
			if(i < _ProductInfo[21] - 1) {
				_owner_name[i] += "<span style='color:#22FFFF'>" + '&#8195&#8195&#8195&#8195&#8195======>' + '</span>';
			}
			table3.children().find("tr").append("<td width='" + width + "'>" + _owner_name[i] + "</td>");
		}
		var _owner_email = new Array();
		for(var i = 0; i < _ProductInfo[21]; i++) {
			var width = 100 / _ProductInfo[13] + '%';
			_owner_email[i] = web3.toAscii(_ProductInfo[18][i]).toString().replace(/\0/g, '') + '(' + _owner[i] + ')';
			if(i < _ProductInfo[21] - 1) {
				_owner_email[i] += "<span style='color:#22FFFF'>" + '&#8195&#8195&#8195&#8195&#8195======>' + '</span>';
			}
			table4.children().find("tr").append("<td width='" + width + "'>" + _owner_email[i] + "</td>");
		}
		var _product_time = new Array();
		console.log(_ProductInfo[6]);
		for(var i = 0; i < _ProductInfo[6].length; i++) {
			var width = 100 / _ProductInfo[13] + '%';
			_product_time[i] = web3.toAscii(_ProductInfo[6][i]).replace(/\0/g, '');
			if(i < _ProductInfo[21] - 1) {
				_product_time[i] += "<span style='color:#22FFFF'>" + '&#8195&#8195&#8195&#8195&#8195======>' + '</span>';
			}
			table5.children().find("tr").append("<td width='" + width + "'>" + _product_time[i] + "</td>");
		}
		var _owner_address_info = new Array();
		for(var i = 0; i < _ProductInfo[20].length; i++) {
			var width = 100 / _ProductInfo[13] + '%';
			_owner_address_info[i] = _ProductInfo[20][i] + '(' + App.checkRole(_owner) + ')';
			if(i < _ProductInfo[21] - 1) {
				_owner_address_info[i] += "<span style='color:#22FFFF'>" + '&#8195&#8195&#8195&#8195&#8195======>' + '</span>';
			}
			table6.children().find("tr").append("<td width='" + width + "'>" + _owner_address_info[i] + "</td>");
		}
		var _owner_count = _ProductInfo[21].toString();
		var _product_password;
		console.log(_ProductInfo[22]);
		if(flag) {
			_product_password = web3.toAscii(_ProductInfo[22]).toString().replace(/\0/g, '').replace('password', '');
		} else {
			_product_password = "抱歉，此处无权查看！如果你是产品所有者，请转到个人中心的所拥有产品页面查看！";
		}
		var table = $("<table class='center-block' style='white-space:nowrap;padding:1%;overflow:auto;border:0.5rem solid #00FF00;color:#00FF00;margin:1%;border-radius:10px' float='left'></table>");
		var tr = new Array();
		var td = new Array();
		for(var i = 0; i < 23; i++) {
			tr[i] = $("<tr></tr>");
			if(i < 22) {
				td[i] = $("<td></td>");
			}
		}
		td[0].append(_product_count);
		td[1].append(_product_id);
		td[2].append(_product_name);
		td[3].append(_product_class);
		td[4].append(_producer_name);
		td[5].append(_producer_address);
		td[6].append(_product_status);
		td[7].append(_producer_grade);
		td[8].append(_product_weight);
		td[9].append(_product_certificate_name);
		td[10].append(_product_certificate_weight);
		td[11].append(_product_certificate_source);
		td[12].append(_producer_appraiser_count);
		td[13].append(_producer_identify_info_count);
		td[14].append(table1);
		td[15].append(table2);
		td[16].append(table3);
		td[17].append(table4);
		td[18].append(table5);
		td[19].append(table6);
		td[20].append(_owner_count);
		td[21].append(_product_password);
		tr[0].append($("<th>产品序号：</th>"));
		tr[1].append($("<th>产品ID：</th>"));
		tr[2].append($("<th>产品名称：</th>"));
		tr[3].append($("<th>产品类别：</th>"));
		tr[4].append($("<th>生产者姓名：</th>"));
		tr[5].append($("<th>生产者地址：</th>"));
		tr[6].append($("<th>产品状况：</th>"));
		tr[7].append($("<th>产品质量等级：</th>"));
		tr[8].append($("<th>产品重量：</th>"));
		tr[9].append($("<th>鉴定证书名称：</th>"));
		tr[10].append($("<th>鉴定证书重量：</th>"));
		tr[11].append($("<th>鉴定机构：</th>"));
		tr[12].append($("<th>鉴定人员数量：</th>"));
		tr[13].append($("<th>鉴定信息数量：</th>"));
		tr[14].append($("<th>鉴定人员：</th>"));
		tr[15].append($("<th>鉴定信息：</th>"));
		tr[16].append($("<th>交易者姓名：</th>"));
		tr[17].append($("<th>交易者邮箱：</th>"));
		tr[18].append($("<th>产品录入及交易时间：</th>"));
		tr[19].append($("<th>交易者地址：</th>"));
		tr[20].append($("<th>交易次数：</th>"));
		tr[21].append($("<th>产品信息修改密码：</th>"));
		tr[22].append($("<th><a class='btn btn-primary' onclick='App.displayBuyProduct(" + _product_count + ")' href='#'>购买</a></th>"));
		tr[22].append($("<th><a class='btn btn-primary' href='#' onclick='App.displayProduct_Info()'>返回</a></th>"));
		for(var i = 0; i < 22; i++) {
			tr[i].append(td[i]);
		}
		for(var i = 0; i < 23; i++) {
			table.append(tr[i]);
		}
		var div = $("<div></div>");
		div.append(table);
		$("#productMoreInfo").append(div);
	}
};

var vcity = {
	11: "北京",
	12: "天津",
	13: "河北",
	14: "山西",
	15: "内蒙古",
	21: "辽宁",
	22: "吉林",
	23: "黑龙江",
	31: "上海",
	32: "江苏",
	33: "浙江",
	34: "安徽",
	35: "福建",
	36: "江西",
	37: "山东",
	41: "河南",
	42: "湖北",
	43: "湖南",
	44: "广东",
	45: "广西",
	46: "海南",
	50: "重庆",
	51: "四川",
	52: "贵州",
	53: "云南",
	54: "西藏",
	61: "陕西",
	62: "甘肃",
	63: "青海",
	64: "宁夏",
	65: "新疆",
	71: "台湾",
	81: "香港",
	82: "澳门",
	91: "国外"
};

var gender = {
	0: "女",
	1: "男",
};

checkCard = function() {
	var truename = document.getElementById("realNameInput").value;
	var reg = /^[\u4e00-\u9fa5]{2,4}$/i;
	if(!reg.test(truename)) {
		alert("请输入真实姓名，只能是2-4个汉字！");
		document.getElementById('yourname').focus();
	} else {
		var card = document.getElementById('realIDInput').value;
		//是否为空
		if(card === '') {
			alert('请输入身份证号，身份证号不能为空');
			document.getElementById('realIDInput').focus();
			return false;
		}
		//校验长度，类型
		if(isCardNo(card) === false) {
			alert('您输入的身份证号码不正确，请重新输入');
			document.getElementById('realIDInput').focus();
			return false;
		}
		//检查省份
		if(checkProvince(card) === false) {
			alert('您输入的身份证号码不正确,请重新输入');
			document.getElementById('realIDInput').focus();
			return false;
		}
		//检查身份证省份与所选户籍所在地
		if(checkProvinceSelect(card) === false) {
			alert('您的身份证所在地与你所选户籍所在地不一致，请重新核对身份证号与所选户籍所在地');
			document.getElementById('realIDInput').focus();
			return false;
		}
		//校验生日
		if(checkBirthday(card) === false) {
			alert('您输入的身份证号码生日不正确,请重新输入');
			document.getElementById('realIDInput').focus();
			return false;
		}
		//检验位的检测
		if(checkParity(card) === false) {
			alert('您的身份证校验位不正确,请重新输入');
			document.getElementById('realIDInput').focus();
			return false;
		}
		//性别位的检测
		if(checkGender(card) === false) {
			alert('您的身份证性别与你的性别不一致，请核对你的身份证号码与你的性别！');
			document.getElementById('realIDInput').focus();
			return false;
		}
		alert('身份证验证通过，可以注册');
		return true;
	}
};

//检查号码是否符合规范，包括长度，类型
isCardNo = function(card) {
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	if(reg.test(card) === false) {
		return false;
	}

	return true;
};

//取身份证前两位,校验省份
checkProvince = function(card) {
	var province = card.substr(0, 2);
	if(vcity[province] == undefined) {
		return false;
	}
	return true;
};

//校验身份证省份与所选户籍所在地
checkProvinceSelect = function(card) {
	var province = card.substr(0, 2);
	if(vcity[province] == $("#addressSelect").val()) {
		return true;
	}
	return false;
};

//检查生日是否正确
checkBirthday = function(card) {
	var len = card.length;
	//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
	if(len == '15') {
		var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
		var arr_data = card.match(re_fifteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date('19' + year + '/' + month + '/' + day);
		return verifyBirthday('19' + year, month, day, birthday);
	}
	//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
	if(len == '18') {
		var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
		var arr_data = card.match(re_eighteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date(year + '/' + month + '/' + day);
		return verifyBirthday(year, month, day, birthday);
	}
	return false;
};

//校验日期
verifyBirthday = function(year, month, day, birthday) {
	var now = new Date();
	var now_year = now.getFullYear();
	//年月日是否合理
	if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
		//判断年份的范围（3岁到100岁之间)
		var time = now_year - year;
		if(time >= 3 && time <= 100) {
			return true;
		}
		return false;
	}
	return false;
};

//校验位的检测
checkParity = function(card) {
	//15位转18位
	card = changeFivteenToEighteen(card);
	var len = card.length;
	if(len == '18') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		var cardTemp = 0,
			i, valnum;
		for(i = 0; i < 17; i++) {
			cardTemp += card.substr(i, 1) * arrInt[i];
		}
		valnum = arrCh[cardTemp % 11];
		if(valnum == card.substr(17, 1)) {
			return true;
		}
		return false;
	}
	return false;
};

//性别位的检测
checkGender = function(card) {
	//15位转18位
	card = changeFivteenToEighteen(card);
	var len = card.length;
	if(len == '18') {
		var cardTemp = card.substr(16, 1) % 2;
		if(gender[cardTemp] == $("#genderSelect").val()) {
			return true;
		}
		return false;
	}
	return false;
};

//15位转18位身份证号
changeFivteenToEighteen = function(card) {
	if(card.length == '15') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		var cardTemp = 0,
			i;
		card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
		for(i = 0; i < 17; i++) {
			cardTemp += card.substr(i, 1) * arrInt[i];
		}
		card += arrCh[cardTemp % 11];
		return card;
	}
	return card;
};



window.addEventListener('load', function() {
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if(typeof web3 !== 'undefined') {
		console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
		// Use Mist/MetaMask's provider
		window.web3 = new Web3(web3.currentProvider);
		App.web3Provider = web3.currentProvider;
	} else {
		console.warn("No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
		App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
	}
	App.start();
});