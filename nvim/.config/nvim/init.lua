-- set background to transparent
vim.cmd [[
  highlight Normal guibg=none
  highlight NonText guibg=none
  highlight Normal ctermbg=none
  highlight NonText ctermbg=none
]]

vim.g.clipboard = {
    name = 'OSC 52',
    copy = {
        ['+'] = require('vim.ui.clipboard.osc52').copy('+'),
        ['*'] = require('vim.ui.clipboard.osc52').copy('*'),
    },
    paste = {
        ['+'] = require('vim.ui.clipboard.osc52').paste('+'),
        ['*'] = require('vim.ui.clipboard.osc52').paste('*'),
    },
}

vim.opt.clipboard = "unnamedplus"

vim.o.mouse = ''

-- Convert tabs to spaces
vim.opt.expandtab = true

-- Set the tab width to 4 spaces
vim.opt.tabstop = 4

-- Set the shift width (indentation) to 4 spaces
vim.opt.shiftwidth = 4

-- Set the soft tab width (for editing operations) to 4 spaces
vim.opt.softtabstop = 4
