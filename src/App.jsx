import React, { useState, useEffect } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const initialGoods = goodsFromServer;
  const [goods, setGoods] = useState([...initialGoods]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const updateGoods = () => {
    const newGoods = [...initialGoods];

    if (sortBy === 'alphabet') {
      newGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortBy === 'length') {
      newGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      newGoods.reverse();
    }

    setGoods(newGoods);
  };

  useEffect(() => {
    updateGoods();
  }, [sortBy, isReversed]);

  const handleSortAlphabetically = () => {
    setSortBy('alphabet');
  };

  const handleSortByLength = () => {
    setSortBy('length');
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortBy('');
    setIsReversed(false);
    setGoods(initialGoods);
  };

  const isInitialOrder =
    sortBy === '' &&
    !isReversed &&
    goods.every((good, index) => good === initialGoods[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
