# Simple script to get wiki results
import wikipedia

def wiki(search_term):
    try:
        wikipage = wikipedia.summary(search_term, sentences=50)
        print(f'{wikipage}\n')
    
    except Exception as Error:
        print(Error)
        
        
text = input('\nInput search term: ')
wiki(text)