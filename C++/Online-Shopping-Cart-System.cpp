#include <iostream>
#include <vector>

class Product {
public:
    int id;
    std::string name;
    double price;
    int stock;

    Product(int id, const std::string& name, double price, int stock)
        : id(id), name(name), price(price), stock(stock) {}
};

class ShoppingCart {
public:
    std::vector<Product> items;

    void addToCart(const Product& product) {
        items.push_back(product);
    }

    double calculateTotal() {
        double total = 0.0;
        for (const Product& product : items) {
            total += product.price;
        }
        return total;
    }
};

int main() {
    Product product1(1, "Laptop", 999.99, 10);
    Product product2(2, "Smartphone", 599.99, 20);

    ShoppingCart cart;
    cart.addToCart(product1);
    cart.addToCart(product2);

    std::cout << "Items in the shopping cart:\n";
    for (const Product& product : cart.items) {
        std::cout << product.name << " - $" << product.price << std::endl;
    }

    std::cout << "Total: $" << cart.calculateTotal() << std::endl;

    return 0;
}
