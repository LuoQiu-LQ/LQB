import requests
from bs4 import BeautifulSoup
import time
import random

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def get_top_books():
    """获取豆瓣图书Top100"""
    print("=== 豆瓣图书Top100 ===")
    books = []
    for i in range(0, 100, 20):  # 每页20条，共5页
        url = f"https://book.douban.com/top250?start={i}"
        try:
            response = requests.get(url, headers=HEADERS)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            for item in soup.select('.item'):
                title = item.select_one('.pl2 a')['title']
                rating = item.select_one('.rating_nums').text
                books.append((title, float(rating)))
            
            time.sleep(random.uniform(1, 3))  # 随机延迟防止被封
        except Exception as e:
            print(f"获取图书数据出错: {e}")
    
    # 按评分排序并取前100
    books.sort(key=lambda x: x[1], reverse=True)
    return books[:100]

def get_top_movies():
    """获取豆瓣电影Top100"""
    print("=== 豆瓣电影Top100 ===")
    movies = []
    for i in range(0, 100, 20):  # 每页20条，共5页
        url = f"https://movie.douban.com/top250?start={i}"
        try:
            response = requests.get(url, headers=HEADERS)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            for item in soup.select('.item'):
                title = item.select_one('.title').text.strip()
                rating = item.select_one('.rating_num').text
                movies.append((title, float(rating)))
            
            time.sleep(random.uniform(1, 3))  # 随机延迟防止被封
        except Exception as e:
            print(f"获取电影数据出错: {e}")
    
    # 按评分排序并取前100
    movies.sort(key=lambda x: x[1], reverse=True)
    return movies[:100]

from tabulate import tabulate

def main():
    # 获取结果
    top_books = get_top_books()
    top_movies = get_top_movies()
    
    # 准备表格数据
    book_table = [[i+1, title, rating] for i, (title, rating) in enumerate(top_books)]
    movie_table = [[i+1, title, rating] for i, (title, rating) in enumerate(top_movies)]
    
    # 打印美化后的表格
    print("\n豆瓣图书Top100:")
    print(tabulate(book_table, headers=["排名", "书名", "评分"], tablefmt="grid"))
    
    print("\n豆瓣电影Top100:")
    print(tabulate(movie_table, headers=["排名", "电影名", "评分"], tablefmt="grid"))

if __name__ == '__main__':
    main()
