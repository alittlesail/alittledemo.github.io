-- ALittle Generate Lua And Do Not Edit This Line!
module("ALittle", package.seeall)

local ___rawset = rawset
local ___pairs = pairs
local ___ipairs = ipairs


assert(ALittle.IMsgCommonTemplate, " extends class:ALittle.IMsgCommonTemplate is nil")
MsgReceiverTemplate = Lua.Class(ALittle.IMsgCommonTemplate, "ALittle.MsgReceiverTemplate")

function MsgReceiverTemplate:Ctor(client_id, remote_ip, remote_port)
	___rawset(self, "_interface", self.__class.__element[1]())
	self._interface:SetID(client_id)
	___rawset(self, "_write_factory", self.__class.__element[2]())
	___rawset(self, "_is_connected", true)
	___rawset(self, "_client_id", client_id)
	___rawset(self, "_remote_ip", remote_ip)
	___rawset(self, "_remote_port", remote_port)
	___rawset(self, "_client_account_id", 0)
	___rawset(self, "_client_logining", false)
	___rawset(self, "_web_account_id", "")
	___rawset(self, "_web_is_logining", false)
end

function MsgReceiverTemplate.__getter:remote_ip()
	return self._remote_ip
end

function MsgReceiverTemplate.__getter:remote_port()
	return self._remote_port
end

function MsgReceiverTemplate:IsConnected()
	return self._is_connected
end

function MsgReceiverTemplate:HandleConnected()
	self._is_connected = true
end

function MsgReceiverTemplate:HandleDisconnected()
	self._is_connected = false
	self:ClearRPC("连接断开了")
end

function MsgReceiverTemplate:Close(reason)
	if not self._is_connected then
		return
	end
	self._is_connected = false
	if reason == nil then
		reason = "主动关闭连接"
	end
	self:ClearRPC(reason)
	self._interface:Close()
end

