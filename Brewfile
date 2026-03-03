# Common to iMac and MacBook

# Formulae
brew "eza"
brew "fastfetch"
brew "ffmpeg"
brew "fish"
brew "fzf"
brew "gemini-cli"
brew "go"
brew "hugo"
brew "mactop"
brew "neovim"
brew "python@3.14"
brew "ruff"
brew "tectonic"
brew "uv"
brew "wget"
brew "container"
brew "mas"
brew "stow"
brew "texlab"
brew "gh"
brew "rust"
brew "typst"

# Casks
cask "affinity"
cask "bibdesk"
cask "brave-browser"
cask "calibre"
cask "claude"
cask "claude-code"
cask "find-any-file"
cask "ghostty"
cask "github"
cask "hammerspoon"
cask "iina"
cask "karabiner-elements"
cask "kindle-previewer"
cask "latest"
cask "mactex"
cask "markedit"
cask "onyx"
cask "rectangle-pro"
cask "sf-symbols"
cask "skim"
cask "texifier"
cask "homebrew/cask/transmission"
cask "zed"
cask "syncthing-app"
cask "lm-studio"

# Fonts
cask "font-jetbrains-mono-nerd-font"
cask "font-mona-sans"
cask "font-hubot-sans"

# Mac App Store
mas "Actions", id: 1586435171
mas "Amphetamine", id: 937984704
mas "Anycode", id: 1602100698
mas "Color Picker", id: 1545870783
mas "Developer", id: 640199958
mas "Finer", id: 6738301953
mas "Focus for YouTube", id: 1514703160
mas "Ghostery Privacy Ad Blocker", id: 6504861501
mas "Keynote", id: 361285480
mas "Numbers", id: 361304891
mas "Pages", id: 361309726
mas "Supernote Partner", id: 1494992020
mas "Surfshark", id: 1437809329
mas "Telegram", id: 747648890
mas "uBlock Origin Lite", id: 6745342698
mas "Unwatched", id: 6477287463
mas "WhatsApp", id: 310633997
mas "Xcode", id: 497799835

# Get hostname
hostname = `hostname -s`.strip

# Additional packages
case hostname
when "iMac"
  cask "openemu"
when "MacBook"
  cask "keyboardcleantool"
  cask "coconutbattery"
  cask "tailscale-app"
  mas "AdGuard Mini", id: 1440147259
end
