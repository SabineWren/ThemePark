#!/bin/bash
SESSION="TP"

# Corresponds to attach-session at end
tmux new-session -d -s $SESSION
tmux rename-window -t $SESSION:0 "Scripts"
tmux set mouse on

# Panels on window 1
tmux send-keys -t $SESSION:0 "tmux split-window -v" ENTER
tmux send-keys -t $SESSION:0 "tmux split-window -v" ENTER

# Hack to wait for panels to bind IDs
sleep 0.1

# Back End
tmux send-keys -t $SESSION:0.0 "cd Web_Root/" ENTER
tmux send-keys -t $SESSION:0.0 "pwd" ENTER
tmux send-keys -t $SESSION:0.0 "php -S localhost:8000"
# Bundle
tmux send-keys -t $SESSION:0.1 "npm run bundle"
# Compile
tmux send-keys -t $SESSION:0.2 "npm run compile"

# Second window for Git
tmux new-window -t $SESSION:1 -n "Git"
tmux send-keys -t $SESSION:1 "pwd" ENTER
tmux send-keys -t $SESSION:1 "git status" ENTER

tmux attach-session -t $SESSION:0
