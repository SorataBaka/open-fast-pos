# Fast Food POS (Point of Sale) System
This project is created for use in the 2024 釧路高等工業専門学校(Kushiro National Institute of Technology) school festival. Specifically, the 4th year Computer Science bazaar and exhibition. <br>
The repository contains 2 seperate elements which includes the backend and the frontend. The backend manages incoming orders and neatly sorts them. The frontend program itself is comprised of 2 parts; a KVS (Kitchen Video System) as well as the POS (Point of Sale) system itself.

## How the programs are run
The POS itself is opened on a touch screen tablet that the cashier in our bazaar use to take customers orders. A KVS monitor is put on a laptop where the kitchen staff can see the next order to make and serve according to the customers order number as needed. 
The KVS monitor is fully online and controlled automatically using a websocket. Not only is it put on the kitchen, we also put the kvs monitor in our computer science exhibition so parents and onlookers can look at real time the state of our bazaar. 

## Flow of the program
After putting in the orders via pos, the cashier will press the order button where the orders are sent to the backend. The orders are matched with a database of known orders and saved on the database. As it is saved, the backend triggers a websocket that automatically refreshes any online KVS monitor to fetch the latest order. After making and serving the order, the kitchen staff can press enter on the laptop which marks the current order as done in the database.

## Thoughts
Given the time i was given to make this project, I would say this mini program was a big success considering the amount of attention it got in the school. I had a lot of extra features in mind that i would've love added but nonetheless if given another chance to utilize this program i would add a lot of extra features such as multi page ordering screen to categorize multiple types of items. As well as perhaps a way to serve orders not in a row but allow small orders to be served first according to the wishes of the kichen

## Inspirations
During the time that i made this program, I was a part time employee at McDonalds. One of the aspects of McDonalds that made me learn very much about how the fast food kitchen work is definitely the OMS or order management system. How everything is neatly timed from the time the receipt is printed out to the time the order is served. Due to that reason, a lot of aspect of this program is basically inspired by the McDonalds KVS itself. To be honest they even look similar to some extent.

