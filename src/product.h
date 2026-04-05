#ifndef PRODUCT_H
#define PRODUCT_H

#include "SalesNode.h"
#include <string>
using namespace std;

class Product {
public:
    int id;
    string name;
    float cost_price;
    float current_price;
    int stock;

    SalesNode* head;

    Product(int i, string n, float cp, float sp, int st);
};

#endif