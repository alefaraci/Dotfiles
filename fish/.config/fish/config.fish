# Initialize Homebrew
eval (/opt/homebrew/bin/brew shellenv)

# Set the default editor to zed
set -gx EDITOR zed

# Abbreviations
abbr -a ls "eza --hyperlink --icons=always"
abbr -a lsa "eza -a --hyperlink --icons=always"
abbr -a ll "eza -a --hyperlink --icons=always -l"
abbr -a tree "eza -a --tree --hyperlink --icons=always"
abbr -a where "type -a"
abbr -a hammerspoon-config "$EDITOR ~/.hammerspoon/init.lua"
abbr -a fish-config "$EDITOR ~/.config/fish/config.fish"
abbr -a fish-reload-config "source ~/.config/fish/config.fish"
abbr -a venv "source ./.venv/bin/activate.fish"
abbr -a brew-sync "cd ~/.dotfiles; brew update && brew upgrade; brew bundle --verbose; brew bundle cleanup --force; brew cleanup --prune=all"

if status is-interactive
	# Commands to run in interactive sessions can go here
end

# Added by LM Studio CLI (lms)
set -gx PATH $PATH /Users/alessiofaraci/.lmstudio/bin
# End of LM Studio CLI section
