from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
}

res = requests.get("https://www.amazon.in/s?bbn=976419031&rh=n%3A976419031%2Cp_89%3Arealme&dc&qid=1624216249&rnid=3837712031&ref=lp_976420031_nr_p_89_3", headers = headers)
bs = BeautifulSoup(res.text, "html.parser")
print(bs.title.string)
print(bs.find_all("div", {"class" : "s-image-square-aspect"}))

for x in bs.find_all("div", {"class" : "s-image-square-aspect"}):
  print(x.text)
  # data = x.text
  # print(data)