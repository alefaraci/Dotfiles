# Common to iMac and MacBook

# Tap
tap "abue-ammar/tinycast"

# Formulae
brew "eza"
brew "fastfetch"
brew "ffmpeg"
brew "fish"
brew "fzf"
brew "mactop"
brew "neovim"
brew "python@3.14"
brew "ruff"
brew "tectonic"
brew "uv"
brew "wget"
brew "mas"
brew "stow"
brew "texlab"
brew "gh"
brew "rust"
brew "typst"
brew "tinymist"
brew "typstyle"
brew "imagemagick"
brew "go"
brew "node"

# Casks
cask "affinity"
cask "bibdesk"
# cask "brave-browser"
cask "calibre"
cask "claude"
cask "claude-code"
cask "find-any-file"
cask "ghostty"
cask "google-chrome"
cask "github"
cask "hammerspoon"
cask "karabiner-elements"
cask "mactex"
cask "markedit"
cask "onyx"
cask "rectangle-pro"
cask "skim"
cask "texifier"
cask "homebrew/cask/transmission"
cask "zed"
cask "syncthing-app"
cask "tailscale-app"
cask "markdown-preview"
cask "openinterminal"
cask "abue-ammar/tinycast/tinycast"

# Fonts
cask "font-jetbrains-mono-nerd-font"
cask "font-mona-sans"
cask "font-hubot-sans"

# Mac App Store
mas "Actions", id: 1586435171
mas "Amphetamine", id: 937984704
mas "Color Picker", id: 1545870783
mas "Finer", id: 6738301953
mas "UnTrap for YouTube", id: 1637438059
mas "Ghostery Privacy Ad Blocker", id: 6504861501
mas "Keynote", id: 361285480
mas "Numbers", id: 361304891
mas "Pages", id: 361309726
mas "Surfshark", id: 1437809329
mas "Telegram", id: 747648890
mas "uBlock Origin Lite", id: 6745342698
mas "WhatsApp", id: 310633997
mas "Userscripts", id: 1463298887
mas "SponsorBlock for Safari", id: 1573461917

# Get hostname
hostname = `hostname -s`.strip

# Additional packages
case hostname
when "iMac"
  #
when "MacBook"
  cask "keyboardcleantool"
  cask "coconutbattery"
  cask "kindle-previewer"
  cask "monitorcontrol"
  mas "AdGuard Mini", id: 1440147259
  mas "Xcode", id: 497799835
end
