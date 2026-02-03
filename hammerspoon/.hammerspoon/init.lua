-- Hammerspoon configuration file

---@diagnostic disable: undefined-global

-- Open or activate Finder
local function openOrActivateFinder()
    local appleScript = [[
        tell application "Finder"
            if windows is not {} then
                activate
            else
                open home
                activate
            end if
        end tell
    ]]
    hs.osascript.applescript(appleScript)
    hs.alert.show("Finder", 0.25)
end

-- Open or activate Finder
local function AppearanceSwitcher()
    local appleScript = [[
        tell application "System Events" to tell appearance preferences to set dark mode to not dark mode
    ]]
    hs.osascript.applescript(appleScript)
    hs.alert.show("Appearance Switched", 0.25)
end

-- Open application at given path, optionally showing an alert with given text
local function openApp(path, alertText)
    hs.execute("open '" .. path .. "'")
    if alertText then
        hs.alert.show(alertText, 0.25)
    end
end

-- Define hyper key combination
local hyper = { 'cmd', 'alt', 'ctrl', 'shift' }

-- Reload hammerspoon configs
hs.hotkey.bind(hyper, "\\", function() hs.reload() end)
-- Open Finder
hs.hotkey.bind(hyper, "f", openOrActivateFinder)
-- Switch Appearance
hs.hotkey.bind({ 'cmd', 'alt', 'ctrl' }, "d", AppearanceSwitcher)
-- Applications
hs.hotkey.bind(hyper, "z", function() openApp("/Applications/Zed.app", "Zed") end)
hs.hotkey.bind(hyper, "c", function() openApp("/System/Applications/Calendar.app", "Calendar") end)
hs.hotkey.bind(hyper, "e", function() openApp("/System/Applications/Mail.app", "Mail") end)
hs.hotkey.bind(hyper, "h", function() openApp("/Applications/GitHub Desktop.app", "GitHub") end)
hs.hotkey.bind(hyper, "m", function() openApp("/System/Applications/Music.app", "Music") end)
hs.hotkey.bind(hyper, "o", function() openApp("/Applications/Claude.app", "Claude") end)
hs.hotkey.bind(hyper, "i", function() openApp("/Users/alessiofaraci/Applications/Gemini.app") end)
hs.hotkey.bind(hyper, "s", function() openApp("/Applications/Safari.app", "Safari") end)
hs.hotkey.bind(hyper, "t", function() openApp("/Applications/Telegram.app", "Telegram") end)
hs.hotkey.bind(hyper, "g", function() openApp("/Applications/Ghostty.app", "Ghostty") end)
hs.hotkey.bind(hyper, "x", function() openApp("/Applications/Xcode.app", "Xcode") end)
-- hs.hotkey.bind(hyper, "a", function() openApp("/System/Applications/Preview.app", "Preview") end)
-- hs.hotkey.bind(hyper, "b", function() openApp("/Applications/TeX/Bibdesk.app") end)
-- hs.hotkey.bind(hyper, "n", function() openApp("/System/Applications/Notes.app") end)
-- hs.hotkey.bind(hyper, "n", function() openApp("/Applications/Numbers.app") end)
-- hs.hotkey.bind(hyper, "k", function() openApp("/Applications/Skim.app") end)
-- hs.hotkey.bind(hyper, "x", function() openApp("/Applications/Texifier.app") end)
