-- ALittle Generate Lua And Do Not Edit This Line!
module("ALittle", package.seeall)

local ___pairs = pairs
local ___ipairs = ipairs


function System_CalcPortrait(src_width, src_height, flag)
	local scale = 1.0
	local platform = System_GetPlatform()
	if platform == "iOS" or platform == "Android" then
		local screen_width = System_GetScreenWidth()
		local screen_height = System_GetScreenHeight()
		src_height = Math_Floor(screen_height / screen_width * src_width)
		flag = BitOr(flag, UIEnumTypes.VIEW_FULLSCREEN)
	elseif platform == "Web" then
		if BitAnd(flag, UIEnumTypes.VIEW_RESIZABLE) > 0 then
			src_width = System_GetScreenWidth()
			src_height = System_GetScreenHeight()
		else
			scale = System_GetScreenHeight() / src_height
		end
	elseif platform == "WeChat" then
		local screen_width = System_GetScreenWidth()
		local screen_height = System_GetScreenHeight()
		src_height = Math_Floor(screen_height / screen_width * src_width)
		scale = screen_width / src_width
	elseif platform == "Windows" then
		if src_height > System_GetScreenHeight() then
			scale = 0.5
		end
	end
	return src_width, src_height, flag, scale
end

function System_CalcLandscape(src_width, src_height, flag)
	local scale = 1.0
	local platform = System_GetPlatform()
	if platform == "iOS" or platform == "Android" then
		local screen_width = System_GetScreenWidth()
		local screen_height = System_GetScreenHeight()
		src_width = Math_Floor(screen_width / screen_height * src_height)
		flag = BitOr(flag, UIEnumTypes.VIEW_FULLSCREEN)
	elseif platform == "Web" then
		if BitAnd(flag, UIEnumTypes.VIEW_RESIZABLE) > 0 then
			src_width = System_GetScreenWidth()
			src_height = System_GetScreenHeight()
		else
			scale = System_GetScreenWidth() / src_width
		end
	elseif platform == "WeChat" then
		local screen_width = System_GetScreenWidth()
		local screen_height = System_GetScreenHeight()
		src_width = Math_Floor(screen_width / screen_height * src_height)
		scale = screen_height / src_height
	elseif platform == "Windows" then
		if src_width > System_GetScreenWidth() then
			scale = 0.5
		end
	end
	ALittle.Log(src_width, src_height, flag, scale)
	return src_width, src_height, flag, scale
end

function System_GetPlatform()
	return __CPPAPI_GetPlatform()
end

function System_GetDeviceID()
	return __CPPAPI_GetDeviceID()
end

function System_GetLocalIPList()
	return __CPPAPI_GetLocalIPList()
end

function System_IsPhone()
	local platform = __CPPAPI_GetPlatform()
	return platform ~= "Windows" and platform ~= "Emscripten"
end

function System_InstallProgram(file_path)
	__CPPAPI_InstallProgram(file_path)
end

function System_ClearAIFamily()
	__CPPAPI_ClearAIFamily()
end

function System_StartProgram(package_name)
	__CPPAPI_StartProgram(package_name)
end

function System_BackProgram()
	__CPPAPI_BackProgram()
end

function System_GetScreenWidth()
	return __CPPAPI_GetScreenWidth()
end

function System_GetScreenHeight()
	return __CPPAPI_GetScreenHeight()
end

function System_GetStatusBarHeight()
	return __CPPAPI_GetStatusBarHeight()
end

function System_ForceExit()
	__CPPAPI_ScheduleSystem:ForceExit()
end

function System_Exit()
	__CPPAPI_ScheduleSystem:Exit()
end

function System_Restart()
	__CPPAPI_ScheduleSystem:Restart()
end

function System_SetFPS(fps)
	__CPPAPI_ScheduleSystem:SetFPS(fps)
end

function System_SetAppPauseInterval(interval)
	__CPPAPI_ScheduleSystem:SetAppPauseInterval(interval)
end

function System_GetAppPauseInterval()
	return __CPPAPI_ScheduleSystem:GetAppPauseInterval()
end

SystemThreadType = {
	FAST = 0,
	MIDDLE = 1,
	SLOW = 2,
}

function System_SetThreadCount(count, thread_type)
	if thread_type == nil then
		thread_type = SystemThreadType.SLOW
	end
	__CPPAPI_ThreadSystem:SetThreadCount(count, thread_type)
end

function System_GetThreadCount(thread_type)
	if thread_type == nil then
		thread_type = SystemThreadType.SLOW
	end
	return __CPPAPI_ThreadSystem:GetThreadCount(thread_type)
end

function System_GetIMESelectList()
	return __CPPAPI_GetIMESelectList()
end

function System_SetIMEPos(x, y)
	__CPPAPI_SetIMSPos(x, y)
end

function System_SetIMERect(x, y, w, h)
	__CPPAPI_SetIMSRect(x, y, w, h)
end

function System_OpenIME()
	__CPPAPI_OpenIME()
end

function System_CloseIME()
	__CPPAPI_CloseIME()
end

function System_GetCursorX()
	return __CPPAPI_GetCursorX()
end

function System_GetCursorY()
	return __CPPAPI_GetCursorY()
end

function System_SetEditCursor()
	__CPPAPI_SetEditCursor()
end

function System_SetNormalCursor()
	__CPPAPI_SetNormalCursor()
end

function System_SetHandCursor()
	__CPPAPI_SetHandCursor()
end

function System_SetHDragCursor()
	__CPPAPI_SetHDragCursor()
end

function System_SetVDragCursor()
	__CPPAPI_SetVDragCursor()
end

function System_SetHVDragCursor()
	__CPPAPI_SetHVDragCursor()
end

function System_SetHV2DragCursor()
	__CPPAPI_SetHV2DragCursor()
end

function System_SetCrossDragCursor()
	__CPPAPI_SetCrossDragCursor()
end

function System_CreateView(title, width, height, flag, scale)
	return __CPPAPI_RenderSystem:CreateView(title, width, height, flag, scale)
end

function System_SetViewTitle(title)
	return __CPPAPI_RenderSystem:SetViewTitle(title)
end

function System_SetViewIcon(path)
	return __CPPAPI_RenderSystem:SetViewIcon(path)
end

function System_SetViewShape(path)
	return __CPPAPI_RenderSystem:SetViewShape(path)
end

function System_SetViewSize(width, height)
	__CPPAPI_RenderSystem:SetViewSize(width, height)
end

function System_SetMaxViewSize()
	__CPPAPI_RenderSystem:SetMaxViewSize()
end

function System_SetMinViewSize()
	__CPPAPI_RenderSystem:SetMinViewSize()
end

function System_SetRestoreViewSize()
	__CPPAPI_RenderSystem:SetRestoreViewSize()
end

function System_RaiseView()
	__CPPAPI_RenderSystem:RaiseView()
end

function System_ShowView()
	__CPPAPI_RenderSystem:ShowView()
end

function System_HideView()
	__CPPAPI_RenderSystem:HideView()
end

function System_GetViewX()
	return __CPPAPI_RenderSystem:GetViewX()
end

function System_GetViewY()
	return __CPPAPI_RenderSystem:GetViewY()
end

function System_SetViewPosition(x, y)
	__CPPAPI_RenderSystem:SetViewPosition(x, y)
end

function System_GetMaxTextureWidth()
	return __CPPAPI_RenderSystem:GetMaxTextureWidth()
end

function System_GetMaxTextureHeight()
	return __CPPAPI_RenderSystem:GetMaxTextureHeight()
end

function System_Render()
	return __CPPAPI_RenderSystem:Render()
end

function System_GetClipboardText()
	return __CPPAPI_GetClipboardText()
end

function System_SetClipboardText(content)
	__CPPAPI_SetClipboardText(content)
end

function System_HasClipboardText()
	return __CPPAPI_HasClipboardText()
end

function System_GetClipboardImage()
	return __CPPAPI_GetClipboardImage()
end

function System_SetClipboardImage(surface)
	__CPPAPI_SetClipboardImage(surface)
end

function System_HasClipboardImage()
	return __CPPAPI_HasClipboardImage()
end

SystemOrientationType = {
	SDL_ORIENTATION_UNKNOWN = 0,
	SDL_ORIENTATION_LANDSCAPE = 1,
	SDL_ORIENTATION_LANDSCAPE_FLIPPED = 2,
	SDL_ORIENTATION_PORTRAIT = 3,
	SDL_ORIENTATION_PORTRAIT_FLIPPED = 4,
}

function System_GetDisplayOrientation()
	return __CPPAPI_GetDisplayOrientation()
end

function System_EnableScreenSaver()
	__CPPAPI_EnableScreenSaver()
end

function System_DisableScreenSaver()
	__CPPAPI_DisableScreenSaver()
end

function System_OpenUrlBySystemBrowser(url)
	__CPPAPI_OpenUrlBySystemBrowser(url)
end

function System_Alert(msg)
	__CPPAPI_Alert(msg)
end

function System_LoadSurface(path)
	return __CPPAPI_LoadSurface(path)
end

function System_CreateSurface(width, height)
	return __CPPAPI_CreateSurface(width, height)
end

function System_SaveSurface(surface, path)
	return __CPPAPI_SaveSurface(surface, path)
end

function System_FreeSurface(surface)
	__CPPAPI_FreeSurface(surface)
end

function System_GetSurfaceWidth(surface)
	return __CPPAPI_GetSurfaceWidth(surface)
end

function System_GetSurfaceHeight(surface)
	return __CPPAPI_GetSurfaceHeight(surface)
end

function System_CutBlitSurface(new_surface, surface, to, from)
	return __CPPAPI_CutBlitSurface(new_surface, surface, to, from)
end

function System_SetSurfacePixel(surface, x, y, color)
	return __CPPAPI_SetSurfacePixel(surface, x, y, color)
end

function System_GetSurfacePixel(surface, x, y)
	return __CPPAPI_GetSurfacePixel(surface, x, y)
end

function System_GetPixelAlpha(color)
	return __CPPAPI_GetPixelAlpha(color)
end

function System_SetPixelAlpha(color, alpha)
	return __CPPAPI_SetPixelAlpha(color, alpha)
end

function System_GetSurfaceGrid9(surface, type)
	return __CPPAPI_GetSurfaceGrid9(surface, type)
end

function CreateMsgSender(heartbeat, check_heartbeat, callback)
	return Lua.Template(MsgSenderTemplate, "ALittle.MsgSenderTemplate<lua.__CPPAPIMsgInterface, lua.__CPPAPIMessageWriteFactory>", __CPPAPIMsgInterface, __CPPAPIMessageWriteFactory)(heartbeat, check_heartbeat, A_LuaLoopSystem, callback)
end

function CreateHttpSender(ip, port)
	return Lua.Template(HttpSenderTemplate, "ALittle.HttpSenderTemplate<lua.__CPPAPIHttpInterface>", __CPPAPIHttpInterface)(ip, port)
end

function HttpRequest(ip, port, method)
	local ___COROUTINE = coroutine.running()
	local sender = CreateHttpSender(ip, port)
	if ___COROUTINE == nil then
		return "当前不是协程", nil
	end
	sender:SendRPC(___COROUTINE, method, nil)
	return coroutine.yield()
end

function CreateHttpFileSender(ip, port, file_path, start_size, callback)
	return Lua.Template(HttpFileSenderTemplate, "ALittle.HttpFileSenderTemplate<lua.__CPPAPIHttpFileInterface>", __CPPAPIHttpFileInterface)(ip, port, file_path, start_size, callback)
end

function HttpDownloadRequest(ip, port, file_path, method, callback)
	local ___COROUTINE = coroutine.running()
	local sender = CreateHttpFileSender(ip, port, file_path, 0, callback)
	if ___COROUTINE == nil then
		return "当前不是协程"
	end
	sender:SendDownloadRPC(___COROUTINE, method, nil)
	return coroutine.yield()
end

