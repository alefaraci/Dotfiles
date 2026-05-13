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
    -- hs.alert.show("Finder", 0.25)
end

-- Open or activate Finder
local function AppearanceSwitcher()
    local appleScript = [[
        tell application "System Events" to tell appearance preferences to set dark mode to not dark mode
    ]]
    hs.osascript.applescript(appleScript)
    -- hs.alert.show("Appearance Switched", 0.25)
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
hs.hotkey.bind(hyper, "z", function() openApp("/Applications/Zed.app") end)
hs.hotkey.bind(hyper, "c", function() openApp("/System/Applications/Calendar.app") end)
hs.hotkey.bind(hyper, "e", function() openApp("/System/Applications/Mail.app") end)
hs.hotkey.bind(hyper, "h", function() openApp("/Applications/GitHub Desktop.app") end)
hs.hotkey.bind(hyper, "m", function() openApp("/System/Applications/Music.app") end)
hs.hotkey.bind(hyper, "o", function() openApp("/Applications/Claude.app") end)
hs.hotkey.bind(hyper, "i", function() openApp("/Applications/Gemini.app") end)
hs.hotkey.bind(hyper, "s", function() openApp("/Applications/Safari.app") end)
hs.hotkey.bind(hyper, "t", function() openApp("/Applications/Telegram.app") end)
hs.hotkey.bind(hyper, "g", function() openApp("/Applications/Ghostty.app") end)
hs.hotkey.bind(hyper, "x", function() openApp("/Applications/Xcode.app") end)
hs.hotkey.bind(hyper, "n", function() openApp("/System/Applications/Notes.app") end)
hs.hotkey.bind(hyper, "a", function() openApp("/System/Applications/Preview.app") end)
hs.hotkey.bind(hyper, "p", function() openApp("/System/Applications/Reminders.app") end)
hs.hotkey.bind(hyper, "k", function() openApp("/Applications/Obsidian.app") end)
-- hs.hotkey.bind(hyper, "k", function() openApp("/Applications/MarkEdit.app") end)
-- hs.hotkey.bind(hyper, "b", function() openApp("/Applications/TeX/Bibdesk.app") end)
-- hs.hotkey.bind(hyper, "n", function() openApp("/Applications/Numbers.app") end)
-- hs.hotkey.bind(hyper, "x", function() openApp("/Applications/Texifier.app") end)
