from models.item import Item
from models.category import Category


def generate_categories():
    return [
        Category(name='DIY'),
        Category(name='Kitchen'),
        Category(name='Outdoor'),
        Category(name='Audio')
    ]


def generate_items(user_list, categories):
    return[
        Item(
            title='Circle saw',
            category=categories[0].id,
            description='Circular saw use round blades with evenly spaced teeth to make fast cuts in sheet materials, including sheet metal.',
            note='good condition',
            image='https://cdn.aws.toolstation.com/images/141020-UK/800/60467.jpg',
            lat=51.5073219,
            lng=-0.1276474,
            postcode='E1 6RL',
            user_id=user_list[0].id
        ),
        Item(
            title='Blender',
            category=categories[1].id,
            description='powerful blender within the Optimum range of appliances due to the powerful auto torque control installed and its 2400W motor. It is our most powerful model to date, and the latest design in the Optimum rang',
            note='Good condition',
            image='https://images-na.ssl-images-amazon.com/images/I/41dD9WaaH6L._AC_.jpg',
            lat=51.5223854,
            lng=-0.0715996,
            postcode='E1 6RL',
            user_id=user_list[1].id
        ),
        Item(
            title='Jet Wash',
            category=categories[2].id,
            description='You can easily adjust the angle to suit whatever object you are cleaning',
            note='like new',
            image='https://images-na.ssl-images-amazon.com/images/I/61TA0Y3a5GL._AC_SL1475_.jpg',
            lat=51.531585693359375,
            lng=-0.06319649517536163,
            postcode='E1 6AQ',
            user_id=user_list[2].id
            
        ),
        Item(
            title='Bike Pump',
            category=categories[2].id,
            description='Bike Pump,Aluminum Alloy Portable Mini Bicycle Tire Pump,Super Fast Tyre Inflation Compatible with Universal Presta',
            note='good condition',
            image='https://images-na.ssl-images-amazon.com/images/I/61kaFV6DxpL._AC_SL1000_.jpg',
            lat=51.4794807434082,
            lng=-0.14235636591911316,
            postcode='E1 6BH',
            user_id=user_list[3].id
        ),
        Item(
            title='Speaker',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://images-na.ssl-images-amazon.com/images/I/71thuFyPy3L._AC_SL1500_.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode='E1 6BQ',
            user_id=user_list[1].id
        ),
        Item(
            title='Bike',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/v1616286359/share-app-samples/pexels-anastasia-shuraeva-4213481_ndxdvx.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[7].postcode,
            user_id=user_list[7].id
        ),
        Item(
            title='Pliers',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/v1616286354/share-app-samples/pexels-ksenia-chernaya-5691629_yf9hym.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[9].postcode,
            user_id=user_list[9].id
        ),
        Item(
            title='Hammer',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286351/share-app-samples/pexels-pixabay-209235_rccgzi.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[9].postcode,
            user_id=user_list[9].id
        ),
        Item(
            title='Saw',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286348/share-app-samples/pexels-ksenia-chernaya-5691605_ifq2bf.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[10].postcode,
            user_id=user_list[10].id
        ),
        Item(
            title='Carving Tools',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286354/share-app-samples/pexels-ono-kosuki-5973896_ogs2sm.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[8].postcode,
            user_id=user_list[8].id
        ),
        Item(
            title='Guitar Amplifier',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286353/share-app-samples/pexels-andrey-matveev-1706694_cn8pjd.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[8].postcode,
            user_id=user_list[8].id
        ),
        Item(
            title='Pasta Maker',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/v1616286351/share-app-samples/pexels-klaus-nielsen-6287322_wxqmib.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[7].postcode,
            user_id=user_list[7].id
        ),
        Item(
            title='Barbecue',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://www.pexels.com/photo/bicycle-parked-against-concrete-building-in-351300/',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[7].postcode,
            user_id=user_list[7].id
        ),
        Item(
            title='Barbecue',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286353/share-app-samples/pexels-lukas-1309067_atjtua.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[10].postcode,
            user_id=user_list[10].id
        ),
        Item(
            title='Guitar',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286349/share-app-samples/pexels-philip-boakye-3428498_v4sj7a.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[0].postcode,
            user_id=user_list[0].id
        ),
        Item(
            title='Torch',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://www.pexels.com/photo/bicycle-parked-against-concrete-building-in-351300/',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[7].postcode,
            user_id=user_list[7].id
        ),
        Item(
            title='Paint Roller',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286350/share-app-samples/pexels-malte-luk-1669754_tjnoig.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[0].postcode,
            user_id=user_list[0].id
        ),
        Item(
            title='Wall Paint',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286349/share-app-samples/pexels-la-miko-3616760_qs1ucc.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[9].postcode,
            user_id=user_list[9].id
        ),
        Item(
            title='Carpet Cleaner',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286345/share-app-samples/pexels-la-miko-3616746_wpgmqd.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[10].postcode,
            user_id=user_list[10].id
        ),
        Item(
            title='Vacuum',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286344/share-app-samples/pexels-pixabay-38325_je9pj4.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[6].postcode,
            user_id=user_list[6].id
        ),
        Item(
            title='Carpet Cleaner',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286345/share-app-samples/pexels-la-miko-3616746_wpgmqd.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[4].postcode,
            user_id=user_list[4].id
        ),
        Item(
            title='Vacuum',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286344/share-app-samples/pexels-pixabay-38325_je9pj4.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[5].postcode,
            user_id=user_list[5].id
        ),
        Item(
            title='Bike',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286354/share-app-samples/pexels-apostolos-vamvouras-3346826_bb06ii.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[0].postcode,
            user_id=user_list[0].id
        ),
        Item(
            title='Bike',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286354/share-app-samples/pexels-apostolos-vamvouras-3346826_bb06ii.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[1].postcode,
            user_id=user_list[1].id
        ),
        Item(
            title='Bike',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286359/share-app-samples/pexels-anastasia-shuraeva-4213481_ndxdvx.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[7].postcode,
            user_id=user_list[7].id
        ),
        Item(
            title='Power Drill',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286342/share-app-samples/pexels-bidvine-1249611_amgco3.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[9].postcode,
            user_id=user_list[9].id
        ),
        Item(
            title='Hammer',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286351/share-app-samples/pexels-pixabay-209235_rccgzi.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[5].postcode,
            user_id=user_list[5].id
        ),
        Item(
            title='Hammer',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286351/share-app-samples/pexels-pixabay-209235_rccgzi.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[0].postcode,
            user_id=user_list[0].id
        ),
        Item(
            title='Pitchfork',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286341/share-app-samples/pexels-cottonbro-4918153_zosz8m.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[0].postcode,
            user_id=user_list[0].id
        ),
        Item(
            title='Spade',
            category=categories[3].id,
            description='Bluetooth Speakers,40W Portable Bluetooth Speaker Dual Subwoofer,LED Colorful Light,Bluetooth 5.0 Wireless Stereo Party Speaker,10H Playtime Wireless Outdoor',
            note='',
            image='https://res.cloudinary.com/dn39ocqwt/image/upload/c_scale,w_600/v1616286357/share-app-samples/pexels-lukas-296230_chh7ll.jpg',
            lat=51.5233246,
            lng=-0.0984057,
            postcode=user_list[5].postcode,
            user_id=user_list[5].id
        )
        
    ]
