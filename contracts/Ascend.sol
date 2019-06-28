pragma solidity ^0.4.24;
///用户对象合约
contract Client{
	enum roles{Producer,Tradesman,Consumer,none}	///用户身份枚举
	struct ObjectInfo{		///对象结构体信息
		string name;
		bytes32 password;
		bytes32 email;
		address object_address;
		roles object_role;
		bytes32 IDnumber;
		string realName;
		string gender;
		string addressSelect;
	}
	uint count;
	mapping(uint => ObjectInfo)ObjectDB;		///用户对象
	uint[] count_info;
	bytes32[] name_info;
	bytes32[] email_info;
	bytes32[] password_info;
	address[] address_info;
	roles[] object_role_info;
	address public theperson;
	///对象登录信息设置日志
	event LoginSetInfo(string Name,
		bytes32 Email,
		roles Object_Role);
	///身份设置日志
	event LoginSetRole(string Name, 
		address Address,
		roles Object_role);
	event RealAuthenticate(uint Count,
	    bytes32 IDNumber,string RealName,string Gender,string AddressSelect);
	modifier onlyBy(address account){
		require(msg.sender==account);
		_;
	}
	constructor() public{
		theperson = msg.sender;
		count=0;
		/*ObjectDB[0x00].name="ChairMan";
		ObjectDB[0x00].password=;
		ObjectDB[0x00].email=;
		ObjectDB[0x00].object_role=roles.none;
		ObjectDB[0x00].object_address=0x00;
		count_info.push(count);
		name_info.push("ChairMan");
		email_info.push(0x313130313939353337374071712e636f6d000000000000000000000000000000);
		password_info.push(0x4689bd31f0000000000000000000000000000000000000000000000000000000);
		object_role_info.push(roles.none);
		address_info.push(0x00);
		count++;*/
	}
	///设置用户对象信息
	function SetObjectInfo(string _name,bytes32 _password,
		bytes32 _email,roles _object_role)public returns(bool){
		ObjectDB[count].name=_name;
		ObjectDB[count].password=_password;
		ObjectDB[count].email=_email;
		ObjectDB[count].object_role=_object_role;
		ObjectDB[count].object_address=msg.sender;
		count_info.push(count);
		//name_info.push(_name);
		email_info.push(_email);
		password_info.push(_password);
		address_info.push(msg.sender);
		object_role_info.push(_object_role);
		count++;
		emit LoginSetInfo(_name,_email,_object_role);
		return true;
	}
	///获取用户对象信息
	function GetObjectInfo(uint _count) public view returns(string,bytes32,address,
		roles){
		return(ObjectDB[_count].name,
		ObjectDB[_count].email,
		ObjectDB[_count].object_address,
		ObjectDB[_count].object_role);
	}
	///实名认证
	function RealNameAuthenticate(uint _count,bytes32 _IDnumber,string _realName,string _addressSelect,
	    string _gender)public returns(bool){
	    ObjectDB[_count].IDnumber=_IDnumber;
	    ObjectDB[_count].realName=_realName;
	    ObjectDB[_count].addressSelect=_addressSelect;
	    ObjectDB[_count].gender=_gender;
	    emit RealAuthenticate(_count,_IDnumber,_realName,_addressSelect,_gender);
	    return true;
	}
	///获取身份证号 
	function GetRealName(uint _count)public view returns(bytes32,string,string,string){
	    return (ObjectDB[_count].IDnumber,ObjectDB[_count].realName,ObjectDB[_count].gender,ObjectDB[_count].addressSelect);
	}
    ///获取所有用户信息 
	/*function GetAllObjectInfo() public view returns(uint[] memory,address[] memory,
		bytes32[] memory,bytes32[] memory,roles[] memory){
		return(count_info,
			address_info,
			name_info,
			email_info,
			object_role_info);
	}*/
	///登录
	function login(bytes32 _email,bytes32 _password) public view returns(roles,uint){
	    if(_email==0x313130313939353337374071712e636f6d000000000000000000000000000000){
	        require(_password==0x4689bd31f0000000000000000000000000000000000000000000000000000000);
	        return (roles.none,0);
	    }else{
	        uint k;
	        for(k=0;k<count;k++){
	            if(ObjectDB[k].email==_email){
	               require(ObjectDB[k].password==_password);
	               return (ObjectDB[k].object_role,k);
	            }
	        }
	    }
	    require(_email==0x313130313939353337374071712e636f6d000000000000000000000000000000);
	    require(_password==0x4689bd31f0000000000000000000000000000000000000000000000000000000);
	    return (roles.none,0);
	}
	///设置用户所需的对象身份
	function SetRole(uint _count,roles _role)public returns(bool){
		ObjectDB[_count].object_role=_role;
		emit LoginSetRole(ObjectDB[_count].name,
			msg.sender,
			_role);
		return true;
	}
	///获取用户所需的对象身份
	function GetRole(uint _count) public view returns(roles,string){
		return(ObjectDB[_count].object_role,
			ObjectDB[_count].name);
	}
	function GetCount()view public returns(uint){
	    return(count);
	}
}
///追溯合约
contract Ascend is Client{
    enum classification{Antiqu,Jade,Jewellery,other}
    enum grades{FirstGrade,SecondGrade,ThirdGrade,other}
	struct Product{		///产品结构体信息
		bytes32 product_id;
		bytes32 product_name;
		bytes32 product_password;
		classification product_class;
		bytes32 product_status;
		grades product_grade;
		bytes32 product_weight;
		bytes32 product_certificate_name;
		bytes32 product_certificate_weight;
		bytes32 product_certificate_source;
		bytes32 product_producer_name;
		address product_producer_address;
		uint product_owner_count;
		uint product_appraiser_count;
		uint product_identify_info_count;
		bytes32[] product_appraiser;
		bytes32[] product_identify_info;
		bytes32[] product_time;
		bytes32[] product_owner_name;
		bytes32[] product_owner_email;
		address[] product_owner_address;
		roles[] product_owner;
	}
	mapping(uint => Product)ProductDB;
	uint product_count;
	uint trade_product_count;
	uint[] product_count_info;
	bytes32[] product_id_info;
	bytes32[] product_name_info;
	bytes32[] product_producer_time_info;
	bytes32[] product_producer_name_info;
	address[] product_producer_address_info;
	classification[] product_class_info;
	modifier onlyProducer(uint _count){
		require(ObjectDB[_count].object_role==roles.Producer);
		_;
	}
	modifier onlyTradesman(uint _count){
		require(ObjectDB[_count].object_role==roles.Tradesman);
		_;
	}
	modifier onlyConsumer(uint _count){
		require(ObjectDB[_count].object_role==roles.Consumer);
		_;
	}
	///生产者设置产品信息日志
	event SetProductInfoByProducer(bytes32 Product_id,
		bytes32 Product_name,
		bytes32 Product_password,
		classification Product_class,
		bytes32 _product_status,
		grades _product_grade,
		address Producer_address);
	event SetProductInfoByProducerSecond(bytes32 Product_weight,
			bytes32 Product_certificate_name,
		    bytes32 Product_certificate_weight,
		    bytes32 Product_certificate_source,
		    uint Product_appraiser_length,
		    uint Product_identify_info_length);
	///其他人设置产品信息日志
	event SetProductInfoByOthers(bytes32 Product_id,
		bytes32 Product_name,
		bytes32 Product_password,
		address Others_address);
	constructor() public{
		product_count = 0;
	}
	///生产者录入产品信息
	function ProducerSetProductInfo(uint _count,bytes32 _product_id,
		bytes32 _product_name,bytes32 _product_password,classification _product_class,
		bytes32 _product_status,grades _product_grade,bytes32 _product_time)public returns(bool){
		ProductDB[product_count].product_id=_product_id;
		ProductDB[product_count].product_name=_product_name;
		ProductDB[product_count].product_password=_product_password;
		ProductDB[product_count].product_class=_product_class;
		//ProductDB[product_count].product_producer_name=ObjectDB[_count].name;
		ProductDB[product_count].product_producer_address=msg.sender;
		ProductDB[product_count].product_status=_product_status;
		ProductDB[product_count].product_grade=_product_grade;
		ProductDB[product_count].product_owner_count=1;
		ProductDB[product_count].product_time.push(_product_time);
		//ProductDB[product_count].product_owner_name.push(ObjectDB[_count].name);
		ProductDB[product_count].product_owner_email.push(ObjectDB[_count].email);
		ProductDB[product_count].product_owner_address.push(msg.sender);
		ProductDB[product_count].product_owner.push(ObjectDB[_count].object_role);
		product_count_info.push(product_count);
		product_id_info.push(_product_id);
		product_name_info.push(_product_name);
		//product_producer_name_info.push(ObjectDB[_count].name);
		product_producer_address_info.push(msg.sender);
		product_class_info.push(_product_class);
		product_producer_time_info.push(_product_time);
		emit SetProductInfoByProducer(_product_id,
			_product_name,
			_product_password,
			_product_class,
			_product_status,
			_product_grade,
			msg.sender);
		return true;
	}
	function ProducerSetProductInfoSecond(bytes32 _product_weight,bytes32 _product_certificate_name,
		bytes32 _product_certificate_weight,bytes32 _product_certificate_source,bytes32[] memory _product_appraiser,
		bytes32[] memory _product_identify_info)public returns(bool){
		ProductDB[product_count].product_weight=_product_weight;
		ProductDB[product_count].product_certificate_name=_product_certificate_name;
		ProductDB[product_count].product_certificate_weight=_product_certificate_weight;
		ProductDB[product_count].product_certificate_source=_product_certificate_source;
		ProductDB[product_count].product_appraiser_count=_product_appraiser.length;
		for(uint i=0;i<_product_appraiser.length;i++){
		    ProductDB[product_count].product_appraiser.push(_product_appraiser[i]);
		}
		ProductDB[product_count].product_identify_info_count=_product_identify_info.length;
		for(uint j=0;j<_product_identify_info.length;j++){
		    ProductDB[product_count].product_identify_info.push(_product_identify_info[j]);
		}
		product_count++;
		emit SetProductInfoByProducerSecond(_product_weight,
			_product_certificate_name,
		    _product_certificate_weight,
		    _product_certificate_source,
		    _product_appraiser.length,
		    _product_identify_info.length);
		return true;
	}
	///展示产品信息
	function DisplayProduct() view public returns(uint[] memory,
		bytes32[] memory,bytes32[] memory,classification[] memory,bytes32[] memory,bytes32[] memory,address[] memory){
		return(product_count_info,
			product_id_info,
			product_name_info,
			product_class_info,
			product_producer_time_info,
			product_producer_name_info,
			product_producer_address_info);
	}
	///与自己相关的产品信息
	function GetOwnProduct(uint counter,bytes32 _email) view public returns(bool){
		for(uint i=0;i<ProductDB[counter].product_owner_email.length;i++){
		    if(ProductDB[counter].product_owner_email[i]==_email){
		        return true;
		    }
		}
		return false;
	}
	///仍属于自己的产品信息
	function GetOwnProductHaving(uint counter,bytes32 _email) view public returns(bool){
		uint i=0;
		i=ProductDB[counter].product_owner_email.length-1;
		require(ProductDB[counter].product_owner_email[i]==_email);
		DisplayOwnProduct(counter);
		return true;
	}
	///展示自己的产品信息
	function DisplayOwnProduct(uint counter) view public returns(uint,
		bytes32,bytes32,classification,bytes32,address){
		return(counter,
			ProductDB[counter].product_id,
			ProductDB[counter].product_name,
			ProductDB[counter].product_class,
			ProductDB[counter].product_producer_name,
			ProductDB[counter].product_producer_address);
	}
	///判断是否拥有此产品
	function JudgeProduct(uint _count,uint _product_count)view public returns(bool){
	    if(ProductDB[_product_count].product_owner_email[ProductDB[_product_count].product_owner_email.length-1]==ObjectDB[_count].email){
	        return true;
	    }
	    return false;
	}
	///其他人录入产品信息
	function OthersSetProductInfo(uint _count,uint _product_count,bytes32 _product_time,
	    bytes32 _product_password,bytes32 _product_newpassword)public returns(bool){
		require(ProductDB[_product_count].product_password==_product_password);
		ProductDB[_product_count].product_password=_product_newpassword;
		ProductDB[_product_count].product_time.push(_product_time);
	//	ProductDB[_product_count].product_owner_name.push(ObjectDB[_count].name);
		ProductDB[_product_count].product_owner_email.push(ObjectDB[_count].email);
		ProductDB[_product_count].product_owner_address.push(msg.sender);
		ProductDB[_product_count].product_owner.push(ObjectDB[_count].object_role);
		ProductDB[_product_count].product_owner_count++;
		emit SetProductInfoByOthers(ProductDB[_product_count].product_id,
			ProductDB[_product_count].product_name,
			ProductDB[_product_count].product_password,
			msg.sender);
		return true;
	}
	///通过追溯码进行追溯
	function FindById(bytes32 _product_id) view public returns(uint,bytes32,
		bytes32,classification,bytes32){
		uint counter=0;
		for(uint i=0;i<product_count;i++){
			if(ProductDB[i].product_id==_product_id){
				counter=i;
			}
		}
		require(ProductDB[counter].product_id==_product_id);
		return(counter,
		    ProductDB[counter].product_id,
			ProductDB[counter].product_name,
            ProductDB[counter].product_class,
			ProductDB[counter].product_producer_name);
	}
	///通过产品名称进行追溯
	function FindByName(uint counter,bytes32 _product_name)view public returns(uint,bytes32,bytes32,classification,bytes32){
	    require(ProductDB[counter].product_name==_product_name);
	    return(counter,
		    ProductDB[counter].product_id,
            ProductDB[counter].product_name,
            ProductDB[counter].product_class,
            ProductDB[counter].product_producer_name);
	}
    ///通过产品类型查询 
	function FindByClass(uint counter,classification _product_class)view public returns(uint,bytes32,bytes32,classification,bytes32){
	    require(ProductDB[counter].product_class==_product_class);
	    return(counter,
		    ProductDB[counter].product_id,
            ProductDB[counter].product_name,
            ProductDB[counter].product_class,
            ProductDB[counter].product_producer_name);
	}
	///获取平台产品总数量
	function GetProductCount()view public returns(uint){
	    return(product_count);
	}
	///获取更多产品信息
	function GetMoreInfo(bytes32 _product_id) view public returns(uint,bytes32,bytes32,classification,bytes32,
	    address,bytes32[] memory,bytes32,grades,bytes32,bytes32,bytes32,bytes32){
	    uint counter=0;
		for(uint i=0;i<product_count;i++){
			if(ProductDB[i].product_id==_product_id){
				counter=i;
			}
		}
		require(ProductDB[counter].product_id==_product_id);
	    return(counter,
	        ProductDB[counter].product_id,
			ProductDB[counter].product_name,
			ProductDB[counter].product_class,
			ProductDB[counter].product_producer_name,
		    ProductDB[counter].product_producer_address,
		    ProductDB[counter].product_time,
		    ProductDB[counter].product_status,
			ProductDB[counter].product_grade,
			ProductDB[counter].product_weight,
			ProductDB[counter].product_certificate_name,
		    ProductDB[counter].product_certificate_weight,
		    ProductDB[counter].product_certificate_source);
	}
	function GetMoreInfoSecond(bytes32 _product_id) view public returns(uint,uint,bytes32[] memory,bytes32[] memory,
		bytes32[] memory,bytes32[] memory,roles[] memory,address[] memory,uint){
	    uint counter=0;
		for(uint i=0;i<product_count;i++){
			if(ProductDB[i].product_id==_product_id){
				counter=i;
			}
		}
		require(ProductDB[counter].product_id==_product_id);
	    return(ProductDB[counter].product_appraiser_count,
		    ProductDB[counter].product_identify_info_count,
			ProductDB[counter].product_appraiser,
		    ProductDB[counter].product_identify_info,
			ProductDB[counter].product_owner_name,
			ProductDB[counter].product_owner_email,
			ProductDB[counter].product_owner,
		    ProductDB[counter].product_owner_address,
		    ProductDB[counter].product_owner_count);
	}
	function GetMoreInfoThird(bytes32 _product_id) view public returns(bytes32){
	    uint counter=0;
		for(uint i=0;i<product_count;i++){
			if(ProductDB[i].product_id==_product_id){
				counter=i;
			}
		}
		require(ProductDB[counter].product_id==_product_id);
	    return(ProductDB[counter].product_password);
	}
}