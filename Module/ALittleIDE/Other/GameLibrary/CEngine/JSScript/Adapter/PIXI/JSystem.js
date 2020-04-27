{
if (typeof JavaScript === "undefined") JavaScript = {};


JavaScript.JSystem_GetDeviceID = function() {
	let id = undefined;
	let json = undefined;
	if (document.cookie !== undefined && document.cookie !== "") {
		let error = undefined;
		[error, json] = (function() { try { let ___VALUE = ALittle.String_JsonDecode.call(undefined, document.cookie); return [undefined, ___VALUE]; } catch (___ERROR) { return [___ERROR.message]; } })();
		if (error !== undefined) {
			json = undefined;
		}
	}
	if (json !== undefined) {
		id = json["device_id"];
	}
	if (id === undefined) {
		let rand = ALittle.Math_RandomInt(0, 10000);
		let time = ALittle.Time_GetCurTime();
		if (json === undefined) {
			json = {};
		}
		id = "device_id_" + rand + "_" + time;
		json["device_id"] = id;
		document.cookie = ALittle.String_JsonEncode(json);
	}
	return id;
}

window.A_PixiApp = undefined;
let JSystem_FingerDown = function(event) {
	let func = window["__ALITTLEAPI_FingerDown"];
	if (func === undefined) {
		return;
	}
	func((event.pageX - event.srcElement.offsetLeft) / A_PixiApp.stage.scale.x, (event.pageY - event.srcElement.offsetTop) / A_PixiApp.stage.scale.y, 1, 1);
}

let JSystem_FingerUp = function(event) {
	let func = window["__ALITTLEAPI_FingerUp"];
	if (func === undefined) {
		return;
	}
	func((event.pageX - event.srcElement.offsetLeft) / A_PixiApp.stage.scale.x, (event.pageY - event.srcElement.offsetTop) / A_PixiApp.stage.scale.y, 1, 1);
}

let JSystem_FingerMoved = function(event) {
	let func = window["__ALITTLEAPI_FingerMoved"];
	if (func === undefined) {
		return;
	}
	func((event.pageX - event.srcElement.offsetLeft) / A_PixiApp.stage.scale.x, (event.pageY - event.srcElement.offsetTop) / A_PixiApp.stage.scale.y, 1, 1);
}

let JSystem_MouseMoved = function(event) {
	let func = window["__ALITTLEAPI_MouseMoved"];
	if (func === undefined) {
		return;
	}
	func((event.pageX - event.srcElement.offsetLeft) / A_PixiApp.stage.scale.x, (event.pageY - event.srcElement.offsetTop) / A_PixiApp.stage.scale.y);
}

let JSystem_MouseDown = function(event) {
	let func = undefined;
	if (event.which === 1) {
		func = window["__ALITTLEAPI_LButtonDown"];
	} else if (event.which === 2) {
		func = window["__ALITTLEAPI_MButtonDown"];
	} else if (event.which === 3) {
		func = window["__ALITTLEAPI_RButtonDown"];
	}
	if (func === undefined) {
		return;
	}
	func((event.pageX - event.srcElement.offsetLeft) / A_PixiApp.stage.scale.x, (event.pageY - event.srcElement.offsetTop) / A_PixiApp.stage.scale.y, 1);
}

let JSystem_MouseUp = function(event) {
	let func = undefined;
	if (event.which === 1) {
		func = window["__ALITTLEAPI_LButtonUp"];
	} else if (event.which === 2) {
		func = window["__ALITTLEAPI_MButtonUp"];
	} else if (event.which === 3) {
		func = window["__ALITTLEAPI_RButtonUp"];
	}
	if (func === undefined) {
		return;
	}
	func((event.pageX - event.srcElement.offsetLeft) / A_PixiApp.stage.scale.x, (event.pageY - event.srcElement.offsetTop) / A_PixiApp.stage.scale.y);
}

let JSystem_MouseWheel = function(event) {
	let func = window["__ALITTLEAPI_MouseWheel"];
	if (func === undefined) {
		return;
	}
	let x = event.wheelDelta;
	if (x === undefined) {
		x = event.detail;
	}
	let y = event.wheelDelta;
	if (y === undefined) {
		y = event.detail;
	}
	func(x, y);
}

let JSystem_MouseOut = function(event) {
	let func = window["__ALITTLEAPI_WindowLeave"];
	if (func === undefined) {
		return;
	}
	if (event.pageX - event.srcElement.offsetLeft > 0 && event.pageY - event.srcElement.offsetTop > 0) {
		return;
	}
	func();
}

let JSystem_KeyDown = function(event) {
	let func = window["__ALITTLEAPI_KeyDown"];
	if (func === undefined) {
		return;
	}
	func(0, event.keyCode, 0);
}

let JSystem_KeyUp = function(event) {
	let func = window["__ALITTLEAPI_KeyUp"];
	if (func === undefined) {
		return;
	}
	func(0, event.keyCode, 0);
}

JavaScript.JSystem_CreateView = function(title, width, height, flag, scale) {
	if (A_PixiApp !== undefined) {
		return true;
	}
	let data = {};
	data.width = ALittle.Math_Floor(width * scale);
	data.height = ALittle.Math_Floor(height * scale);
	data.forceCanvas = !PIXI.utils.isWebGLSupported();
	A_PixiApp = new PIXI.Application(data);
	document.body.appendChild(A_PixiApp.view);
	document.title = title;
	A_PixiApp.stage.scale.x = scale;
	A_PixiApp.stage.scale.y = scale;
	if (ALittle.System_IsPhone()) {
		A_PixiApp.view.ontouchstart = JSystem_FingerDown;
		A_PixiApp.view.ontouchmove = JSystem_FingerMoved;
		A_PixiApp.view.ontouchend = JSystem_FingerUp;
	} else {
		A_PixiApp.view.onmousedown = JSystem_MouseDown;
		A_PixiApp.view.onmousemove = JSystem_MouseMoved;
		A_PixiApp.view.onmouseup = JSystem_MouseUp;
		A_PixiApp.view.onmousewheel = JSystem_MouseWheel;
		A_PixiApp.view.onmouseout = JSystem_MouseOut;
		A_PixiApp.view.onkeydown = JSystem_KeyDown;
		A_PixiApp.view.onkeyup = JSystem_KeyUp;
	}
	A_JDisplaySystem.AddToStage(A_PixiApp.stage);
	let func = window["__ALITTLEAPI_ViewResized"];
	if (func !== undefined) {
		func(width, height);
	}
	A_PixiApp.ticker.add(JavaScript.JSystem_MainLoop);
	return true;
}

JavaScript.JSystem_SetViewTitle = function(title) {
	document.title = title;
	return true;
}

JavaScript.JSystem_Render = function() {
	if (A_PixiApp === undefined) {
		return false;
	}
	A_PixiApp.render();
	return true;
}

JavaScript.JSystem_GetStage = function() {
	if (A_PixiApp === undefined) {
		return undefined;
	}
	return A_PixiApp.stage;
}

let LOOP_LAST_TIME = 0;
JavaScript.JSystem_MainLoop = function(delta) {
	if (LOOP_LAST_TIME === 0) {
		LOOP_LAST_TIME = Date.now();
		return;
	}
	let cur_time = Date.now();
	let delta_time = cur_time - LOOP_LAST_TIME;
	LOOP_LAST_TIME = cur_time;
	A_LoopSystem.Update(delta_time);
}

}