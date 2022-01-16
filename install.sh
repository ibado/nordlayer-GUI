#!/bin/bash

set -e
trap 'printf "\nError trying to install nordlayer-GUI...\n"' ERR

instalation_dir=~/.local/share/gnome-shell/extensions/nordlayergui@ignacio.bado.com
mkdir -p $instalation_dir
cp -r extension/* $instalation_dir

# ToDo: restart gnome-shell
