{
if (typeof ALittleIDE === "undefined") ALittleIDE = {};

ALittle.RegStruct(-1105378563, "ALittleIDE.IDETreeUserInfo", {
name : "ALittleIDE.IDETreeUserInfo", ns_name : "ALittleIDE", rl_name : "IDETreeUserInfo", hash_code : -1105378563,
name_list : ["base","default","child_type","root","object","extends","extends_root"],
type_list : ["ALittle.DisplayInfo","ALittle.DisplayInfo","string","bool","ALittle.DisplayObject","bool","bool"],
option_map : {}
})
ALittle.RegStruct(-4982446, "ALittle.DisplayInfo", {
name : "ALittle.DisplayInfo", ns_name : "ALittle", rl_name : "DisplayInfo", hash_code : -4982446,
name_list : ["__target_class","__class_func","__base_attr","__show_attr","loop_map","__class","__include","__extends","__childs","__event","__link","__shows_included","__childs_included","__extends_included","description","text","font_path","font_size","red","green","blue","alpha","bold","italic","underline","deleteline","outline","x","y","x_type","x_value","y_type","y_value","width","height","width_type","width_value","height_type","height_value","scale_x","scale_y","center_x","center_y","angle","flip","hand_cursor","visible","disabled","left_size","right_size","top_size","bottom_size","texture_name","interval","play_loop_count","var_play","base_y","head_size","gap","up_size","down_size","cursor_red","cursor_green","cursor_blue","default_text_alpha","ims_padding","margin_left","margin_right","margin_top","margin_bottom","show_count","body_margin","screen_margin_left","screen_margin_right","screen_margin_top","screen_margin_bottom","start_degree","end_degree","line_spacing","max_line_count","font_red","font_green","font_blue","margin_halign","margin_valign","cursor_margin_up","cursor_margin_down","total_size","show_size","offset_rate","offset_step","grade","row_count","col_count","row_index","col_index","u1","v1","u2","v2","u3","v3","x1","y1","x2","y2","x3","y3","x_gap","y_gap","x_start_gap","y_start_gap","button_gap","button_start","button_margin","tab_index","view_margin","child_width_margin"],
type_list : ["List<string>","any","Map<string,any>","Map<string,any>","Map<string,ALittle.LoopGroupInfo>","string","string","string","List<ALittle.DisplayInfo>","List<ALittle.EventInfo>","string","bool","bool","bool","string","string","string","int","double","double","double","double","bool","bool","bool","bool","bool","double","double","int","double","int","double","double","double","int","double","int","double","double","double","double","double","double","int","bool","bool","bool","double","double","double","double","string","int","int","bool","double","double","double","double","double","double","double","double","double","double","double","double","double","double","int","double","double","double","double","double","double","double","double","int","double","double","double","double","double","double","double","double","double","double","double","int","int","int","int","int","double","double","double","double","double","double","double","double","double","double","double","double","double","double","double","double","double","double","double","double","double","double"],
option_map : {}
})
ALittle.RegStruct(1653869333, "ALittle.LoopGroupInfo", {
name : "ALittle.LoopGroupInfo", ns_name : "ALittle", rl_name : "LoopGroupInfo", hash_code : 1653869333,
name_list : ["childs"],
type_list : ["List<ALittle.LoopListInfo>"],
option_map : {}
})
ALittle.RegStruct(-1741432339, "ALittle.LoopListInfo", {
name : "ALittle.LoopListInfo", ns_name : "ALittle", rl_name : "LoopListInfo", hash_code : -1741432339,
name_list : ["link","attribute","init","childs"],
type_list : ["string","string","any","List<ALittle.LoopChildInfo>"],
option_map : {}
})
ALittle.RegStruct(-925381158, "ALittle.LoopChildInfo", {
name : "ALittle.LoopChildInfo", ns_name : "ALittle", rl_name : "LoopChildInfo", hash_code : -925381158,
name_list : ["clazz","target","total_time","delay_time"],
type_list : ["string","any","int","int"],
option_map : {}
})
ALittle.RegStruct(-2110455927, "ALittle.EventInfo", {
name : "ALittle.EventInfo", ns_name : "ALittle", rl_name : "EventInfo", hash_code : -2110455927,
name_list : ["type","func"],
type_list : ["string","string"],
option_map : {}
})

ALittleIDE.IDEUtility_CalcTextureName = function(info, map) {
	if (map === undefined) {
		map = {};
	}
	let ___OBJECT_1 = info;
	for (let k in ___OBJECT_1) {
		let v = ___OBJECT_1[k];
		if (v === undefined) continue;
		if (k === "texture_name") {
			map[v] = true;
		} else if (ALittle.String_Type(v) === "table") {
			ALittleIDE.IDEUtility_CalcTextureName(v, map);
		}
	}
	return map;
}

ALittleIDE.IDEUtility_GetExtends = function(info, map) {
	if (map === undefined) {
		map = {};
	}
	let ___OBJECT_2 = info;
	for (let k in ___OBJECT_2) {
		let v = ___OBJECT_2[k];
		if (v === undefined) continue;
		if (ALittle.String_Type(v) === "table") {
			ALittleIDE.IDEUtility_GetExtends(v, map);
		} else if (k === "__extends" || k === "__include") {
			map[v] = true;
		}
	}
	return map;
}

ALittleIDE.IDEUtility_HasTargetClass = function(info, name) {
	let target_class = info.__target_class;
	if (target_class !== undefined) {
		let str = ALittle.String_Join(target_class, ".");
		if (ALittle.String_Find(str, name) !== undefined) {
			return true;
		}
	}
	let ___OBJECT_3 = info;
	for (let k in ___OBJECT_3) {
		let v = ___OBJECT_3[k];
		if (v === undefined) continue;
		if (ALittle.String_Type(v) === "table") {
			if (ALittleIDE.IDEUtility_HasTargetClass(v, name)) {
				return true;
			}
		}
	}
	return false;
}

ALittleIDE.IDEUtility_HasEventCallback = function(info, name) {
	let event = info.__event;
	if (event !== undefined) {
		let content_list = [];
		let count = 0;
		let ___OBJECT_4 = event;
		for (let index = 1; index <= ___OBJECT_4.length; ++index) {
			let event_info = ___OBJECT_4[index - 1];
			if (event_info === undefined) break;
			let data_type = event_info.type + ":";
			let event_string = data_type + event_info.func;
			++ count;
			content_list[count - 1] = event_string;
		}
		let content = ALittle.String_Join(content_list, "\n");
		if (ALittle.String_Find(content, name) !== undefined) {
			return true;
		}
	}
	let ___OBJECT_5 = info;
	for (let k in ___OBJECT_5) {
		let v = ___OBJECT_5[k];
		if (v === undefined) continue;
		if (ALittle.String_Type(v) === "table") {
			if (ALittleIDE.IDEUtility_HasEventCallback(v, name)) {
				return true;
			}
		}
	}
	return false;
}

ALittleIDE.IDEUtility_CheckName = function(name) {
	let len = ALittle.String_Len(name);
	if (len === 0) {
		return [false, "命名只能支持字母数字下划线，不能以数字开头"];
	}
	for (let i = 1; i <= len; i += 1) {
		let byte = ALittle.String_Byte(name, i);
		let check_all = byte >= 65 && byte <= 90 || byte >= 97 && byte <= 122 || byte >= 48 && byte <= 57 || byte === 95;
		if (i === 1) {
			let check_first = byte >= 65 && byte <= 90 || byte >= 97 && byte <= 122 || byte === 95;
			if (check_first === false) {
				return [false, "命名只能支持字母数字，不能以数字开头"];
			}
		} else {
			if (check_all === false) {
				return [false, "命名只能支持字母数字，不能以数字开头"];
			}
		}
	}
	return [true, undefined];
}

ALittleIDE.IDEUtility_NewGiveBaseCase = function(info, object) {
	if (ALittleIDE.g_IDEEnum.text_type_display_map[info.__class]) {
		info.font_path = ALittleIDE.g_IDEProject.project.config.GetConfig("default_font_path", undefined);
		object.font_path = info.font_path;
		let size = ALittleIDE.g_IDEProject.project.config.GetConfig("default_font_size", 15);
		info.font_size = size;
		object.font_size = size;
		if (info.__class === "Text") {
			info.text = "123456789";
			object.text = "123456789";
			object.RejuseSize();
		} else {
			info.width_type = 4;
			object.width_type = 4;
			info.height_type = 4;
			object.height_type = 4;
		}
	} else {
		info.width_type = 4;
		object.width_type = 4;
		info.height_type = 4;
		object.height_type = 4;
	}
}

ALittleIDE.IDEUtility_DragAddGiveBaseCase = function(info) {
	if (ALittleIDE.g_IDEEnum.text_type_display_map[info.__class]) {
		info.font_path = ALittleIDE.g_IDEProject.project.config.GetConfig("default_font_path", undefined);
		let size = ALittleIDE.g_IDEProject.project.config.GetConfig("default_font_size", 15);
		info.font_size = size;
		if (info.__class !== "Text") {
			info.width_value = 100;
			info.height_value = 100;
		} else {
			info.text = "123456789";
		}
	} else {
		info.width_value = 100;
		info.height_value = 100;
	}
}

ALittleIDE.IDEUtility_GetBaseInfo = function(info) {
	let base = {};
	let ___OBJECT_6 = info;
	for (let k in ___OBJECT_6) {
		let v = ___OBJECT_6[k];
		if (v === undefined) continue;
		if (ALittle.String_Type(v) !== "table") {
			base[k] = v;
		} else if (ALittle.String_Type(v) === "table" && k !== "__childs") {
			base[k] = ALittle.String_CopyTable(v);
		}
	}
	let link = info.__link;
	if (link !== undefined) {
		base.__link = link;
	}
	let event = info.__event;
	if (event !== undefined) {
		base.__event = ALittle.String_CopyTable(event);
	}
	return base;
}

ALittleIDE.IDEUtility_GetDefaultInfo = function(info) {
	let default_v = {};
	if (info.__extends !== undefined) {
		default_v = ALittleIDE.IDEUtility_GetDefaultInfo(ALittleIDE.g_IDEProject.project.control_map[info.__extends].info);
		let ___OBJECT_7 = info;
		for (let k in ___OBJECT_7) {
			let v = ___OBJECT_7[k];
			if (v === undefined) continue;
			if (k !== "__extends") {
				default_v[k] = v;
			}
		}
	} else if (info.__include !== undefined) {
		default_v = ALittleIDE.IDEUtility_GetDefaultInfo(ALittleIDE.g_IDEProject.project.control_map[info.__include].info);
	} else if (info.__class !== undefined) {
		let class_default = ALittleIDE.g_IDEEnum.type_default_map[info.__class];
		default_v = {};
		let ___OBJECT_8 = class_default;
		for (let k in ___OBJECT_8) {
			let v = ___OBJECT_8[k];
			if (v === undefined) continue;
			if (ALittle.String_Type(v) !== "table") {
				default_v[k] = v;
			}
		}
		let ___OBJECT_9 = info;
		for (let k in ___OBJECT_9) {
			let v = ___OBJECT_9[k];
			if (v === undefined) continue;
			default_v[k] = v;
		}
	} else {
		ALittle.Log("error GetDefaultInfo: there have not extends, include, class");
	}
	return default_v;
}

ALittleIDE.IDEUtility_CreateTree = function(control, extends_v, object, child_type, tab_child, root) {
	let user_info = {};
	user_info.base = ALittleIDE.IDEUtility_GetBaseInfo(control);
	if (control.__extends !== undefined) {
		let control_info = ALittleIDE.g_IDEProject.project.control_map[control.__extends];
		if (control_info === undefined) {
			ALittleIDE.g_IDETool.ShowNotice("错误", "extends 的控件不存在:" + control.__extends);
		}
		user_info.default = ALittleIDE.IDEUtility_GetDefaultInfo(control_info.info);
	} else if (control.__include !== undefined) {
		let control_info = ALittleIDE.g_IDEProject.project.control_map[control.__include];
		if (control_info === undefined) {
			ALittleIDE.g_IDETool.ShowNotice("错误", "include 的控件不存在:" + control.__include);
		}
		user_info.default = ALittleIDE.IDEUtility_GetDefaultInfo(control_info.info);
	} else if (control.__class !== undefined) {
		user_info.default = ALittleIDE.g_IDEEnum.type_default_map[control.__class];
	} else {
		ALittle.Log("error CreateTree: there have no extends,include,class");
	}
	let nature_list = ALittleIDE.g_IDEEnum.nature_show_map[user_info.default.__class];
	if (nature_list !== undefined) {
		let ___OBJECT_10 = nature_list;
		for (let index = 1; index <= ___OBJECT_10.length; ++index) {
			let name = ___OBJECT_10[index - 1];
			if (name === undefined) break;
			if (control[name] !== undefined) {
				user_info.base[name] = ALittle.String_CopyTable(control[name]);
			}
		}
	}
	user_info.child_type = child_type;
	user_info.root = root;
	user_info.object = object;
	user_info.extends = extends_v;
	user_info.extends_root = control.__extends !== undefined;
	let tree_logic = undefined;
	if (ALittleIDE.g_IDEEnum.can_add_child_map[user_info.default.__class] || ALittleIDE.g_IDEEnum.child_show_map[user_info.default.__class] !== undefined) {
		tree_logic = ALittle.NewObject(ALittleIDE.IDETree, ALittleIDE.g_Control, user_info, tab_child);
	} else {
		tree_logic = ALittle.NewObject(ALittleIDE.IDETreeItem, ALittleIDE.g_Control, user_info, tab_child);
	}
	if (ALittleIDE.g_IDEEnum.can_add_child_map[user_info.default.__class] && object.childs !== undefined && ALittle.List_MaxN(object.childs) > 0) {
		if (control.__childs !== undefined && ALittle.List_MaxN(control.__childs) > 0) {
			let childs = control.__childs;
			let ___OBJECT_11 = childs;
			for (let k = 1; k <= ___OBJECT_11.length; ++k) {
				let v = ___OBJECT_11[k - 1];
				if (v === undefined) break;
				tree_logic.AddChild(ALittleIDE.IDEUtility_CreateTree(v, extends_v, object.childs[k - 1], "child", tab_child, false));
			}
		} else if (user_info.default.__childs !== undefined && ALittle.List_MaxN(user_info.default.__childs) > 0) {
			let childs = user_info.default.__childs;
			let ___OBJECT_12 = childs;
			for (let k = 1; k <= ___OBJECT_12.length; ++k) {
				let v = ___OBJECT_12[k - 1];
				if (v === undefined) break;
				tree_logic.AddChild(ALittleIDE.IDEUtility_CreateTree(v, true, object.childs[k - 1], "child", tab_child, false));
			}
		}
	}
	let show_list = ALittleIDE.g_IDEEnum.child_show_map[user_info.default.__class];
	if (show_list !== undefined) {
		let ___OBJECT_13 = show_list;
		for (let index = 1; index <= ___OBJECT_13.length; ++index) {
			let name = ___OBJECT_13[index - 1];
			if (name === undefined) break;
			if (object[name] !== undefined) {
				if (control[name] !== undefined) {
					tree_logic.AddChild(ALittleIDE.IDEUtility_CreateTree(control[name], extends_v, object[name], name, tab_child, false));
				} else if (user_info.default[name] !== undefined) {
					tree_logic.AddChild(ALittleIDE.IDEUtility_CreateTree(user_info.default[name], true, object[name], name, tab_child, false));
				}
			}
		}
	}
	tree_logic.UpdateDesc();
	return tree_logic;
}

ALittleIDE.IDEUtility_GenerateGrid9ImageInfo = function(base_path, image_path) {
	let surface = ALittle.System_LoadSurface(base_path + image_path);
	if (surface === undefined) {
		return undefined;
	}
	let width = ALittle.System_GetSurfaceWidth(surface);
	let height = ALittle.System_GetSurfaceHeight(surface);
	let helf_width = ALittle.Math_Floor(width / 2);
	let helf_height = ALittle.Math_Floor(height / 2);
	let left = ALittle.System_GetSurfaceGrid9(surface, "left");
	let right = ALittle.System_GetSurfaceGrid9(surface, "right");
	let top = ALittle.System_GetSurfaceGrid9(surface, "top");
	let bottom = ALittle.System_GetSurfaceGrid9(surface, "bottom");
	if (left === 0) {
		left = 1;
	} else if (left === helf_width) {
		left = left - 2;
	} else {
		left = left + 1;
	}
	if (right === width) {
		right = 1;
	} else if (right === helf_width) {
		right = right + 2;
	} else {
		right = width - right + 1;
	}
	if (top === 0) {
		top = 1;
	} else if (top === helf_height) {
		top = top - 2;
	} else {
		top = top + 1;
	}
	if (bottom === height) {
		bottom = 1;
	} else if (bottom === helf_height) {
		bottom = bottom + 2;
	} else {
		bottom = height - bottom + 1;
	}
	ALittle.System_FreeSurface(surface);
	let display_info = {};
	display_info.__class = "Grid9Image";
	display_info.texture_name = image_path;
	display_info.width_type = 1;
	display_info.width_value = width;
	display_info.height_type = 1;
	display_info.height_value = height;
	display_info.left_size = left;
	display_info.right_size = right;
	display_info.top_size = top;
	display_info.bottom_size = bottom;
	return display_info;
}

}