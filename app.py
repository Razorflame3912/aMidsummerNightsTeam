from flask import Flask, render_template, request, session, redirect, url_for, flash
import sys
import os

reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__)

#-----------------------DATA MANIPULATION------------------------

text_file = open("shakespeare.txt", "r")
full_text = text_file.read()
text_file.close()

plays_list = full_text.split('the_end')

titles = ["All's Well That Ends Well", "Antony and Cleopatra", "As You Like It", "The Comedy of Errors", "Coriolanus", "Cymbeline", "Hamlet", "Henry IV, Part 1", "Henry IV, Part 2", "Henry V", "Henry VI, Part 1", "Henry VI, Part 2", "Henry VI, Part 3", "Henry VIII", "King John", "Julius Caesar", "King Lear", "Love's Labour's Lost", "Macbeth", "Measure For Measure", "The Merchant of Venice", "The Merry Wives of Windsor", "A Midsummer Night's Dream", "Much Ado About Nothing", "Othello", "Richard II", "Richard III", "Romeo and Juliet", "The Taming of the Shrew", "The Tempest", "Timon of Athens", "Titus Andronicus", "Troilus and Cressida", "Twelfth Night", "The Two Gentlemen of Verona", "The Winter's Tale"]

comedies = ["All's Well That Ends Well", "As You Like It", "The Comedy of Errors", "Love's Labour's Lost", "Measure For Measure", "The Merchant of Venice", "The Merry Wives of Windsor", "A Midsummer Night's Dream", "Much Ado About Nothing","The Taming of the Shrew", "The Tempest", "Twelfth Night", "The Two Gentlemen of Verona", "The Winter's Tale"]

tragedies = ["Antony and Cleopatra", "Coriolanus", "Cymbeline"]

words_dict = {}

for title in titles:
    words_dict[title] = plays_list[titles.index(title)]

for play in words_dict:
    words_dict[play] = words_dict[play].split()

def numWords(play):
    return len(words_dict[play])

print numWords("Hamlet")

def wordFrequency(target_word, play):
    count = 0
    for word in words_dict[play]:
        if (word[len(word)-1] == "'"):
            word = word[:len(word)-1]
        if (word.upper() == target_word.upper()):
            count += 1
    return count

def numUniqueWords(play):
    count = 0
    words = []
    for word in words_dict[play]:
        if (word not in words):
            words.append(word)
            count += 1
    return count 

print numUniqueWords("Hamlet")
#print wordFrequency("Hamlet", "Hamlet")
    
#----------------------------------------------------------------

#---------------------------FLASK APP----------------------------

@app.route('/')
def root(): #root based on number of words total
    num_dict = {}
    for play in titles:
        num_dict[play] = numWords(play)
    return render_template('base.html', num_words = num_dict)

@app.route('/search')
def search():
    word = request.args['word']
    frequency_dict = {}
    for play in titles:
        frequency_dict[play] = wordFrequency(word, play)
    return render_template('base.html', frequencies = frequency_dict)

@app.route('/vocab') #processes for complexity of vocab (number of unique words)
def vocab():
    vocab_dict = {}
    for play in titles:
        vocab_dict[play] = numUniqueWords(play)
    return render_template('base.html', complexity = vocab_dict)

if __name__ == '__main__':
    app.debug = True
    app.run()                   

#----------------------------------------------------------------
