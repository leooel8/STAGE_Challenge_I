#!/bin/bash
echo "====================================="
echo "  Push service :"
while true; do
  read -p "   Push to GitHub ? (Y/n)" yn
  case $yn in
    [Yy]* ) git add .;
            git status;
            read -p "     Type your commit message : " msg
            git commit -m "$msg";
            git push;
            echo "      Git push DONE"
            break;;
    [Nn]* ) break;;
    *) "Please answer yes or no.";;
  esac
done
while true; do
  read -p "   Push to Google Cloud Platform ? (Y/n)" yn
  case $yn in
    [Yy]* ) git push --all google;
            break;;
    [Nn]* ) break;;
    *) "Please answer yes or no.";;
  esac
done
