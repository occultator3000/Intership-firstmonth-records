export const CategoryLs = [
    { id: 1, name: 'Dairy Milk' },
    { id: 2, name: 'Fruits & Vegetables' },
    { id: 3, name: 'Grocery' },
    { id: 4, name: 'Meat & Fish' },
    { id: 5, name: 'Bakery' },
];

const AMapWebkey = '06881953048fbd8f6005275e94c3eb26';
const AMapAndroidkey = '577875f7e5f3050ee26e824a98197a44';

const OnBoardingData = [
    {
        id: 1,
        heading: 'Create Your Online Shop',
        subHeading:' Do you have online shop?,If notlets create it now',
        image:require('../../asserts/shopping-coffee.png'),
        color:'#fbeae1'
    },
    {
        id: 2,
        heading: 'Buy products Online',
        subHeading:"Buy your favourite product online from your favourite shop",
        image:require('../../asserts/shopping-cart.png'),
        color:'#fdd6ef'
    },
    {
        id: 3,
        heading:'Rating and Reviews',
        subHeading:'Give Rating and Reviews to your favourite Shop',
        image:require('../../asserts/chat.png'),
        color:'#f6f6f6'
    }

]

export { AMapWebkey, AMapAndroidkey , OnBoardingData };

