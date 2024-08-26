const data = [
    {
        id:'1',
        title:'PROMOTIONS',
        description:[
            {
                id:'101',
                name:'Wacky Wednesday',
                quantity:'Two Steers Burger',
                cost:' 490.00',
                image:require("../assets/images/burgerandchips.jpg"),
            }
        ]
        
    },
    {
        id:'2',
        title:'ONLINE ONLY DEALS',
        description:[
            {
                id:'102',
                name:'Wacky Wednesday Online Deals',
                quantity:'2 x Wacky Wednesday Classic burgers(4 x Burgurs) & 2 large Chips',
                cost:' 1,500.00',
                //image:'require("../assets/burgerandchips.jpg")',
                
                
            },
            {
                id:'103',
                name:'Chicken Burers & Chicken Pieces Meal',
                quantity:'2 x Fried Chicken Burger 4 x Piece Chicken Large Chips',
                cost:' 2,550.00',
               // image:'require("../assets/burgerandchips.jpg")',
            },
            {
                id:'104',
                name:'Cheesee Burgur Sharing Meal',
                quantity:'2 Original Cheese Burger & Medium Chips',
                cost:' 1,050.00',
                //image:'require("../assets/burgerandchips.jpg")',
            },
            {
                id:'105',
                name:'Mega Cheese & Macon Duo Oline',
                quantity:'2 Mega Cheese & Macon Burgers & Medium Chips',
                cost:' 1,000.00',
                image:require("../assets/images/macandduo.jpg"),
            }
        ]
    },
    {
        id:'3',
        title:'CLASSIC BURGERS',
        description:[
            {
                id:'106',
                name:'Rave Burger3',
                quantity:'A Frame Grilled 100% Pure Beef patty with Relish & Rave Sauce',
                cost:' 350.00+',
                image:require("../assets/images/burgerchips.jpg"),
                
            },
            {
                id:'107',
                name:'Steers Burger',
                quantity:'A Flame Grilled 100% Pure Beef patty with Tomato,Gherkins,100 Island & BBQ Sauce',
                cost:' 380.00+',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'108',
                name:'Cheesee Burgur ',
                quantity:'A Flame Grilled 100% Pure Beef patty with Cheese,Tomato,Gherkins,100 Island & BBQ Sauce',
                cost:' 420.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'109',
                name:'Prince Beef Burger',
                quantity:'A Flame Grilled 100% Pure Beef patty with Tomato,Lettuce & Mayo.',
                cost:' 450.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'110',
                name:'Jalapeno Mayo Burger',
                quantity:'100% Pure Beef patty with Toato,Jalapeno,Mayo,Cheese,Gherkins & BBQ Sauce',
                cost:' 500.00 +',
                image:require("../assets/images/burger.jpg"),
            },
            {
                id:'111',
                name:'Jalapeno Mayo Cheese Burger',
                quantity:'100% Pure Beef patty with Toato,Jalapeno,Mayo,Cheese,Gherkins & BBQ Sauce',
                cost:' 600.00 +',
                image:require("../assets/images/jalapenoBurger.jpg"),
            },
            {
                id:'112',
                name:'Crispy Onion Macon Burger',
                // quantity:'2 Mega Cheese & Macon Burgers & Medium Chips',
                cost:' 550.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'113',
                name:'Hawaiian Burger',
                // quantity:'2 Mega Cheese & Macon Burgers & Medium Chips',
                cost:' 450.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'114',
                name:'Macon & Cheese Burger',
                quantity:'A Flame Grilled 100% Pure Beef Patty,Macon,a Cheese Slice, Tomato,Lettuce &BBQ Sauce ',
                cost:' 1,000.00',
                image:require("../assets/images/burgerchips.jpg"),
            },
        ]
    },
    {
        id:'7',
        title:'CHICKEN BURGERS',
        description:[
            {
                id:'115',
                name:'Original Chicken Burger',
                quantity:'A Frame Grilled Chicken Breast With TomatoLettuce & Mayo.',
                cost:' 450.00 +',
                //image:require("../assets/burgerchips.jpg"),
                
            },
            {
                id:'116',
                name:'Chicken & Cheese Burger',
                quantity:'A Flame Grilled 100% Pure Beef patty with Tomato,Gherkins,1000 Island & BBQ Sauce',
                cost:' 500.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'117',
                name:'Macon Cheese Chicken Burger ',
                quantity:'A Flame Grilled 100% Pure Beef patty with Cheese,Tomato,Lettuce,100 Island & BBQ Sauce',
                cost:' 550.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'118',
                name:'Fried Chicken Burger',
                //quantity:'A Flame Grilled 100% Pure Beef patty with Tomato,Lettuce & Mayo.',
                cost:' 500.00 +',
                //image:require("../assets/burgerchips.jpg"),
            },
            {
                id:'119',
                name:'Fried Chicken Cheese Burger',
                //quantity:'100% Pure Beef patty with Toato,Jalapeno,Mayo,Cheese,Gherkins & BBQ Sauce',
                cost:' 550.00 +',
               // image:require("../assets/burger.jpg"),
            },
            
        ]
    },
    {
        id:'4',
        title:'STEAK BURGERS',
        description:[
            {
                id:'120',
                name:'Steak Burger',
                //quantity:'A Frame Grilled Chicken Breast With TomatoLettuce & Mayo.',
                cost:' 600.00 +',
                image:require("../assets/images/burgerchips.jpg"),
                
            },
            {
                id:'121',
                name:'Steak Macon & Cheese Burger',
               // quantity:'A Flame Grilled 100% Pure Beef patty with Tomato,Gherkins,1000 Island & BBQ Sauce',
                cost:' 750.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
           
        ]
    },
    {
        id:'5',
        title:'MEALS FOR SHARING',
        description:[
            {
                id:'122',
                name:'Sharing 1',
                quantity:'4 Steers B Brg & 2 Med Chips',
                cost:' 1450.00 +',
                image:require("../assets/images/burgerchips.jpg"),
                
            },
            {
                id:'123',
                name:'Sharing 2',
                quantity:'2 Steers B BRG & L Chips',
                cost:' 1650.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'124',
                name:'Sharing 3',
                quantity:'2 Steers B BRG & 2 King Steer Brg & 2 Med Chips',
                cost:' 2300.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'125',
                name:'Sharing 4',
                quantity:'Full Chic Lrg Chips Green Salad & 4 Rolls',
                cost:' 2400.00 +',
                image:require("../assets/images/burgerchips.jpg"),
            },
            {
                id:'126',
                // name:'Sharing 4',
                quantity:'X2 King steer B Brgx2 Lrg Chips + Table Sauce',
                cost:' 2500.00 +',
                // image:require("../assets/burgerchips.jpg"),
            },
            {
                id:'127',
                // name:'Sharing 4',
                quantity:'X2 King steer Chk B Brgx2 Lrg Chips + Table Sauce',
                cost:' 2700.00 +',
                // image:require("../assets/burgerchips.jpg"),
            },
            {
                id:'128',
                // name:'Sharing 4',
                quantity:'X2 King V steer B Brgx2 Lrg Chips + Table Sauce',
                cost:' 2500.00 +',
                // image:require("../assets/burgerchips.jpg"),
            },
            {
                id:'129',
                // name:'Sharing 4',
                quantity:'X2 Rave B Brgx2 Lrg Chips + Table Sauce',
                cost:' 1800.00 +',
                // image:require("../assets/burgerchips.jpg"),
            },
            {
                id:'130',
                // name:'Sharing 4',
                quantity:'X2 King steer B Brgx2 Lrg Chips + Table Sauce',
                cost:' 1800.00 +',
                // image:require("../assets/burgerchips.jpg"),
            },
            
           
        ]
    },
    {
        id:'6',
        title:'FRESH SALADS',
        description:[
            {
                id:'131',
                name:'Coleslaw Salad',
                quantity:'Cabbage and Carrot',
                cost:' 180.00 +',
                image:require("../assets/images/salad1.jpg"),
                
            },
            {
                id:'132',
                name:'Green Salad',
                quantity:'Tomato,Lettuce & Onion',
                cost:' 350.00 +',
                image:require("../assets/images/salad2.jpg"),
            },
            {
                id:'133',
                name:'Greek Salad',
                quantity:'Lettuce,Tomato,Cucumber,Green Pepper,White Onion,Red and Yellow Pepper,Olives,Feta Cheese',
                cost:' 400.00 +',
                image:require("../assets/images/salad3.jpg"),
            },
            {
                id:'134',
                name:'Chicken Salad',
                quantity:'Chicken,Tomato,Onion & Lettuce',
                cost:' 600.00 +',
                image:require("../assets/images/salad4.jpg"),
            },
           
        ]
    },
]
export default data;