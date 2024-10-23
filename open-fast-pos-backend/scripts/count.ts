export interface Product {
	_id: string;
	product_name: string;
	description?: string;
	product_price: number;
	product_cost: number;
	product_tag: string[];
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
}

export interface OrderItem {
	_id: string;
	item: Product;
	amount: number;
}
export interface Order {
	_id: string;
	order_number: number;
	order_items: OrderItem[];
	total: number;
	receive: number;
	paid_done: Date;
	prep_done: Date;
	serve_done: Date;
	created_at: Date;
}
import fs from "fs";
const file = fs.readFileSync("./day-2.json", "utf-8");
const fileParsed: Order[] = JSON.parse(file);

//Take all the ordered items from each order object
const orderedItems = fileParsed.flatMap((order) => {
	return order.order_items;
});

const itemCount = new Map<string, number>();
let total = 0;
for (const itemList of orderedItems) {
	total = total + itemList.item.product_price * itemList.amount;

	if (itemCount.has(itemList.item.product_name)) {
		itemCount.set(
			itemList.item.product_name,
			(itemCount.get(itemList.item.product_name) as number) + itemList.amount
		);
	} else {
		itemCount.set(itemList.item.product_name, itemList.amount);
	}
}

console.log(itemCount);
console.log(total);

function convertOrdersToCSV(orders: Order[]): string {
	// Define CSV headers
	const headers =
		[
			"Order ID",
			"Order Number",
			"Product ID",
			"Product Name",
			"Amount",
			"Product Price",
			"Product Tags",
			"Total",
			"Received",
			"Paid Date",
			"Prepared Date",
			"Served Date",
			"Order Created At",
		].join(",") + "\n";

	// Create CSV rows from the order data
	const rows = orders
		.flatMap((order) => {
			return order.order_items.map((orderItem) => {
				const product = orderItem.item;
				return [
					order._id, // Order ID
					order.order_number, // Order Number
					product._id, // Product ID
					product.product_name, // Product Name
					orderItem.amount, // Amount
					product.product_price, // Product Price
					product.product_tag.join(";"), // Product Tags (joined by semicolons)
					order.total, // Total Order Price
					order.receive, // Received Amount
					order.paid_done ? new Date(order.paid_done).toISOString() : "NULL", // Paid Date
					order.prep_done ? new Date(order.prep_done).toISOString() : "NULL", // Prepared Date
					order.serve_done ? new Date(order.serve_done).toISOString() : "NULL", // Served Date
					order.created_at, // Order Created Date
				].join(",");
			});
		})
		.join("\n");

	// Combine headers and rows
	return headers + rows;
}

// Generate the CSV string
const csvData = convertOrdersToCSV(fileParsed);

// Optionally, save CSV to a file
fs.writeFileSync("./orders_output.csv", csvData);
