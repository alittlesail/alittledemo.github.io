
module("ALittle", package.seeall)

local ___pairs = pairs
local ___ipairs = ipairs


function BitAnd(x, y)
	return bit.band(x, y)
end

function BitOr(x, y)
	return bit.bor(x, y)
end

