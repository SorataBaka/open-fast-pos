import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
interface Order {
	item_name: string;
	item_amount: number;
}

export default function Home() {
	const router = useRouter();
	const [menu, setMenu] = useState<Product[]>([]);
	const [orders, setOrders] = useState<Order[]>([]);
	const [orderNumber, setOrderNumber] = useState<number | null>(null);
	const [visible, setVisibility] = useState<boolean>(false);
	const toggleBox = () => {
		setVisibility(!visible);
	};

	useEffect(() => {
		if (!router.isReady) return;
		const token = localStorage.getItem("token");
		if (token === null) {
			router.replace("/login");
			return;
		}

		const headers = new Headers();
		headers.append("Authorization", token);

		fetch("https://pos.tianharjuno.com/api/v1/item/list", {
			method: "GET",
			headers: headers,
		}).then((data) => {
			if (data.status !== 200) return;
			data.json().then((bodyJson) => {
				setMenu(bodyJson.data);
			});
		});
	}, [router]);

	const countTotal = () => {
		let total = 0;
		for (const order of orders) {
			for (let i = 0; i < menu.length; i++) {
				if (order.item_name === menu[i].product_name) {
					total = total + order.item_amount * menu[i].product_price;
				}
			}
		}
		return total;
	};
	const addOrder = useCallback(
		(product: Product) => {
			let found = false;
			for (let i = 0; i < orders.length; i++) {
				if (orders[i].item_name === product.product_name) {
					orders[i].item_amount++;
					setOrders([...orders]);
					found = true;
				}
			}
			if (!found) {
				setOrders([
					...orders,
					{
						item_amount: 1,
						item_name: product.product_name,
					},
				]);
			}
		},
		[orders]
	);

	return (
		<main className="flex flex-row align-middle justify-center min-h-screen bg-white">
			{visible && orderNumber !== null && (
				<div className="fixed inset-0 flex justify-center items-center">
					<div className="w-[50rem] h-[30rem] bg-gray-200 border-gray-400 rounded-xl shadow-xl flex flex-col justify-center items-center gap-10">
						<p className="text-black text-5xl font-bold">
							注文番号：　{orderNumber}
						</p>
						<button
							className="bg-red-500 text-white text-3xl font-bold px-20	py-5 rounded-xl"
							onClick={() => {
								setOrderNumber(null);
								toggleBox();
							}}
						>
							閉じる
						</button>
					</div>
				</div>
			)}
			<div className="grid align-middle justify-normal h-screen w-2/3 bg-slate-900 p-5 rounded-r-3xl grid-cols-5 gap-5 grid-rows-5 ">
				{menu.map((item, index) => {
					return (
						<div
							className="w-50 h-50 text-black bg-white rounded-xl flex w-50 flex-col align-middle justify-center text-center active:scale-95"
							key={index}
							onClick={() => {
								addOrder(item);
							}}
						>
							<h1 className="text-2xl">{item.product_name}</h1>
							<h2>{item.product_price}円</h2>
						</div>
					);
				})}
			</div>
			<div className="flex flex-col align-middle justify-between h-screen w-1/3 bg-white p-5">
				<div className="flex flex-col align-middle justify-evenly">
					{orders.map((order, index) => {
						return (
							<p key={index} className="text-2xl">
								{order.item_amount + "X " + order.item_name}
							</p>
						);
					})}
				</div>
				<div className="flex flex-col align-middle justify-center gap-3">
					<p className="text-4xl text-left font-extrabold">
						合計：{countTotal()}
					</p>
					<button
						className="w-full text-3xl bg-red-700 p-5 rounded-xl text-white font-bold"
						onClick={(e) => {
							e.preventDefault();
							setOrders([]);
						}}
					>
						リセット
					</button>
					<button
						disabled={orders.length === 0}
						className="w-full text-3xl bg-blue-700 p-5 rounded-xl text-white font-bold"
						onClick={(e) => {
							e.preventDefault();
							const token = localStorage.getItem("token");
							if (token === null) {
								router.replace("/login");
								return;
							}
							fetch("https://pos.tianharjuno.com/api/v1/order/create", {
								method: "POST",
								headers: {
									Authorization: token,
									"Content-Type": "application/json",
								},
								body: JSON.stringify(orders),
							}).then((response) => {
								if (response.status !== 200) {
									toast.error("Failed to create order");
									return;
								}
								response.json().then((responseJson) => {
									console.log(responseJson);
									toast.success("Success!");
									setOrders([]);
									toggleBox();
									setOrderNumber(responseJson.data.order_number);
								});
							});
						}}
					>
						会計
					</button>
				</div>
			</div>
		</main>
	);
}
