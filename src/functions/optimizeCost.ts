/* interface IArr {
    id: number;
    products: IProductArr[];
}

interface IProductArr {
    productId: number;
    price: string;
}

const arr: IArr[] = [
    {
        id: 1,
        products: [
            { productId: 1, price: '10.11' },
            { productId: 2, price: '20.22' },
            { productId: 5, price: '30.60' },
            { productId: 11, price: '5.15' }
        ]
    },
    {
        id: 2,
        products: [
            { productId: 5, price: '7.20' },
            { productId: 6, price: '20.50' },
            { productId: 10, price: '9.45' },
            { productId: 8, price: '5.99' }
        ]
    },
    {
        id: 3,
        products: [
            { productId: 9, price: '50.00' },
            { productId: 5, price: '20.25' },
            { productId: 11, price: '33.50' },
            { productId: 12, price: '5.60' },
            { productId: 13, price: '42.50' }
        ]
    }
];

const shuffle = (array: number[]) => {
    let x = array.length,
        y = 0,
        temp;

    while (x--) {
        y = Math.floor(Math.random() * (x + 1));
        temp = array[x];
        array[x] = array[y];
        array[y] = temp;
    }

    return array;
};

interface IterationType {
    iteration_id: number;
    arr: IArr[];
    total: number;
}

const optimizeCost = (arr: IArr[], x: number) => {
    let iterationArray: IterationType[] = [];
    for (let m = 0; m < 500; m++) {
        let randomArrayOfArray: IArr[] = [];

        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            let randomArr: IProductArr[] = [];

            const randomLim = shuffle([1, 2, 3, 4]);
            let array: number[] = [];
            for (let n = 0; n < randomLim[0]; n++) {
                array = [...array, n];
            }
            for (let j = 0; j < randomLim[0]; j++) {
                randomArr = [...randomArr, arr[i].products[array[j]]];
            }
            randomArrayOfArray = [...randomArrayOfArray, { id: arr[i].id, products: randomArr }];
            sum =
                sum +
                randomArrayOfArray[i].products
                    .map((product: IProductArr) => parseFloat(product.price))
                    .reduce((a, b) => a + b);
        }
        iterationArray = [...iterationArray, { iteration_id: m, arr: randomArrayOfArray, total: sum }];
    }
    const sumArray = iterationArray.map((iter) => iter.total);
    const min = Math.min(...sumArray);
    const ind = sumArray.indexOf(min);
    console.log(iterationArray.filter((iter) => iter.total < 67.31));

    console.log(iterationArray[ind]);
};

optimizeCost(arr, 5);
 */
export {};
