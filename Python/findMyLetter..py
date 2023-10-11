# Given a text and a subText that might be in the text, 
# return the minimum distance from the subText to any side of the text. 
# If the subText is not in the text, return -1. 
# The distance is the number of characters from the subText to any of the text sides.

text = "abcdefgci"
subText = "c"

def distance(text: str, subText: str) -> int:
    if subText not in text: return -1

    """Return index of first and end of the text"""
    leftIndex: int = text.find(subText)
    rightIndex: int = text.rfind(subText)

    """Return accountant of the first left and end right of the text"""
    leftCount: int = len(text[:leftIndex])
    rigthCount: int = len(text[rightIndex+1:])

    """Return the smaller accountant"""
    if leftCount > rigthCount: return rigthCount
    else: return leftCount

if __name__=="__main__":
    print(distance(text,subText)) 