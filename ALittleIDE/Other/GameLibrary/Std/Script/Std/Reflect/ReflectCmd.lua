
module("ALittle", package.seeall)

local ___pairs = pairs
local ___ipairs = ipairs

RegStruct(2073949729, "ALittle.CmdCallbackInfo", {
name = "ALittle.CmdCallbackInfo", ns_name = "ALittle", rl_name = "CmdCallbackInfo", hash_code = 2073949729,
name_list = {"callback","var_list","name_list","desc"},
type_list = {"Functor<(...)>","List<string>","List<string>","string"},
option_map = {}
})

local __all_callback = {}
function RegCmdCallback(method, callback, var_list, name_list, desc)
	if __all_callback[method] ~= nil then
		Error("RegCmdCallback消息回调函数注册失败，名字为" .. method .. "已存在")
		return
	end
	local info = {}
	info.callback = callback
	info.var_list = var_list
	info.name_list = name_list
	if desc == nil then
		info.desc = ""
	else
		info.desc = desc
	end
	__all_callback[method] = info
end

function ExecuteCommand(cmd)
	if cmd == "" then
		Warn("命令行是空")
		return
	end
	local method = ""
	local param = ""
	local index = String_Find(cmd, " ")
	if index == nil then
		method = cmd
		param = ""
	else
		method = String_Sub(cmd, 1, index - 1)
		param = String_Sub(cmd, index + 1)
	end
	if String_Upper(method) == "HELP" then
		local method_list = {}
		for method_name, info in ___pairs(__all_callback) do
			List_Push(method_list, method_name)
		end
		List_Sort(method_list)
		local out_list = {}
		List_Push(out_list, "")
		List_Push(out_list, "help 打印当前模块支持的指令列表")
		for index, method_name in ___ipairs(method_list) do
			local info = __all_callback[method_name]
			local detail = method_name .. " "
			local param_list = {}
			for i, v in ___ipairs(info.var_list) do
				ALittle.List_Push(param_list, info.name_list[i] .. ":" .. v)
			end
			detail = method_name .. " " .. ALittle.String_Join(param_list, ", ") .. " " .. info.desc
			List_Push(out_list, detail)
		end
		Log(String_Join(out_list, "\n"))
		return
	end
	local info = __all_callback[method]
	if info == nil then
		Warn("未知指令:" .. cmd)
		return
	end
	local param_list = {}
	index = 1
	local in_quote = false
	local len = String_Len(param)
	local i = 1
	while i <= len do
		local byte = String_Byte(param, i)
		if byte == 32 then
			if in_quote then
				i = i + 1
			else
				if index == i then
					i = i + 1
					index = i
				else
					List_Push(param_list, String_Sub(param, index, i - 1))
					i = i + 1
					index = i
				end
			end
		elseif byte == 34 then
			if in_quote then
				in_quote = false
				if index == i then
					List_Push(param_list, "")
					i = i + 1
					index = i
				else
					List_Push(param_list, String_Sub(param, index, i - 1))
					i = i + 1
					index = i
				end
			else
				in_quote = true
				if index ~= i then
					List_Push(param_list, String_Sub(param, index, i - 1))
					i = i + 1
					index = i
				end
			end
		else
			i = i + 1
		end
	end
	if index ~= i then
		List_Push(param_list, String_Sub(param, index, i - 1))
		i = i + 1
		index = i
	end
	len = List_MaxN(param_list)
	local need_len = List_MaxN(info.var_list)
	if len ~= need_len then
		Warn("输入的参数数量" .. len .. "和指令要求" .. need_len .. "的不一致")
		return
	end
	local value_list = {}
	for ii, param in ___ipairs(param_list) do
		local var_type = info.var_list[ii]
		if var_type == "int" or var_type == "long" or var_type == "double" then
			value_list[ii] = Math_ToDouble(param_list[ii])
			if value_list[ii] == nil then
				Warn("输入的第" .. ii .. "个参数" .. param_list[ii] .. "转为" .. var_type .. "失败")
				return
			end
		elseif var_type == "string" then
			value_list[ii] = param_list[ii]
		elseif var_type == "bool" then
			if param_list[ii] == "true" then
				value_list[ii] = true
			elseif param_list[ii] == "false" then
				value_list[ii] = false
			else
				Warn("输入的第" .. ii .. "个参数" .. param_list[ii] .. "转为" .. var_type .. "失败")
				return
			end
		else
			Warn("输入的第" .. ii .. "个参数" .. param_list[ii] .. "转为" .. var_type .. "失败，支持基本变量类型")
			return
		end
	end
	info.callback(unpack(value_list, 1, len))
end

