-- Hammerspoon configuration file

---@diagnostic disable: undefined-global

-- Open or activate Finder to a specific folder / home directory
local function openOrActivateFinder()
    local appleScript = [[
        tell application "Finder"
            if windows is not {} then
                activate
            else
                -- open (POSIX file "/Users/alessiofaraci/Library/Mobile Documents/com~apple~CloudDocs/Brain")
                open home
                activate
            end if
        end tell
    ]]
    hs.osascript.applescript(appleScript)
end

-- Open folder path in Rex Beta from Finder
local function openInRexBeta()
    local appleScript = [[
        tell application "Finder"
            set currentFolder to (target of front window) as alias
        end tell
        tell application "/Applications/Rex Beta.app"
            open currentFolder
            activate
        end tell
    ]]
    hs.osascript.applescript(appleScript)
end


-- Open folder path in Zed from Finder
local function openInZed()
    local appleScript = [[
        tell application "Finder"
            set currentPath to POSIX path of (target of front window as alias)
        end tell

        do shell script "open -a Zed " & quoted form of currentPath
    ]]
    hs.osascript.applescript(appleScript)
end

-- Open or activate Finder
local function AppearanceSwitcher()
    local appleScript = [[
        tell application "System Events" to tell appearance preferences to set dark mode to not dark mode
    ]]
    hs.osascript.applescript(appleScript)
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
-- Open directory in Rex
hs.hotkey.bind({ 'cmd', 'alt', 'ctrl' }, "r", openInRexBeta)
-- Open directory in Zed
hs.hotkey.bind({ 'cmd', 'alt', 'ctrl' }, "z", openInZed)
-- Switch Appearance
hs.hotkey.bind({ 'cmd', 'alt', 'ctrl' }, "d", AppearanceSwitcher)
-- Applications
hs.hotkey.bind(hyper, "z", function() openApp("/Applications/Zed.app") end)
hs.hotkey.bind(hyper, "c", function() openApp("/System/Applications/Calendar.app") end)
hs.hotkey.bind(hyper, "e", function() openApp("/System/Applications/Mail.app") end)
hs.hotkey.bind(hyper, "g", function() openApp("/Applications/GitHub Desktop.app") end)
hs.hotkey.bind(hyper, "k", function() openApp("/Applications/Markdown Preview.app") end)
hs.hotkey.bind(hyper, "m", function() openApp("/System/Applications/Music.app") end)
hs.hotkey.bind(hyper, "o", function() openApp("/Applications/Claude.app") end)
hs.hotkey.bind(hyper, "s", function() openApp("/Applications/Safari.app") end)
hs.hotkey.bind(hyper, "t", function() openApp("/Applications/Telegram.app") end)
hs.hotkey.bind(hyper, "r", function() openApp("/Applications/Rex Beta.app") end)
hs.hotkey.bind(hyper, "x", function() openApp("/Applications/Xcode.app") end)
hs.hotkey.bind(hyper, "n", function() openApp("/System/Applications/Notes.app") end)
hs.hotkey.bind(hyper, "a", function() openApp("/System/Applications/Preview.app") end)
hs.hotkey.bind(hyper, "w", function() openApp("/System/Applications/Messages.app") end)
hs.hotkey.bind(hyper, "p", function() openApp("/System/Applications/Reminders.app") end)
