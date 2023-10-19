#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int product_id;
    char name[50];
    double price;
    int quantity;
} Product;

void addProduct(Product* inventory, int* count) {
    if (*count < 100) {
        Product newProduct;
        printf("Enter product name: ");
        scanf("%s", newProduct.name);
        printf("Enter product price: ");
        scanf("%lf", &newProduct.price);
        printf("Enter product quantity: ");
        scanf("%d", &newProduct.quantity);

        newProduct.product_id = *count + 1;
        inventory[(*count)++] = newProduct;

        printf("Product added successfully.\n");
    } else {
        printf("Inventory is full.\n");
    }
}

void listProducts(Product* inventory, int count) {
    printf("Product List:\n");
    for (int i = 0; i < count; i++) {
        printf("ID: %d, Name: %s, Price: %.2lf, Quantity: %d\n",
               inventory[i].product_id, inventory[i].name,
               inventory[i].price, inventory[i].quantity);
    }
}

int main() {
    Product inventory[100];
    int count = 0;
    int choice;

    while (1) {
        printf("Inventory Management System\n");
        printf("1. Add Product\n");
        printf("2. List Products\n");
        printf("3. Quit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addProduct(inventory, &count);
                break;
            case 2:
                listProducts(inventory, count);
                break;
            case 3:
                exit(0);
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}
