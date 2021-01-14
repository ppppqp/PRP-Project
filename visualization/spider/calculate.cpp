#include <cmath>
#include <fstream>
#include <iostream>
#include <map>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

int main() {
  // 读文件
  ifstream inFile("Keys2.csv", ios::in);
  string lineStr;
  vector<vector<string> > strArray;
  while (getline(inFile, lineStr)) {
    // 打印整行字符串
    // 存成二维表结构
    stringstream ss(lineStr);
    string str;
    vector<string> lineArray;
    // 按照逗号分隔
    while (getline(ss, str, ',')) lineArray.push_back(str);
    strArray.push_back(lineArray);
  }
  int rowNum = strArray.size();
  int colNum = strArray[0].size();
  vector<vector<double> > weight(rowNum, vector<double>(rowNum, 0));
  map<string, int> hash;
  for (int i = 0; i < rowNum; i++) {
    for (int j = 0; j < colNum; j++) {
      if (strArray[i][j] != "x") {
        auto ii = hash.find(strArray[i][j]);
        if (ii != hash.end())
          ii->second++;
        else
          hash[strArray[i][j]] = 1;
      }
    }
  }
  ofstream outFile("out.csv");
  cout << "here";
  for (int i = 0; i < colNum; i++) {
    for (int j = 0; j < colNum; j++) {
      for (int k = 1; k < rowNum; k++) {
        for (int t = 1; t < rowNum; t++) {
          if (i != j && strArray[k][i] != "x" &&
              strArray[t][j] == strArray[k][i])
            weight[i][j] += log(rowNum / (hash[strArray[k][i]] + 1));
        }
      }
      outFile << weight[i][j] << ",";
    }
    outFile << "\n";
  }
  cout << weight[1][1];
  outFile.close();
  return 0;
}
