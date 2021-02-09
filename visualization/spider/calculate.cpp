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
  vector<vector<vector<string> > > record(colNum,
                                          vector<vector<string> >(colNum));
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

  ofstream outFile("weight.csv");
  cout << "here" << endl;
  outFile
      << "电子信息与电气工程学院(计算机系),船舶海洋与建筑工程学院,"
         "机械与动力工程学院,电子信息与电气工程学院,"
         "电子信息与电气工程学院(电气系),电子信息与电气工程学院(自动化系),"
         "电子信息与电气工程学院(电子系),电子信息与电气工程学院(仪器系),"
         "电子信息与电气工程学院(网络空间安全学院),电子信息与电气工程学院("
         "软件学院),电子信息与电气工程学院(微纳电子学系),材料科学与工程学院,"
         "数学科学学院,物理与天文学院,生命科学技术学院,生物医学工程学院,"
         "人文学院,化学化工学院,安泰经济与管理学院,国际与公共事务学院,"
         "外国语学院,农业与生物学院,环境科学与工程学院,药学院,凯原法学院,"
         "新闻传播学,电子信息与电气工程学院(微电子学院),马克思主义学院,体育系,"
         "上海交大-巴黎高科卓越工程师学院,上海交大-南加州大学文化创意产业学院,"
         "塑性成形技术与装备研究院,微纳科学技术研究院,高等教育研究院,"
         "中美物流研究院,国际教育学院,上海交大密西根学院,上海高级金融学院,"
         "航空航天学院,系统生物医学研究院,人文艺术研究院,设计学院\n";
  for (int i = 0; i < colNum; i++) {
    for (int j = 0; j < colNum; j++) {
      for (int k = 1; k < rowNum; k++) {
        for (int t = 1; t < rowNum; t++) {
          if (i != j && strArray[k][i] != "x" &&
              strArray[t][j] == strArray[k][i]) {
            record[i][j].push_back(strArray[k][i]);
            record[j][i].push_back(strArray[k][i]);
            weight[i][j] += log(rowNum / (hash[strArray[k][i]] + 1));
          }
        }
      }
      outFile << weight[i][j] << ",";
    }
    outFile << "\n";
  }
  cout << colNum << endl;
  ofstream outJson("outJson.js");
  outJson << "const detailedKey = [";
  for (int i = 0; i < colNum; i++) {
    // cout << i << endl;
    outJson << "{";  // element start;
    for (int j = 0; j < colNum; j++) {
      if (j == colNum - 1)
        outJson << "\"设计学院\"";
      else
        outJson << "\"" << strArray[0][j] << "\"";  // attribute start
      outJson << ":"
              << "[";  // array start
      for (int k = 0; k < record[i][j].size(); k++) {
        outJson << "\"" << record[i][j][k] << "\"";
        if (k < record[i][j].size() - 1) outJson << ",";
      }
      outJson << "]";                      // array end
      if (j < colNum - 1) outJson << ",";  // attribute end
      outJson << "\n";
    }
    outJson << "}";  // element end;
    if (i < colNum - 1) outJson << ",";
  }
  outJson << "];\n export default detailedKey;";
  outFile.close();
  outJson.close();
  return 0;
}
