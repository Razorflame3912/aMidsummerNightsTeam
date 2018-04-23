# aMidsummerNightsTeam
## by Mansour Elsharawy, Michela Marchina, Tina Chen, and Giorgio Vidali, Period 9


## Our Data Set:
We aim to utilize the data set of The Complete Works of William Shakespeare! Through the link provided below, the text file contains  every one of Shakespeare's plays, which we will use in terms of analyzing word frequency and overall play length.
Source: https://ocw.mit.edu/ans7870/6/6.006/s08/lecturenotes/files/t8.shakespeare.txt

## Our Visualization
Shakespeare has written a total of 36 plays, scattered across tragedies, comedies,and histories. Our data visualization (by default, without user interaction) will consist of one large circle which contains subcircles representing each genre of his work. Within the genres, each play classified as a part of that genre will be represented by a circle as well. Upon startup, all of the plays and their categories aren't immediately visible. The user can then search specific words in a search bar, and the circles will then resize themselves based on how often the searched word appears in the play. (For example, if the user were to search the word "death," they would expect the bubbles lumped in tragedies to get considerably larger than the ones in the comedies.) Hovering over a play will provide more specific information regarding the user's search. (Ex: Hamlet. Occurrences of the word "madness": 57). Other possible future features could include hard-coded features (such as resizing based on kill count, popularity, number of roles, or other characteristics) or allowing a user to peruse unique words or words that only appear once in every play.

## Thoughts
There is a lot of value in familiarizing someone who may not be well-versed in the arts by providing an interesting, interactive way in which they can explore patterns and learn more about the works of Shakespeare from a more analytical standpoint. New, creative ways of engaging with literature are always appreciated. The data could allow the user to explore questions such as:
* Do Shakespeare's plays' moods and themes correlate with word count?
* Which plays have the most expansive vocabulary? The least?
* Other interesting insights that can result from word frequencies.

Furthermore, more questions can arise, such as:
* If there are unexpected results (Ex: A comedy exhibiting an unnaturally high word count for the word "sadness"), why is that the case?
* What could explain these patterns?
* Based on what I have found, which of these should I read?
* Whatever else the user finds interesting/notable!

## D3 Features
* Transitions will be used for prettiness. :)
* Data marriage with elements will be used from the data we collect. (Most likely searching for a word or statistic will return a dictionary of plays and word counts, creating a list from that to be used to adjust circle sizes)
* More specifically: Word frequency -> size (or other stats), Vocabulary range -> color darkness.

