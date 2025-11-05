import "dotenv/config";

import { db } from "./db";
import { productsTable, salesTable } from "./schema";

export async function seed() {
  console.log("🌱 Seeding database...");

  // Insert products
  await db.insert(productsTable).values([
    { name: "Laptop", category: "Electronics", price: 999.99, stock: 50 }, // product_id 1
    { name: "Mouse", category: "Electronics", price: 25.99, stock: 200 }, // product_id 2
    { name: "Keyboard", category: "Electronics", price: 75.0, stock: 150 }, // product_id 3
    { name: "Monitor", category: "Electronics", price: 299.99, stock: 75 }, // product_id 4
    { name: "Desk Chair", category: "Furniture", price: 199.99, stock: 40 }, // product_id 5
    { name: "Desk", category: "Furniture", price: 399.99, stock: 30 }, // product_id 6
    { name: "Notebook", category: "Stationery", price: 5.99, stock: 500 }, // product_id 7
    { name: "Pen Set", category: "Stationery", price: 12.99, stock: 300 }, // product_id 8
    { name: "Headphones", category: "Electronics", price: 149.99, stock: 80 }, // product_id 9
    { name: "Office Lamp", category: "Furniture", price: 89.99, stock: 60 }, // product_id 10
    { name: "Backpack", category: "Accessories", price: 59.99, stock: 100 }, // product_id 11
  ]);

  // Insert sales
  await db.insert(salesTable).values([
    {
      product_id: 1,
      quantity: 2,
      total_amount: 1999.98,
      customer_name: "John Doe",
      region: "North",
    },
    {
      product_id: 2,
      quantity: 5,
      total_amount: 129.95,
      customer_name: "Jane Smith",
      region: "South",
    },
    {
      product_id: 3,
      quantity: 3,
      total_amount: 225.0,
      customer_name: "Bob Johnson",
      region: "West",
    },
    {
      product_id: 4,
      quantity: 2,
      total_amount: 599.98,
      customer_name: "Charlie Wilson",
      region: "North",
    },
    {
      product_id: 5,
      quantity: 4,
      total_amount: 799.96,
      customer_name: "Diana Davis",
      region: "South",
    },
    {
      product_id: 6,
      quantity: 1,
      total_amount: 399.99,
      customer_name: "Eve Martinez",
      region: "East",
    },
    {
      product_id: 1,
      quantity: 1,
      total_amount: 999.99,
      customer_name: "Alice Brown",
      region: "West",
    },
    {
      product_id: 3,
      quantity: 2,
      total_amount: 150.0,
      customer_name: "Ivy Wang",
      region: "East",
    },
    {
      product_id: 1,
      quantity: 1,
      total_amount: 999.99,
      customer_name: "Jack Taylor",
      region: "West",
    },
    {
      product_id: 9,
      quantity: 2,
      total_amount: 299.98,
      customer_name: "Liam Green",
      region: "North",
    },
    {
      product_id: 9,
      quantity: 1,
      total_amount: 149.99,
      customer_name: "Sophia Turner",
      region: "South",
    },
    {
      product_id: 10,
      quantity: 3,
      total_amount: 269.97,
      customer_name: "Olivia White",
      region: "East",
    },
    {
      product_id: 10,
      quantity: 1,
      total_amount: 89.99,
      customer_name: "Noah Anderson",
      region: "West",
    },
    {
      product_id: 11,
      quantity: 4,
      total_amount: 239.96,
      customer_name: "Emma Johnson",
      region: "North",
    },
    {
      product_id: 11,
      quantity: 2,
      total_amount: 119.98,
      customer_name: "Mason Hall",
      region: "South",
    },
    {
      product_id: 7,
      quantity: 10,
      total_amount: 59.9,
      customer_name: "Lucas Lee",
      region: "East",
    },
    {
      product_id: 8,
      quantity: 6,
      total_amount: 77.94,
      customer_name: "Isabella Scott",
      region: "North",
    },
    {
      product_id: 2,
      quantity: 3,
      total_amount: 77.97,
      customer_name: "Henry Adams",
      region: "East",
    },
    {
      product_id: 3,
      quantity: 1,
      total_amount: 75.0,
      customer_name: "Chloe Clark",
      region: "South",
    },
    {
      product_id: 5,
      quantity: 2,
      total_amount: 399.98,
      customer_name: "Ethan Baker",
      region: "West",
    },
    {
      product_id: 6,
      quantity: 2,
      total_amount: 799.98,
      customer_name: "Mia Carter",
      region: "North",
    },
    {
      product_id: 4,
      quantity: 1,
      total_amount: 299.99,
      customer_name: "James Evans",
      region: "South",
    },
    {
      product_id: 9,
      quantity: 3,
      total_amount: 449.97,
      customer_name: "Charlotte Bell",
      region: "West",
    },
    {
      product_id: 11,
      quantity: 1,
      total_amount: 59.99,
      customer_name: "Benjamin Rivera",
      region: "East",
    },
  ]);

  console.log("✅ Database seeded");
}

seed();
