import urllib
from bs4 import BeautifulSoup
import urllib.parse
import urllib.request

def getWebpages(query, count=1):
    out = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Charset': 'ISO-88859-1,utf-8;q=0.7,*;q=0.3',
        'Accept-Encoding': 'none',
        'Accept-Language': 'en-US,en;q=0.8',
        'Connection': 'keep-alive'
    }

    query_encoded = urllib.parse.quote_plus(query)
    request_url = 'https://www.google.com/search?q=' + query_encoded + f'&first=0&count={count}'
    request = urllib.request.Request(request_url, None, headers=headers)
    response = urllib.request.urlopen(request)
    html = response.read().decode('utf8')


    soup = BeautifulSoup(html, 'html.parser')
    print(soup.text)
    all_h3 = soup.find_all('h3')
    for h3_tag in all_h3:
        parent_div = h3_tag.find_parent('div')
        for _ in range(3):
            parent_div = parent_div.find_parent('div')
        child_divs = parent_div.find_all('div', recursive=False)
        a = parent_div.find('a')
        description = child_divs[1].text
        title = h3_tag.text
        url = ''.join(a['href'][len('/url?esrc=s&q=&rct=j&sa=U&url='):].split('&')[:1]).replace('%3F','?').replace('%3D','=')
        if len(description) and len(title) and len(url):
            out+=[(description, title, url)]
    return out[:5]

print(getWebpages('test'))