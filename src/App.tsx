import React, { useEffect, useState } from 'react';
import './assets/main.css';
import axios from 'axios';
import WishList from './components/wishlist';
import UpdatedList from './components/updatedList';
import Suggestions from './components/suggestions';
import Criterias from './components/criteria';

const App = (): JSX.Element => {
    const [carts, setCarts] = useState<ICart[]>([]);
    const [updatedCarts, setUpdatedCarts] = useState<ICart[]>([]);

    useEffect(() => {
        (async () => {
            axios
                .get('https://fakestoreapi.com/carts?limit=5')
                .then((response) => {
                    setCarts(response.data);
                    setUpdatedCarts(response.data);
                    console.log(response);
                })
                .catch((error) => console.log(error));
        })();
    }, []);

    return (
        <div className="flex flex-col space-y-16">
            <Criterias />
            <WishList carts={carts} />
            <Suggestions />
            <UpdatedList updatedCarts={updatedCarts} />
        </div>
    );
};

export default App;
