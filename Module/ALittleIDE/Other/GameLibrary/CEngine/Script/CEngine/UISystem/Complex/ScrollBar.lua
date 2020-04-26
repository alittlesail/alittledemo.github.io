
module("ALittle", package.seeall)

local ___rawset = rawset
local ___pairs = pairs
local ___ipairs = ipairs
local ___all_struct = GetAllStruct()


assert(ALittle.Grid3, " extends class:ALittle.Grid3 is nil")
ScrollBar = Lua.Class(ALittle.Grid3, "ALittle.ScrollBar")

function ScrollBar:Ctor(ctrl_sys)
	___rawset(self, "_bar_container", DisplayGroup(self._ctrl_sys))
	self.show_center = self._bar_container
	___rawset(self, "_offset_step", 0)
	___rawset(self, "_offset_rate", 0)
	___rawset(self, "_show_size", 0)
	___rawset(self, "_center_size", 0)
	___rawset(self, "_logic_total_size", 0)
	___rawset(self, "_logic_show_size", 0)
	___rawset(self, "_drag_point_rate", 0)
	___rawset(self, "_pickup_rect", true)
	___rawset(self, "_pickup_child", true)
end

function ScrollBar.__setter:type(value)
	Grid3.__setter.type(self, value)
	self:UpdateShowSize()
	self:RejustBarButton()
end

function ScrollBar.__setter:up_size(value)
	Grid3.__setter.up_size(self, value)
	self:UpdateShowSize()
	self:RejustBarButton()
end

function ScrollBar.__setter:down_size(value)
	Grid3.__setter.down_size(self, value)
	self:UpdateShowSize()
	self:RejustBarButton()
end

function ScrollBar.__setter:gap(value)
	Grid3.__setter.gap(self, value)
	self:UpdateShowSize()
	self:RejustBarButton()
end

function ScrollBar.__setter:total_size(value)
	self._logic_total_size = value
	self:UpdateShowSize()
	self:RejustBarButton()
end

function ScrollBar.__getter:total_size()
	return self._logic_total_size
end

function ScrollBar.__setter:show_size(value)
	self._logic_show_size = value
	self:UpdateShowSize()
	self:RejustBarButton()
end

function ScrollBar.__getter:show_size()
	return self._logic_show_size
end

function ScrollBar.__setter:offset_rate(value)
	self._offset_rate = value
	if self._offset_rate < 0 then
		self._offset_rate = 0
	elseif self._offset_rate > 1 then
		self._offset_rate = 1
	end
	self:RejustBarButton()
end

function ScrollBar.__getter:offset_rate()
	return self._offset_rate
end

function ScrollBar.__setter:offset_step(value)
	self._offset_step = value
end

function ScrollBar.__getter:offset_step()
	return self._offset_step
end

function ScrollBar:UpdateShowSize()
	self._show_size = 0
	self._center_size = self.center_size
	if self._logic_show_size < self._logic_total_size then
		self._show_size = self._logic_show_size / self._logic_total_size * self._center_size
	end
end

function ScrollBar:SetToDown()
	self._offset_rate = 1
	self:RejustBarButton()
end

function ScrollBar.__setter:width(value)
	if self._width == value then
		return
	end
	Grid3.__setter.width(self, value)
	self:UpdateShowSize()
	self:RejustBarButton()
end

function ScrollBar.__setter:height(value)
	if self._height == value then
		return
	end
	Grid3.__setter.height(self, value)
	self:UpdateShowSize()
	self:RejustBarButton()
end

function ScrollBar.__setter:up_button(value)
	if self._up_button ~= nil then
		self._up_button:RemoveEventListener(___all_struct[-449066808], self, self.HandleUpButtonClick)
	end
	self._up_button = value
	self.show_up = value
	if value ~= nil then
		value:AddEventListener(___all_struct[-449066808], self, self.HandleUpButtonClick)
	end
end

function ScrollBar.__getter:up_button()
	return self._up_button
end

function ScrollBar:HandleUpButtonClick(event)
	self._offset_rate = self._offset_rate - self._offset_step
	if self._offset_rate < 0 then
		self._offset_rate = 0
	end
	if self._bar_button ~= nil then
		local offset = self._offset_rate * (self._center_size - self._show_size)
		if self._type == UIEnumTypes.TYPE_V then
			self._bar_button.y = offset
		else
			self._bar_button.x = offset
		end
	end
	self:DispatchEvent(___all_struct[958494922], {})
	self:DispatchEvent(___all_struct[1309977874], {})
end

function ScrollBar.__setter:down_button(value)
	if self._down_button ~= nil then
		self._down_button:RemoveEventListener(___all_struct[-449066808], self, self.HandleDownButtonClick)
	end
	self._down_button = value
	self.show_down = value
	if value ~= nil then
		value:AddEventListener(___all_struct[-449066808], self, self.HandleDownButtonClick)
	end
end

function ScrollBar.__getter:down_button()
	return self._down_button
end

function ScrollBar:HandleDownButtonClick(event)
	self._offset_rate = self._offset_rate + self._offset_step
	if self._offset_rate > 1 then
		self._offset_rate = 1
	end
	if self._bar_button ~= nil then
		local offset = self._offset_rate * (self._center_size - self._show_size)
		if self._type == UIEnumTypes.TYPE_V then
			self._bar_button.y = offset
		else
			self._bar_button.x = offset
		end
	end
	self:DispatchEvent(___all_struct[958494922], {})
	self:DispatchEvent(___all_struct[1309977874], {})
end

function ScrollBar.__setter:bar_button(value)
	if self._bar_button ~= nil then
		self._bar_button:RemoveEventListener(___all_struct[1337289812], self, self.HandleBarButtonDrag)
		self._bar_button:RemoveEventListener(___all_struct[1301789264], self, self.HandleBarButtonDragBegin)
		self._bar_button:RemoveEventListener(___all_struct[150587926], self, self.HandleBarButtonDragEnd)
		self._bar_button:RemoveEventListener(___all_struct[-1737121315], self, self.HandleBarButtonScroll)
		self._bar_container:RemoveChild(self._bar_button)
	end
	self._bar_button = value
	if value ~= nil then
		self._bar_container:AddChild(value)
		value:AddEventListener(___all_struct[1337289812], self, self.HandleBarButtonDrag)
		value:AddEventListener(___all_struct[1301789264], self, self.HandleBarButtonDragBegin)
		value:AddEventListener(___all_struct[150587926], self, self.HandleBarButtonDragEnd)
		value:AddEventListener(___all_struct[-1737121315], self, self.HandleBarButtonScroll)
	end
	self:RejustBarButton()
end

function ScrollBar.__getter:bar_button()
	return self._bar_button
end

function ScrollBar.__setter:bar_background(value)
	if self._bar_background ~= nil then
		self._bar_container:RemoveChild(self._bar_background)
	end
	self._bar_background = value
	if value ~= nil then
		self._bar_container:AddChild(value, 1)
	end
	self:RejustBarButton()
end

function ScrollBar.__getter:bar_background()
	return self._bar_background
end

function ScrollBar:HandleBarButtonDragBegin(event)
	if self._type == UIEnumTypes.TYPE_V then
		local height = self._bar_button.height
		self._drag_point_rate = 0
		if height > 0 then
			self._drag_point_rate = event.rel_y / height
		end
	else
		local width = self._bar_button.width
		self._drag_point_rate = 0
		if width > 0 then
			self._drag_point_rate = event.rel_x / width
		end
	end
end

function ScrollBar:HandleBarButtonScroll(event)
	if self._type == UIEnumTypes.TYPE_V then
		if event.delta_y > 0 then
			self:HandleUpButtonClick(nil)
		elseif event.delta_y < 0 then
			self:HandleDownButtonClick(nil)
		end
	else
		if event.delta_x > 0 then
			self:HandleUpButtonClick(nil)
		elseif event.delta_x < 0 then
			self:HandleDownButtonClick(nil)
		end
	end
end

function ScrollBar:HandleBarButtonDragEnd(event)
	self:DispatchEvent(___all_struct[1309977874], {})
end

function ScrollBar:HandleBarButtonDrag(event)
	local real_size = self._center_size - self._show_size
	if self._type == UIEnumTypes.TYPE_V then
		if (event.delta_y > 0 and event.rel_y < self._show_size * self._drag_point_rate) or (event.delta_y < 0 and event.rel_y > self._show_size * self._drag_point_rate) then
			return
		end
		local offset = (self._bar_button.y + event.delta_y) / real_size
		if offset > 1 then
			offset = 1
		elseif offset < 0 then
			offset = 0
		end
		if self._offset_rate == offset then
			return
		end
		self._offset_rate = offset
		self._bar_button.y = self._offset_rate * real_size
	else
		if (event.delta_x > 0 and event.rel_x < self._show_size * self._drag_point_rate) or (event.delta_x < 0 and event.rel_x > self._show_size * self._drag_point_rate) then
			return
		end
		local offset = (self._bar_button.x + event.delta_x) / real_size
		if offset > 1 then
			offset = 1
		elseif offset < 0 then
			offset = 0
		end
		if self._offset_rate == offset then
			return
		end
		self._offset_rate = offset
		self._bar_button.x = self._offset_rate * real_size
	end
	self:DispatchEvent(___all_struct[958494922], {})
end

function ScrollBar:RejustBarButton()
	local real_size = self._center_size - self._show_size
	if self._type == UIEnumTypes.TYPE_V then
		if self._bar_button ~= nil then
			self._bar_button.x = 0
			self._bar_button.width = self._width
			self._bar_button.y = self._offset_rate * real_size
			self._bar_button.height = self._show_size
		end
		if self._bar_background ~= nil then
			self._bar_background.x = 0
			self._bar_background.y = 0
			self._bar_background.width = self._width
			self._bar_background.height = self._center_size
		end
	else
		if self._bar_button ~= nil then
			self._bar_button.x = self._offset_rate * real_size
			self._bar_button.width = self._show_size
			self._bar_button.y = 0
			self._bar_button.height = self._height
		end
		if self._bar_background ~= nil then
			self._bar_background.x = 0
			self._bar_background.y = 0
			self._bar_background.width = self._center_size
			self._bar_background.height = self._height
		end
	end
end

