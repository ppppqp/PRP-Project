#include <cmath>
#include <fstream>
#include <iostream>
#include <map>
#include <sstream>
#include <string>
#include <vector>
using namespace std;
int main() {
  // deal with the cloud component
  ifstream inFile("cloud.csv", ios::in);
  ofstream outFile("cloud.js");
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
  outFile << "const data = {\n";
  for (int i = 0; i < colNum; i++) {
    if (i == colNum - 1)
      outFile << "\"设计学院\":[";
    else
      outFile << "\"" << strArray[0][i] << "\":[";
    for (int j = 1; j < rowNum; j++) {
      if (strArray[j][i].size() > 0) {
        outFile << "\"" << strArray[j][i] << "\"";
        if (j < rowNum - 1) outFile << ",";
      }
    }
    outFile << "]";
    if (i < colNum - 1) outFile << ",\n";
  }
  outFile << "export default data;";
}
