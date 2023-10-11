from bs4 import BeautifulSoup

with open('home.html', 'r') as html_file:
    content = html_file.read()

    soup = BeautifulSoup(content, 'lxml')
    #print(soup.prettify())
    tags5 = soup.find_all('h5')
    #tags4 = soup.find_all('h4')
    #tags3 = soup.find_all('h3')
    #tags2 = soup.find_all('h2')
    #tags1 = soup.find_all('h1')
    tags6 = soup.find_all('h5', class_ = "card-text")
    print('this' + str(tags6))
    for element in tags5:
        print(element.text)
    # course_cards = soup.find_all('div', class_ = "card")
    # for course in course_cards:
    #     #print(course)
    #     #print(course.h5)
    #     print(course.h5.text)