#include <iostream>
#include <unordered_map>
#include <vector>
#include <stack>
#include "Product.h"
#include "utils.h"
#include <fstream>
using namespace std;


int main() {
    unordered_map<int,Product*> productMap;
    

    Product* p1=new Product(1, "Shoes",500,700,15);
    Product* p2=new Product(2, "Shirt",300,500,50);

    productMap[1]=p1;
    productMap[2]=p2;


    addSales(*productMap[1], 5, "d1");
    addSales(*productMap[1], 6, "d2");
    addSales(*productMap[1], 7, "d3");
    addSales(*productMap[1], 6, "d4");
    addSales(*productMap[1], 5, "d5");
    addSales(*productMap[1], 6, "d6");
    addSales(*productMap[1], 7, "d7");

    addSales(*productMap[1], 10, "d8");
    addSales(*productMap[1], 12, "d9");
    addSales(*productMap[1], 13, "d10");
    addSales(*productMap[1], 14, "d11");
    addSales(*productMap[1], 15, "d12");
    addSales(*productMap[1], 16, "d13");
    addSales(*productMap[1], 18, "d14");

    
ofstream file("../data/output.json");
file << "[\n";
bool first = true;

for (auto &pair : productMap) {

    Product* p = pair.second;

    vector<int> sales = getSales(p);
    string trend = demandTrend(sales);

    // ✅ HANDLE NO DATA CASE
    if (trend == "Not enough data") {
        cout << "------------------------" << endl;
        cout << "Product: " << p->name << endl;
        cout << "Trend: " << trend << endl;
        cout << "Decision: Not enough data to decide" << endl;
        continue;
    }

    float suggested = suggestPrice(p, trend);
    string decision = priceDecision(suggested, p->current_price);


    if (!first) {
        file << ",\n";
    }

    file << "{\n";
    file << "\"product\": \"" << p->name << "\",\n";
    file << "\"trend\": \"" << trend << "\",\n";
    file << "\"suggested_price\": " << suggested << ",\n";
    file << "\"decision\": \"" << decision << "\"\n";
    file << "}";

    first = false;

    // console  o/p

    cout << "------------------------" << endl;
    cout << "Product: " << p->name << endl;
    cout << "Trend: " << trend << endl;
    cout << "Suggested Price: " << suggested << endl;
    cout << "Decision: " << decision << endl;

    // STACK
    stack<float> priceHistory;

    priceHistory.push(p->current_price);
    p->current_price = suggested;

    if (!priceHistory.empty()) {
        float prev = priceHistory.top();
        priceHistory.pop();

        p->current_price = prev;
        cout << "Undo done. Restored price: " << prev << endl;
    }
}
    file << "\n]";
    file.close();

    // SalesNode*temp=p->head;
    // while(temp!=NULL) {
    //     cout<<temp->date<<" : "<<temp->units<<endl;
    //     temp=temp->next;
    // }

    return 0;
}

//1. Create products
// 2. Add sales data
// 3. Convert sales to vector
// 4. Detect demand trend
// 5. Calculate new price
// 6. Decide increase/decrease
// 7. Save result in JSON
// 8. Display in React