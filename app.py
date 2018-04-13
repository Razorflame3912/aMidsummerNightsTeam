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

titles = ["All's Well That Ends Well", "Antony and Cleopatra", "As You Like It", "The Comedy of Errors", "Coriolanus", "Cymbeline", "Hamlet", "Henry IV, Part 1", "Henry IV, Part 2", "Henry V", "Henry VI, Part 1", "Henry VI, Part 2", "Henry VI, Part 3", "Henry VIII", "King John", "Julius Caesar", "King Lear", "Love's Labour's Lost", "Macbeth", "Measure For Measure", "The Merchant of Venice", "The Merry Wives of Windsor", "A Midsummer Night's Dream", "Much Ado About Nothing", "Othello", "Richard II", "Richard III", "Romeo and Juliet", "The Taming of the Shrew", "The Tempest", "Timon of Athens", "Titus Andronicus", "Troilus and Cressida", "Twelfth Night", "The Two Gentlemen of Verona", "The Winter's Tale"]

words_dict = {}

for title in titles:
    words_dict[title] = plays_list[titles.index(title)]

for play in words_dict:
    words_dict[play] = words_dict[play].split()

def numWords(play):
    return len(words_dict[play])

print numWords("Hamlet")

    
#----------------------------------------------------------------
