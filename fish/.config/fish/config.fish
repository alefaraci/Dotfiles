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

if status is-interactive
	# Commands to run in interactive sessions can go here
end

# export PATH="$HOME/.local/bin:$PATH"
