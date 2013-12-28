define([], function () {

  /**
  * Finds the index of last item within the provided array which satisfies the provided predicate function.
  * @param  {Array}    array       The array containing the items that will be passed to the predicate function.
  * @param  {Function} predicate   The predicate function called for each item. It should return a boolean.
  * @return {Number}               The index of last matching array item, or -1, if no matching item was found.
  */
  function findLastIndex (array, predicate) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i])) {
        return i;
      }
    }
    return -1;
  }

  // Public API:
  return {
    findLastIndex: findLastIndex
  };
  
});
