{


let JSRequire = function(url, thread) {
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.async = "async";
	let error = thread.bind("load failed:" + url);
	script.onabort = error;
	script.onerror = error;
	script.ontimeout = error;
	script.onload = thread.bind(undefined);
	script.src = url + ".js";
	document.body.appendChild(script);
}

Require = function(url) {
	return new Promise(function(___COROUTINE, ___) {
		JSRequire(url, ___COROUTINE);
		return;
	});
}

__ALITTLEAPI_Core_Init = function(base_path) {
	return new Promise(async function(___COROUTINE, ___) {
		{
			await Require(base_path + "Core/JavaScript/JavaScriptClass");
			await Require(base_path + "Core/JavaScript/JavaScriptException");
		}
		await Require(base_path + "Core/Reflect/ReflectRegister");
		await Require(base_path + "Core/Reflect/ReflectDefine");
		await Require(base_path + "Core/Utility/Log");
		await Require(base_path + "Core/Utility/List");
		await Require(base_path + "Core/Utility/Map");
		await Require(base_path + "Core/Utility/Math");
		await Require(base_path + "Core/Utility/String");
		await Require(base_path + "Core/Utility/Time");
		await Require(base_path + "Core/Utility/Coroutine");
		await Require(base_path + "Core/Net/HttpFileReceiver");
		await Require(base_path + "Core/Net/HttpFileSender");
		await Require(base_path + "Core/Net/HttpReceiver");
		await Require(base_path + "Core/Net/HttpSender");
		await Require(base_path + "Core/Net/MsgCommon");
		___COROUTINE();
	});
}

}