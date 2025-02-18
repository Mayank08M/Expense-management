/**
 * Create an object composed of the picked object properties.
 * @function pick
 *
 * @param {Object} object - The source object to pick properties from.
 * @param {string[]} keys - The array of property names to pick from the source object.
 * @returns {Object} New object with only the picked properties.
 */
const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		// Check if the object has the specified property
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			obj[key] = object[key]; // Assign the property to the new object
		}
		return obj; // Return the new object
	}, {}); // Initialize the new object as an empty object
};

// Export the pick function for use in other modules.
module.exports = pick;
