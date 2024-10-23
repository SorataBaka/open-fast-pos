import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import io from "socket.io-client";
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
export default function Serve() {
	const router = useRouter();
	const [orders, setOrders] = useState<Order[]>([]);
	useEffect(() => {
		if (!router.isReady) return;
		const token = localStorage.getItem("token");
		if (token === null) {
			router.replace("/login");
			return;
		}
		fetch("https://pos.tianharjuno.com/api/v1/order/list?type=serve&limit=10", {
			method: "GET",
			headers: {
				Authorization: token,
			},
		}).then((response) => {
			if (response.status !== 200) {
				toast.error("Error fetching orders");
				return;
			}
			response.json().then((responseJson) => {
				setOrders(responseJson.data);
			});
		});
	}, [router]);

	useEffect(() => {
		const socket = io("https://pos.tianharjuno.com");
		socket.on("message", () => {
			if (!router.isReady) return;
			const token = localStorage.getItem("token");
			if (token === null) {
				router.replace("/login");
				return;
			}
			fetch("https://pos.tianharjuno.com/api/v1/order/list?type=serve", {
				method: "GET",
				headers: {
					Authorization: token,
				},
			}).then((response) => {
				if (response.status !== 200) {
					toast.error("Error fetching orders");
					return;
				}
				response.json().then((responseJson) => {
					setOrders(responseJson.data);
				});
			});
		});

		return () => {
			socket.disconnect();
		};
	}, [router]);

	useEffect(() => {
		const handlePress = (event: KeyboardEvent) => {
			if (event.key !== "Enter") return;
			const token = localStorage.getItem("token");
			if (token === null) {
				router.replace("/login");
				return;
			}
			fetch(
				"https://pos.tianharjuno.com/api/v1/order/serve/" +
					orders[0].order_number,
				{
					method: "POST",
					headers: {
						Authorization: token,
					},
				}
			).then((response) => {
				if (response.status !== 200) {
					toast.error("Failed to serve");
					return;
				}
				toast.success("Served!");
				return;
			});
		};
		window.addEventListener("keypress", handlePress);
		return () => {
			window.removeEventListener("keypress", handlePress);
		};
		//eslint-disable-next-line
	}, [orders]);

	return (
		<main className="grid grid-cols-5 grid-rows-2 align-middle justify-center min-h-screen bg-black gap-10 p-5">
			{orders.map((order, index) => {
				if (index == 0) {
					return (
						<div key={index} className="bg-white border-4 border-yellow-400">
							<p className="text-white bg-red-500 p-2 font-bold">
								注文番号：{order.order_number}
							</p>
							<div className="flex flex-col align-middle justify-center bg-white p-2">
								{order.order_items.map((items, index) => {
									return (
										<p key={index} className="text-2xl">
											{items.amount}X {items.item.product_name}
										</p>
									);
								})}
							</div>
						</div>
					);
				}
				return (
					<div key={index} className="bg-white">
						<p className="text-white bg-red-500 p-2 font-bold">
							注文番号：{order.order_number}
						</p>
						<div className="flex flex-col align-middle justify-center bg-white p-2">
							{order.order_items.map((items, index) => {
								return (
									<p key={index} className="text-2xl">
										{items.amount}X {items.item.product_name}
									</p>
								);
							})}
						</div>
					</div>
				);
			})}
		</main>
	);
}
