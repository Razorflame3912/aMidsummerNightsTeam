from flask import Flask, render_template, request, session, redirect, url_for, flash
import sys
import os

reload(sys)
sys.setdefaultencoding('utf-8')

#-----------------------DATA MANIPULATION------------------------

text_file = open("shakespeare.txt", "r")
full_text = text_file.read()
text_file.close()

plays_list = full_text.split('the_end')
#print len(plays_list)



#----------------------------------------------------------------
