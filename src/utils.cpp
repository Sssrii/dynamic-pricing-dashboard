#include "utils.h"
#include <iostream>
using namespace std;

void addSales(Product &p, int units, string date) {
    SalesNode* newNode = new SalesNode(units, date);

    if (p.head == NULL) {
        p.head = newNode;
        return;
    }
    SalesNode* temp = p.head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}

vector<int> getSales(Product* p) {
    vector<int> sales;
    SalesNode* temp = p->head;

    while (temp != NULL) {
        sales.push_back(temp->units);
        temp = temp->next;
    }
    return sales;
}
float avg(vector<int>& v, int start, int end) {
    float sum = 0;
    for (int i = start; i < end; i++) {
        sum += v[i];
    }
    return sum / (end - start);
}
string demandTrend(vector<int>& v) {
    if(v.size()<14) {
        return "Not enough data";
    }
    float oldAvg=avg(v,0,7);
    float newAvg=avg(v,7,14);

    if(newAvg>oldAvg) return "Increasing";
    else if(newAvg<oldAvg) return "Decreasing";
    else return "Stable";

}

float suggestPrice(Product* p, string trend) {
    float basePrice=p->cost_price * 1.2; //20% profit
    float demandFactor=1.0;

    if(trend=="Increasing") demandFactor=1.1;
    else if(trend=="Decreasing") demandFactor=0.9;

    float stockFactor=1.0;
    if(p->stock<20) stockFactor=1.05;

    float finalPrice=basePrice*demandFactor*stockFactor;

    return finalPrice;
} 

string priceDecision(float suggested, float current) {
    if(suggested>current) return "Increase price";
    else if(suggested<current) return "Decrease price";
    else return "Keep same";
}
