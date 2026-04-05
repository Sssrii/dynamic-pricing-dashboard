#ifndef SALESNODE_H
#define SALESNODE_H

#include <string>
using namespace std;

struct SalesNode {
    int units;
    string date;
    SalesNode* next;

    SalesNode(int u, string d) {
        units = u;
        date = d;
        next = NULL;
    }
};

#endif