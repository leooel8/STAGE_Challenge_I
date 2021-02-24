#!/bin/bash
echo "====================================="
echo "  Push service :"
while true; do
  read -p "   Push to GitHub ? (Y/n)" yn
  case $yn in
    [Yy]* ) echo "OK DONE";
            git add .;
            git status;
            read -p "     Type your commit message : " msg
            git commit -m "$msg";
            git push;
            exit;;
    [Nn]* ) exit;;
    *) "Please answer yes or no.";;
  esac
done
