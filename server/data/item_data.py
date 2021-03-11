from models.item import Item


def generate_items(user_list):
    return[
        Item(
            title='Circle saw',
            category='diy',
            description='Circular saw use round blades with evenly spaced teeth to make fast cuts in sheet materials, including sheet metal.',
            note='good condition',
            image='https://cdn.aws.toolstation.com/images/141020-UK/800/60467.jpg',
            user_id=user_list[0].id
        ),
        Item(
            title='Blender',
            category='kitchen',
            description='powerful blender within the Optimum range of appliances due to the powerful auto torque control installed and its 2400W motor. It is our most powerful model to date, and the latest design in the Optimum rang',
            note='Good condition',
            image='https://images-na.ssl-images-amazon.com/images/I/41dD9WaaH6L._AC_.jpg',
            user_id=user_list[1].id
        ),
        Item(
            title='Jet Wash',
            category='outdoor',
            description='You can easily adjust the angle to suit whatever object you are cleaning',
            note='like new',
            image='https://images-na.ssl-images-amazon.com/images/I/61TA0Y3a5GL._AC_SL1475_.jpg',
            user_id=user_list[2].id
        ),
        Item(
            title='Bike Pump',
            category='outdoor',
            description='Bike Pump,Aluminum Alloy Portable Mini Bicycle Tire Pump,Super Fast Tyre Inflation Compatible with Universal Presta',
            note='good condition',
            image='https://images-na.ssl-images-amazon.com/images/I/61kaFV6DxpL._AC_SL1000_.jpg',
            user_id=user_list[3].id
        ),
        Item(
            title='Big Speaker',
            category='audio',
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='need battery fro remote',
            image='https://images-na.ssl-images-amazon.com/images/I/71thuFyPy3L._AC_SL1500_.jpg',
            user_id=user_list[1].id
        )
    ]
