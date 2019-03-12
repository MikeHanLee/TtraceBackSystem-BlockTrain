pragma solidity ^0.4.24;
///用户对象合约
contract Client{
	enum roles{Producer,Tradesman,Consumer,none}	///用户身份枚举
	struct ObjectInfo{		///对象结构体信息
		bytes32 name;
		bytes32 password;
		bytes32 email;
		address object_address;
		roles object_role;
		roles object_need_role;
	}
	uint count;
	mapping(address => ObjectInfo)ObjectDB;		///用户对象
	uint[] count_info;
	bytes32[] name_info;
	bytes32[] email_info;
	bytes32[] password_info;
	address[] address_info;
	roles[] object_role_info;
	address public theperson;
	///对象登录信息设置日志
	event LoginSetInfo(bytes32 Name,
		bytes32 Email, 
		roles Object_Role,
		roles Object_Need_Role);
	///身份设置日志
	event LoginSetRole(bytes32 Name, 
		address Address,
		roles Object_Need_Role);
	modifier onlyBy(address account){
		require(msg.sender==account);
		_;
	}
	constructor() public{
		theperson = msg.sender;
		count=0;
		ObjectDB[0x00].name="ChairMan";
		ObjectDB[0x00].password=0x4689bd31f0000000000000000000000000000000000000000000000000000000;
		ObjectDB[0x00].email=0x313130313939353337374071712e636f6d000000000000000000000000000000;
		ObjectDB[0x00].object_role=roles.none;
		ObjectDB[0x00].object_need_role=roles.none;
		ObjectDB[0x00].object_address=0x00;
		count_info.push(count);
		name_info.push("ChairMan");
		email_info.push(0x313130313939353337374071712e636f6d000000000000000000000000000000);
		password_info.push(0x4689bd31f0000000000000000000000000000000000000000000000000000000);
		object_role_info.push(roles.none);
		address_info.push(0x00);
		count++;
	}
	///设置用户对象信息
	function SetObjectInfo(bytes32 _name,bytes32 _password,
		bytes32 _email,roles _object_role)public returns(bool){
		ObjectDB[msg.sender].name=_name;
		ObjectDB[msg.sender].password=_password;
		ObjectDB[msg.sender].email=_email;
		ObjectDB[msg.sender].object_role=_object_role;
		ObjectDB[msg.sender].object_need_role=roles.none;
		ObjectDB[msg.sender].object_address=msg.sender;
		count_info.push(count);
		name_info.push(_name);
		email_info.push(_email);
		password_info.push(_password);
		address_info.push(msg.sender);
		object_role_info.push(_object_role);
		count++;
		emit LoginSetInfo(_name,_email,_object_role,roles.none);
		return true;
	}
	///获取用户对象信息
	function GetObjectInfo() public view returns(bytes32,bytes32,address,
		roles,roles){
		return(ObjectDB[msg.sender].name,
		ObjectDB[msg.sender].email,
		ObjectDB[msg.sender].object_address,
		ObjectDB[msg.sender].object_role,
		ObjectDB[msg.sender].object_need_role);
	}
	function GetAllObjectInfo() public view returns(uint[] memory,address[] memory,
		bytes32[] memory,bytes32[] memory,roles[] memory){
		return(count_info,
			address_info,
			name_info,
			email_info,
			object_role_info);
	}
	///登录
	function login(bytes32 _email,bytes32 _password) public view returns(roles){
		require(ObjectDB[msg.sender].email==_email);
		require(ObjectDB[msg.sender].password==_password);
		return ObjectDB[msg.sender].object_role;   
	}
	function loginroot(bytes32 _email,bytes32 _password) public view returns(roles){
		require(ObjectDB[0x00].email==_email);
		require(ObjectDB[0x00].password==_password);
		return ObjectDB[0x00].object_role;   
	}
	///设置用户所需的对象身份
	function SetRole(roles _need_role)public returns(bool){
		ObjectDB[msg.sender].object_need_role=_need_role;
		emit LoginSetRole(ObjectDB[msg.sender].name,
			msg.sender,
			ObjectDB[msg.sender].object_need_role);
		return true;
	}
	///获取用户所需的对象身份
	function GetRole(address _address) public view returns(roles,bytes32){
		assert(theperson==msg.sender);
		return(ObjectDB[_address].object_need_role,
			ObjectDB[_address].name);
	}
}
///追溯合约
contract Ascend is Client{
	struct Product{		///产品结构体信息
		bytes32 product_id;
		bytes32 product_name;
		bytes32 product_producer_name;
		address product_producer_address;
		uint product_owner_count;
		bytes32[] product_owner_name;
		address[] product_owner_address;
		roles[] product_owner;
		roles product_need_role;
	}
	mapping(uint => Product)ProductDB;
	uint product_count;
	uint trade_product_count;
	uint[] product_count_info;
	bytes32[] product_id_info;
	bytes32[] product_name_info;
	bytes32[] product_producer_name_info;
	address[] product_producer_address_info;
	modifier onlyProducer(address _address){
		require(ObjectDB[_address].object_role==roles.Producer);
		_;
	}
	modifier onlyTradesman(address _address){
		require(ObjectDB[_address].object_role==roles.Tradesman);
		_;
	}
	modifier onlyConsumer(address _address){
		require(ObjectDB[_address].object_role==roles.Consumer);
		_;
	}
	///生产者设置产品信息日志
	event SetProductInfoByProducer(bytes32 Product_id,
		bytes32 Product_name,
		address Producer_address);
	///零售商设置产品信息日志
	event SetProductInfoByTradesman(bytes32 Product_id,
		bytes32 Product_name,
		address Tradesman_address);
	constructor() public{
		product_count = 0;
	}
	///生产者录入产品信息
	function ProducerSetProductInfo(bytes32 _product_id,
		bytes32 _product_name)public returns(bool){
		ProductDB[product_count].product_id=_product_id;
		ProductDB[product_count].product_name=_product_name;
		ProductDB[product_count].product_producer_name=ObjectDB[msg.sender].name;
		ProductDB[product_count].product_producer_address=msg.sender;
		ProductDB[product_count].product_need_role=ObjectDB[msg.sender].object_need_role;
		ProductDB[product_count].product_owner_count=0;
		ProductDB[product_count].product_owner_name.push(ObjectDB[msg.sender].name);
		ProductDB[product_count].product_owner_address.push(msg.sender);
		ProductDB[product_count].product_owner.push(ObjectDB[msg.sender].object_role);
		product_count_info.push(product_count);
		product_id_info.push(_product_id);
		product_name_info.push(_product_name);
		product_producer_name_info.push(ObjectDB[msg.sender].name);
		product_producer_address_info.push(msg.sender);
		product_count++;
		emit SetProductInfoByProducer(_product_id,
			_product_name,
			msg.sender);
		return true;
	}
	///展示产品信息
	function DisplayProduct() view public returns(uint[] memory,
		bytes32[] memory,bytes32[] memory,bytes32[] memory,address[] memory){
		return(product_count_info,
			product_id_info,
			product_name_info,
			product_producer_name_info,
			product_producer_address_info);
	}
	///零售商录入产品信息
	function TradesmanSetProductInfo(uint _product_count)public returns(bool){
		require(ProductDB[_product_count].product_need_role==ObjectDB[msg.sender].object_role);
		ProductDB[_product_count].product_need_role=ObjectDB[msg.sender].object_need_role;
		ProductDB[_product_count].product_owner_name.push(ObjectDB[msg.sender].name);
		ProductDB[_product_count].product_owner_address.push(msg.sender);
		ProductDB[_product_count].product_owner.push(ObjectDB[msg.sender].object_role);
		ProductDB[_product_count].product_owner_count++;
		emit SetProductInfoByTradesman(ProductDB[_product_count].product_id,
			ProductDB[_product_count].product_name,msg.sender);
		return true;
	}
	///通过追溯码进行追溯
	function FindById(bytes32 _product_id) view public returns(bytes32,
		bytes32,bytes32){
		uint counter=0;
		for(uint i=0;i<product_count;i++){
			if(ProductDB[i].product_id==_product_id){
				counter=i;
			}
		}
		require(ProductDB[counter].product_id==_product_id);
		return(ProductDB[counter].product_id,
			ProductDB[counter].product_name,
			ProductDB[counter].product_producer_name);
	}
	///通过产品名称进行追溯
	function FindByName(uint i,bytes32 _product_name)view public returns(uint,bytes32,bytes32,bytes32,uint){
	    require(ProductDB[i].product_name==_product_name);
	    return(i,
		    ProductDB[i].product_id,
            ProductDB[i].product_name,
            ProductDB[i].product_producer_name,
            product_count);
	}
	function GetProductCount()view public returns(uint){
	    return(product_count);
	}
	///获取更多产品信息
	function GetMoreInfo(bytes32 _product_id) view public returns(bytes32,
		bytes32,bytes32,address,bytes32[] memory,roles[] memory,address[] memory,uint){
	    uint counter=0;
		for(uint i=0;i<product_count;i++){
			if(ProductDB[i].product_id==_product_id){
				counter=i;
			}
		}
		require(ProductDB[counter].product_id==_product_id);
	    return(ProductDB[counter].product_id,
			ProductDB[counter].product_name,
			ProductDB[counter].product_producer_name,
		    ProductDB[counter].product_producer_address,
			ProductDB[counter].product_owner_name,
			ProductDB[counter].product_owner,
		    ProductDB[counter].product_owner_address,
		    ProductDB[counter].product_owner_count);
	}
}