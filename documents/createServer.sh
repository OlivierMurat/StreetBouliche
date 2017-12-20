#!/bin/bash
cd /Users/oliviermurat/Desktop/Ingesup/Labo/DevWeb/StreetBouliche
/usr/bin/open -a "/Applications/Google Chrome.app" "http://localhost:8080/"
python -m SimpleHTTPServer 8080
# kill all lsof -i @localhost:8080