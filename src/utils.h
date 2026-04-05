#ifndef UTILS_H
#define UTILS_H

#include "Product.h"
#include <vector>
using namespace std;

void addSales(Product &p, int units, string date);
vector<int> getSales(Product* p);
float avg(vector<int>& v, int start, int end);
string demandTrend(vector<int>& v);
float suggestPrice(Product* p, string trend);
string priceDecision(float suggested, float current);

#endif