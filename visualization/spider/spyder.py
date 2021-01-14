# coding=utf-8
import xlwt
import xlrd
from xlutils.copy import copy;
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import time

#workbook = xlwt.Workbook() #create excel worksheet
#sheet = xlrd.workbook.add_sheet("2019",cell_overwrite_ok=False)
rb = xlrd.open_workbook('data_full_2016.xls',formatting_info=True)
r_sheet = rb.sheet_by_index(0) # read only copy to introspect the file
wb = copy(rb) # a writable copy (I can't read values out of this, only write to it)
w_sheet = wb.get_sheet(0) # the sheet to write to within the writable copy

wd = webdriver.Chrome()
startPage = 0
startPageString = "1"
wd.get("http://thesis.lib.sjtu.edu.cn/sub.asp?content=2016&choose_key=year&xuewei=2,%201&px=&page=" + startPageString)    # 打开百度浏览器
#wd.find_element_by_name("content").send_keys("2019")
#select = Select(wd.find_element_by_name('choose_key'))
#select.select_by_value("year")
#button = wd.find_element_by_css_selector("input[type = 'submit']")   
#button.click()
pages = range(293)
row = startPage * 20
for page in pages:
  for x in range(20):
    table = wd.find_elements_by_css_selector("tr[height = '35px']")
    tr = table[x]
    tr.find_element_by_link_text("查看详情").click()
    texts = wd.find_elements_by_css_selector("td[colspan = '2']")
    print(texts[3].text)
    w_sheet.write(row,1,texts[3].text)
    row += 1
    #time.sleep(1)
    wd.find_element_by_link_text("返回上一页").click()
  #time.sleep(1)
  pagination = wd.find_element_by_class_name("pagination")
  pagination.find_element_by_link_text('>').click()
  wb.save('data_full_2016.xls')
time.sleep(1)   #等待3秒
wd.quit()   #关闭浏览器