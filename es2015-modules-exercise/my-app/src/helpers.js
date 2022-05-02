// return a randomly selected item from an array of items
function choice(items) {
  const randIdx = Math.floor(Math.random() * items.length);

  return items[randIdx];
}

// remove the first matching item from items, if item exists, and return it. Otherwise return undefined.
function remove(items, item) {
  const itemIdx = items.indexOf(item);

  if (itemIdx !== -1) {
    return items.splice(itemIdx, 1);
  }
}

export { choice, remove };
