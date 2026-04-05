#include "Product.h"

Product::Product(int i, string n, float cp, float sp, int st) {
    id = i;
    name = n;
    cost_price = cp;
    current_price = sp;
    stock = st;
    head = NULL;
}