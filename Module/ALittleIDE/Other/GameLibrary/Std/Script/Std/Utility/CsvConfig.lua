-- ALittle Generate Lua And Do Not Edit This Line!
module("ALittle", package.seeall)

local ___rawset = rawset
local ___pairs = pairs
local ___ipairs = ipairs
local ___all_struct = GetAllStruct()

RegStruct(115253948, "ALittle.KeyValueInfo", {
name = "ALittle.KeyValueInfo", ns_name = "ALittle", rl_name = "KeyValueInfo", hash_code = 115253948,
name_list = {"key","value"},
type_list = {"string","string"},
option_map = {}
})

ICsvFile = Lua.Class(nil, "ALittle.ICsvFile")

function ICsvFile:Close()
end

function ICsvFile:ReadCell(row, col)
	return ""
end

function ICsvFile:GetRowCount()
	return 0
end

function ICsvFile:GetColCount()
	return 0
end

ICsvFileLoader = Lua.Class(nil, "ALittle.ICsvFileLoader")

function ICsvFileLoader:Start()
end

function ICsvFileLoader:SetPath(file_path, only_from_asset)
end

function ICsvFileLoader:GetPath()
	return nil
end

function ICsvFileLoader:GetID()
	return nil
end

CsvConfig = Lua.Class(nil, "ALittle.CsvConfig")

function CsvConfig:Load(file_path)
	local lua_file = Lua.LuaCsvFile()
	Lua.Assert(lua_file:Load(file_path), file_path .. " load failed!")
	self:Init(lua_file)
	Log(file_path .. " load succeed!")
end

function CsvConfig:Init(file)
end

assert(ALittle.CsvConfig, " extends class:ALittle.CsvConfig is nil")
KeyValueConfig = Lua.Class(ALittle.CsvConfig, "ALittle.KeyValueConfig")

function KeyValueConfig:Ctor()
	___rawset(self, "_data", {})
	___rawset(self, "_csv_info", CreateCsvInfo(self.__class.__element[1]))
end

function KeyValueConfig:Init(file)
	if file == nil then
		return
	end
	local reflt = self.__class.__element[1]
	local handle_map = {}
	for index, handle in ___ipairs(self._csv_info.handle) do
		handle_map[handle.var_name] = handle
	end
	local row_count = file:GetRowCount()
	local row = 1
	while true do
		if not(row <= row_count) then break end
		local key = file:ReadCell(row, 1)
		local value = file:ReadCell(row, 2)
		if key ~= nil and value ~= nil then
			local handle = handle_map[key]
			if handle ~= nil then
				local hvalue = handle.func(value, handle)
				if hvalue ~= nil then
					self._data[key] = hvalue
				else
					Error("key:" .. key .. " load failed!")
				end
			end
		end
		row = row+(1)
	end
	file:Close()
end

function KeyValueConfig:GetFieldNameList()
	local rflt = ___all_struct[115253948]
	return rflt.name_list
end

function KeyValueConfig:GetData()
	return self._data
end

assert(ALittle.CsvConfig, " extends class:ALittle.CsvConfig is nil")
CsvTableConfig = Lua.Class(ALittle.CsvConfig, "ALittle.CsvTableConfig")

function CsvTableConfig:Ctor()
	local error = nil
	error, self._csv_info = Lua.TCall(CreateCsvInfo, self.__class.__element[1])
	if error ~= nil then
		Error(error)
	end
	___rawset(self, "_col_map", {})
end

function CsvTableConfig:Init(file)
	if self._csv_file ~= nil then
		self._csv_file:Close()
	end
	self._csv_file = file
	if self._csv_file == nil then
		return
	end
	local rflt = self.__class.__element[1]
	local name_map = {}
	for index, name in ___ipairs(rflt.name_list) do
		name_map[name] = index
	end
	local i = 1
	while true do
		if not(i <= self._csv_file:GetColCount()) then break end
		local name = self._csv_file:ReadCell(1, i)
		local index = name_map[name]
		if index ~= nil then
			self._col_map[index] = i
		end
		i = i+(1)
	end
	self:onInit()
end

function CsvTableConfig:onInit()
end

function CsvTableConfig:LoadCell(row)
	local value = {}
	for index, handle in ___ipairs(self._csv_info.handle) do
		local real = self._col_map[index]
		if real == nil then
			value[handle.var_name] = handle.func("", handle)
		else
			local read = self._csv_file:ReadCell(row, real)
			if read == nil then
				value[handle.var_name] = handle.func("", handle)
			else
				value[handle.var_name] = handle.func(read, handle)
			end
		end
	end
	return value
end

assert(ALittle.CsvTableConfig, " extends class:ALittle.CsvTableConfig is nil")
SingleKeyTableConfig = Lua.Class(ALittle.CsvTableConfig, "ALittle.SingleKeyTableConfig")

function SingleKeyTableConfig:Ctor()
	___rawset(self, "_key_map", {})
	___rawset(self, "_cache_map", {})
end

function SingleKeyTableConfig:onInit()
	local rflt = self.__class.__element[1]
	local key_type = rflt.type_list[1]
	local key_index = self._col_map[1]
	local is_int = key_type == "int" or key_type == "long"
	local is_double = key_type == "double"
	local row_count = self._csv_file:GetRowCount()
	local row = 2
	while true do
		if not(row <= row_count) then break end
		local value = self._csv_file:ReadCell(row, key_index)
		if value ~= nil then
			if is_int then
				self._key_map[Math_ToInt(value)] = row
			elseif is_double then
				self._key_map[Math_ToDouble(value)] = row
			else
				self._key_map[value] = row
			end
		end
		row = row+(1)
	end
end

function SingleKeyTableConfig:GetData(key)
	if self._csv_file == nil then
		return nil
	end
	local value = self._cache_map[key]
	if value ~= nil then
		return value
	end
	local row = self._key_map[key]
	if row == nil then
		return nil
	end
	value = self:LoadCell(row)
	if value == nil then
		return nil
	end
	self._cache_map[key] = value
	return value
end

assert(ALittle.CsvTableConfig, " extends class:ALittle.CsvTableConfig is nil")
DoubleKeyTableConfig = Lua.Class(ALittle.CsvTableConfig, "ALittle.DoubleKeyTableConfig")

function DoubleKeyTableConfig:Ctor()
	___rawset(self, "_key_map", {})
	___rawset(self, "_cache_map", {})
end

function DoubleKeyTableConfig:onInit()
	local rflt = self.__class.__element[1]
	local first_key_type = rflt.type_list[1]
	local first_key_index = self._col_map[1]
	local first_is_int = first_key_type == "int" or first_key_type == "long"
	local first_is_double = first_key_type == "double"
	local second_key_type = rflt.type_list[2]
	local second_key_index = self._col_map[2]
	local second_is_int = second_key_type == "int" or second_key_type == "long"
	local second_is_double = second_key_type == "double"
	local row_count = self._csv_file:GetRowCount()
	local row = 2
	while true do
		if not(row <= row_count) then break end
		local tmp
		local value = self._csv_file:ReadCell(row, first_key_index)
		if value ~= nil then
			if first_is_int then
				tmp = self._key_map[Math_ToInt(value)]
				if tmp == nil then
					tmp = {}
					self._key_map[Math_ToInt(value)] = tmp
				end
			elseif first_is_double then
				tmp = self._key_map[Math_ToDouble(value)]
				if tmp == nil then
					tmp = {}
					self._key_map[Math_ToDouble(value)] = tmp
				end
			else
				tmp = self._key_map[value]
				if tmp == nil then
					tmp = {}
					self._key_map[value] = tmp
				end
			end
		end
		if tmp == nil then
			goto continue_1
		end
		value = self._csv_file:ReadCell(row, second_key_index)
		if value ~= nil then
			if second_is_int then
				tmp[Math_ToInt(value)] = row
			elseif second_is_double then
				tmp[Math_ToDouble(value)] = row
			else
				tmp[value] = row
			end
		end
		::continue_1::
		row = row+(1)
	end
end

function DoubleKeyTableConfig:GetData(first_key, second_key)
	if self._csv_file == nil then
		return nil
	end
	local value_map = self._cache_map[first_key]
	if value_map ~= nil then
		local value = value_map[second_key]
		if value ~= nil then
			return value
		end
	end
	local key_tmp = self._key_map[first_key]
	if key_tmp == nil then
		return nil
	end
	local row = key_tmp[second_key]
	if row == nil then
		return nil
	end
	local value = self:LoadCell(row)
	if value == nil then
		return nil
	end
	local tmp = self._cache_map[first_key]
	if tmp == nil then
		tmp = {}
		self._cache_map[first_key] = tmp
	end
	tmp[second_key] = value
	return value
end

