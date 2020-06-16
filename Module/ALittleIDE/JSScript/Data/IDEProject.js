{
if (typeof ALittleIDE === "undefined") window.ALittleIDE = {};
let ___all_struct = ALittle.GetAllStruct();

ALittle.RegStruct(1715346212, "ALittle.Event", {
name : "ALittle.Event", ns_name : "ALittle", rl_name : "Event", hash_code : 1715346212,
name_list : ["target"],
type_list : ["ALittle.EventDispatcher"],
option_map : {}
})
ALittle.RegStruct(1910687721, "ALittleIDE.IDEProjectEvent", {
name : "ALittleIDE.IDEProjectEvent", ns_name : "ALittleIDE", rl_name : "IDEProjectEvent", hash_code : 1910687721,
name_list : ["target","name"],
type_list : ["ALittle.EventDispatcher","string"],
option_map : {}
})
ALittle.RegStruct(-975432877, "ALittleIDE.IDEProjectOpenEvent", {
name : "ALittleIDE.IDEProjectOpenEvent", ns_name : "ALittleIDE", rl_name : "IDEProjectOpenEvent", hash_code : -975432877,
name_list : ["target","name"],
type_list : ["ALittle.EventDispatcher","string"],
option_map : {}
})
ALittle.RegStruct(-685984390, "ALittleIDE.IDEProjectAddEvent", {
name : "ALittleIDE.IDEProjectAddEvent", ns_name : "ALittleIDE", rl_name : "IDEProjectAddEvent", hash_code : -685984390,
name_list : ["target","name"],
type_list : ["ALittle.EventDispatcher","string"],
option_map : {}
})
ALittle.RegStruct(-332308624, "ALittleIDE.IDEProjectCloseEvent", {
name : "ALittleIDE.IDEProjectCloseEvent", ns_name : "ALittleIDE", rl_name : "IDEProjectCloseEvent", hash_code : -332308624,
name_list : ["target","name"],
type_list : ["ALittle.EventDispatcher","string"],
option_map : {}
})
ALittle.RegStruct(-277092447, "ALittleIDE.IDEProjectRemoveEvent", {
name : "ALittleIDE.IDEProjectRemoveEvent", ns_name : "ALittleIDE", rl_name : "IDEProjectRemoveEvent", hash_code : -277092447,
name_list : ["target","name"],
type_list : ["ALittle.EventDispatcher","string"],
option_map : {}
})
ALittle.RegStruct(-93681239, "ALittleIDE.IDEProjectCreateControlEvent", {
name : "ALittleIDE.IDEProjectCreateControlEvent", ns_name : "ALittleIDE", rl_name : "IDEProjectCreateControlEvent", hash_code : -93681239,
name_list : ["target","name"],
type_list : ["ALittle.EventDispatcher","string"],
option_map : {}
})
ALittle.RegStruct(374071006, "ALittleIDE.IDEProjectChangeControlEvent", {
name : "ALittleIDE.IDEProjectChangeControlEvent", ns_name : "ALittleIDE", rl_name : "IDEProjectChangeControlEvent", hash_code : 374071006,
name_list : ["target","name"],
type_list : ["ALittle.EventDispatcher","string"],
option_map : {}
})
ALittle.RegStruct(934918978, "ALittleIDE.IDEProjectInfo", {
name : "ALittleIDE.IDEProjectInfo", ns_name : "ALittleIDE", rl_name : "IDEProjectInfo", hash_code : 934918978,
name_list : ["name","base_path","texture_path","save","control","config","ui"],
type_list : ["string","string","string","bool","ALittle.ControlSystem","ALittle.IJsonConfig","ALittleIDE.IDEUIManager"],
option_map : {}
})
ALittle.RegStruct(1787992834, "ALittleIDE.IDEProjectSettingChanged", {
name : "ALittleIDE.IDEProjectSettingChanged", ns_name : "ALittleIDE", rl_name : "IDEProjectSettingChanged", hash_code : 1787992834,
name_list : ["target","default_show_width","default_show_height","default_font_path","default_font_size"],
type_list : ["ALittle.EventDispatcher","double","double","string","int"],
option_map : {}
})
ALittle.RegStruct(1962591044, "ALittleIDE.IDEProjectDeleteControlEvent", {
name : "ALittleIDE.IDEProjectDeleteControlEvent", ns_name : "ALittleIDE", rl_name : "IDEProjectDeleteControlEvent", hash_code : 1962591044,
name_list : ["target","name"],
type_list : ["ALittle.EventDispatcher","string"],
option_map : {}
})

if (ALittle.EventDispatcher === undefined) throw new Error(" extends class:ALittle.EventDispatcher is undefined");
ALittleIDE.IDEProject = JavaScript.Class(ALittle.EventDispatcher, {
	AddProjectConfig : function(name) {
		let project_map = ALittleIDE.g_IDEConfig.GetConfig("project_map", {});
		if (project_map[name] === undefined) {
			project_map[name] = name;
			ALittleIDE.g_IDEConfig.SetConfig("project_map", project_map);
		}
	},
	RemoveProjectConfig : function(name) {
		let project_map = ALittleIDE.g_IDEConfig.GetConfig("project_map", {});
		if (project_map[name] === undefined) {
			return;
		}
		delete project_map[name];
		ALittleIDE.g_IDEConfig.SetConfig("project_map", project_map);
	},
	NewProject : function(name, window_width, window_height, font_path, font_size) {
		ALittle.File_MakeDeepDir(ALittle.File_BaseFilePath() + "Module/" + name);
		ALittle.File_MakeDir(ALittle.File_BaseFilePath() + "Module/" + name + "/Texture");
		ALittle.File_MakeDir(ALittle.File_BaseFilePath() + "Module/" + name + "/Texture/" + name);
		ALittle.File_MakeDir(ALittle.File_BaseFilePath() + "Module/" + name + "/Font");
		ALittle.File_MakeDir(ALittle.File_BaseFilePath() + "Module/" + name + "/Sound");
		ALittle.File_MakeDir(ALittle.File_BaseFilePath() + "Module/" + name + "/Other");
		ALittle.File_MakeDir(ALittle.File_BaseFilePath() + "Module/" + name + "/JSScript");
		ALittle.File_MakeDir(ALittle.File_BaseFilePath() + "Module/" + name + "/Script");
		ALittle.File_MakeDir(ALittle.File_BaseFilePath() + "Module/" + name + "/UI");
		ALittle.File_MakeDir(ALittle.File_BaseFilePath() + "Module/" + name + "/Icon");
		let base_path = ALittle.File_BaseFilePath() + "Module/ALittleIDE/Other/GameTemplate";
		let target_path = ALittle.File_BaseFilePath() + "Module/" + name + "/";
		let file_map = ALittle.File_GetFileAttrByDir(base_path);
		let ___OBJECT_1 = file_map;
		for (let file_path in ___OBJECT_1) {
			let attr = ___OBJECT_1[file_path];
			if (attr === undefined) continue;
			let rel_path = ALittle.String_Sub(file_path, ALittle.String_Len(base_path) + 1);
			let full_path = target_path + rel_path;
			full_path = ALittle.String_Replace(full_path, "abcd@module_name@abcd", name);
			full_path = ALittle.String_Replace(full_path, "abcd@upper_module_name@abcd", ALittle.String_Upper(name));
			full_path = ALittle.String_Replace(full_path, "abcd@lower_module_name@abcd", ALittle.String_Lower(name));
			ALittle.File_MakeDeepDir(ALittle.File_GetFilePathByPath(full_path));
			let ext = ALittle.String_Upper(ALittle.File_GetFileExtByPath(file_path));
			if (ext === "JSON" || ext === "LUA" || ext === "CFG" || ext === "TXT" || ext === "ALITTLE" || ext === "XML" || ext === "NAME" || ext === "SLN" || ext === "VCXPROJ" || ext === "FILTERS" || ext === "USER") {
				let content = ALittle.File_ReadTextFromFile(file_path);
				if (content !== undefined) {
					content = ALittle.String_Replace(content, "abcd@module_name@abcd", name);
					content = ALittle.String_Replace(content, "abcd@upper_module_name@abcd", ALittle.String_Upper(name));
					content = ALittle.String_Replace(content, "abcd@lower_module_name@abcd", ALittle.String_Lower(name));
					content = ALittle.String_Replace(content, "abcd@view_width@abcd", "" + window_width);
					content = ALittle.String_Replace(content, "abcd@view_height@abcd", "" + window_height);
					content = ALittle.String_Replace(content, "abcd@font_path@abcd", font_path);
					ALittle.File_WriteTextToFile(content, full_path);
				}
			} else {
				ALittle.File_CopyFile(file_path, full_path);
			}
		}
		ALittle.File_CopyFile("Export/Icon/install.ico", ALittle.File_BaseFilePath() + "Module/" + name + "/Icon/install.ico");
		ALittle.File_CopyFile("Export/Icon/install.png", ALittle.File_BaseFilePath() + "Module/" + name + "/Icon/install.png");
		let config = ALittle.CreateConfigSystem("Module/" + name + "/ALittleIDE.cfg");
		config.SetConfig("default_show_width", window_width, true);
		config.SetConfig("default_show_height", window_height, true);
		config.SetConfig("default_font_path", font_path, true);
		config.SetConfig("default_font_size", font_size, true);
		config.SaveConfig();
		this.AddProjectConfig(name);
		let event = {};
		event.name = name;
		this.DispatchEvent(___all_struct.get(-685984390), event);
		return true;
	},
	OpenProject : function(name) {
		if (name === "" || name === undefined) {
			return "请输入项目名";
		}
		if (ALittle.File_GetFileAttr(ALittle.File_BaseFilePath() + "Module/" + name) === undefined) {
			return "项目不存在:" + name;
		}
		this.CloseProject();
		this.AddProjectConfig(name);
		this._project = {};
		this._project.name = name;
		this._project.base_path = ALittle.File_BaseFilePath() + "Module/" + name + "/";
		this._project.texture_path = this._project.base_path + "Texture";
		this._project.save = true;
		this._project.control = ALittle.NewObject(ALittle.ControlSystem, name);
		this._project.control.log_error = false;
		this._project.control.cache_texture = false;
		this._project.control.use_plugin_class = false;
		this._project.config = ALittle.CreateConfigSystem("Module/" + name + "/ALittleIDE.cfg");
		this._project.ui = ALittle.NewObject(ALittleIDE.IDEUIManager, name, this._project.control);
		ALittleIDE.g_IDEConfig.SetConfig("last_project", name);
		let e = {};
		e.name = name;
		this.DispatchEvent(___all_struct.get(-975432877), e);
		return undefined;
	},
	OpenLastProject : function() {
		let name = ALittleIDE.g_IDEConfig.GetString("last_project", undefined);
		if (name === undefined) {
			return;
		}
		this.OpenProject(name);
	},
	CloseProject : function() {
		if (this._project === undefined) {
			return "当前没有项目";
		}
		let e = {};
		e.name = this._project.name;
		this.DispatchEvent(___all_struct.get(-332308624), e);
		this._project = undefined;
		return undefined;
	},
	RemoveProject : function(name) {
		if (this._project !== undefined && this._project.name === name) {
			return "请先关闭项目，再移除";
		}
		this.RemoveProjectConfig(name);
		let project_name = ALittleIDE.g_IDEConfig.GetConfig("last_project", "");
		if (project_name === name) {
			ALittleIDE.g_IDEConfig.SetConfig("last_project", "");
		}
		let event = {};
		event.name = name;
		this.DispatchEvent(___all_struct.get(-277092447), event);
		return undefined;
	},
	RunProject : function() {
		if (this._project === undefined) {
			g_AUITool.ShowNotice("提示", "当前没有打开的项目");
			return;
		}
		g_AUITool.ShowAlertDialog("提示", "JavaScript不支持运行项目");
	},
	get project() {
		return this._project;
	},
}, "ALittleIDE.IDEProject");

ALittleIDE.g_IDEProject = ALittle.NewObject(ALittleIDE.IDEProject);
}